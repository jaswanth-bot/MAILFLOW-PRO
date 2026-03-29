import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export async function signupUser(email, password) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(
    doc(db, "users", credential.user.uid),
    {
      uid: credential.user.uid,
      email: credential.user.email,
      createdAt: serverTimestamp()
    },
    { merge: true }
  );

  return credential.user;
}

export async function loginUser(email, password) {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export async function logoutUser() {
  await signOut(auth);
}
