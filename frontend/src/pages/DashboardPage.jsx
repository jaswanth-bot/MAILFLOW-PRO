import { useState } from "react";
import EmailForm from "../components/EmailForm";
import EmailHistory from "../components/EmailHistory";
import Navbar from "../components/Navbar";

export default function DashboardPage({ user, onLogout }) {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <main className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
      <Navbar userEmail={user?.email} onLogout={onLogout} />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="card p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Delivery Mode</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">Platform Sender</p>
          <p className="mt-1 text-xs text-slate-500">No personal email password required</p>
        </div>
        <div className="card p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Authentication</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">Firebase Email/Password</p>
          <p className="mt-1 text-xs text-slate-500">Protected routes with Firebase Auth</p>
        </div>
        <div className="card p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">History</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">Firestore</p>
          <p className="mt-1 text-xs text-slate-500">Realtime list of sent/failed attempts</p>
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-5">
        <EmailForm onEmailSent={() => setRefreshKey((prev) => prev + 1)} />
        <EmailHistory userId={user?.uid} refreshKey={refreshKey} className="xl:col-span-3" />
      </div>
    </main>
  );
}
