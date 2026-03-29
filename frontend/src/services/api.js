import axios from "axios";
import { db } from "./firebase";
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  where, 
  orderBy, 
  getDocs 
} from "firebase/firestore";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

/**
 * Verifies the Google Identity token with the backend server.
 */
export const verifyLogin = async (idToken) => {
  const response = await axios.post(`${API_BASE_URL}/auth/google`, { idToken });
  return response.data;
};

/**
 * Sends an email using the Gmail API through our backend.
 */
export const sendEmail = async (to, subject, message, accessToken, userId) => {
  const response = await axios.post(`${API_BASE_URL}/email/send`, {
    to,
    subject,
    message,
    accessToken,
  });

  // Log successfully sent email to Firestore
  if (response.data.success) {
    await addDoc(collection(db, "emails"), {
      userId,
      to_email: to,
      subject,
      message,
      status: "sent",
      timestamp: serverTimestamp(),
    });
  }

  return response.data;
};

/**
 * Fetches the user's email history from Firestore.
 */
export const fetchHistory = async (userId) => {
  const q = query(
    collection(db, "emails"),
    where("userId", "==", userId),
    orderBy("timestamp", "desc")
  );
  
  const querySnapshot = await getDocs(q);
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
};
