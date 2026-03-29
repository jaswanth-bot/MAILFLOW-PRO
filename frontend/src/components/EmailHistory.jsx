import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import LoadingSpinner from "./LoadingSpinner";

function formatDate(timestamp) {
  if (!timestamp?.toDate) return "—";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(timestamp.toDate());
}

export default function EmailHistory({ userId, refreshKey = 0, className = "" }) {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setEmails([]);
      setLoading(false);
      return undefined;
    }

    const emailsRef = collection(db, "sentEmails");
    const q = query(emailsRef, where("userId", "==", userId), orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const rows = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
        setEmails(rows);
        setLoading(false);
      },
      () => {
        setEmails([]);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [userId, refreshKey]);

  if (loading) {
    return (
      <section className={`card p-5 ${className}`}>
        <LoadingSpinner text="Loading email history..." />
      </section>
    );
  }

  return (
    <section className={`card p-5 ${className}`}>
      <h2 className="mb-1 text-lg font-semibold text-slate-900">Email History</h2>
      <p className="mb-4 text-sm text-slate-500">Synced from Firestore in real time.</p>

      {emails.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
          <p className="text-sm font-medium text-slate-700">No emails sent yet.</p>
          <p className="mt-1 text-xs text-slate-500">Your delivery history will appear here after first send.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {emails.map((email) => (
            <article key={email.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-900">{email.subject}</p>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    email.status === "sent"
                      ? "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200"
                      : "bg-red-100 text-red-700 ring-1 ring-red-200"
                  }`}
                >
                  {email.status}
                </span>
              </div>
              <p className="text-sm text-slate-600">
                <span className="font-medium text-slate-700">To:</span> {email.to_email}
              </p>
              <p className="mt-1 text-xs text-slate-500">{formatDate(email.timestamp)}</p>
              <p className="mt-2 whitespace-pre-wrap text-sm text-slate-500">{email.message}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
