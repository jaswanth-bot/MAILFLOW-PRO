export default function Navbar({ userEmail, onLogout }) {
  const initials = (userEmail || "U").slice(0, 1).toUpperCase();

  return (
    <header className="card mb-6 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
          {initials}
        </div>
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Platform Mailer</p>
          <h1 className="text-2xl font-bold text-slate-900">Email Sender Dashboard</h1>
          <p className="text-sm text-slate-500">Signed in as {userEmail}</p>
        </div>
      </div>
      <button
        onClick={onLogout}
        className="ghost-btn"
      >
        Logout
      </button>
    </header>
  );
}
