import emailjs from '@emailjs/browser';
import { auth, db } from "./firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { 
  doc, 
  setDoc, 
  serverTimestamp,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs
} from "firebase/firestore";

// --- AUTH SERVICES ---
export const signupUser = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  
  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    uid: user.uid,
    createdAt: serverTimestamp(),
  });
  
  return user;
};

export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const logoutUser = async () => {
  await signOut(auth);
};

// --- EMAIL SERVICES ---
export const sendEmail = async (to_email, subject, message) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error("EmailJS keys are not configured in .env");
  }

  const templateParams = {
    to_name: to_email,         // Maps to {{to_name}}
    to_email: to_email,        // Maps to {{to_email}} - Primary recipient field
    from_name: subject,        // Maps to {{from_name}}
    subject: subject,          // Maps to {{subject}}
    message: message,          // Maps to {{message}}
    reply_to: auth.currentUser?.email, // Maps to {{reply_to}}
  };

  try {
    // Send email via EmailJS
    const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
    
    // Log to Firestore
    await addDoc(collection(db, "emails"), {
      userId: auth.currentUser.uid,
      to_email,
      subject,
      message,
      status: "sent",
      timestamp: serverTimestamp(),
    });

    return response;
  } catch (error) {
    // Log failure to Firestore
    if (auth.currentUser) {
      await addDoc(collection(db, "emails"), {
        userId: auth.currentUser.uid,
        to_email,
        subject,
        message,
        status: "failed",
        timestamp: serverTimestamp(),
      });
    }
    throw error;
  }
};

export const fetchEmailHistory = async (userId) => {
  const emailsRef = collection(db, "emails");
  const q = query(
    emailsRef, 
    where("userId", "==", userId),
    orderBy("timestamp", "desc")
  );
  
  const querySnapshot = await getDocs(q);
  const emails = [];
  querySnapshot.forEach((doc) => {
    emails.push({ id: doc.id, ...doc.data() });
  });
  return emails;
};
