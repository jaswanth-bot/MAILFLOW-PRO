import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import Alert from "../components/Alert";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginUser(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-6 px-4 py-8 md:grid-cols-2">
      <section className="hidden rounded-3xl bg-slate-900 p-8 text-white shadow-xl md:block">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">Email Sender Platform</p>
        <h1 className="mt-3 text-3xl font-bold">Professional transactional email workflow.</h1>
        <p className="mt-3 text-sm text-slate-300">
          Send emails from your product mailbox, track statuses in real time, and keep your personal email credentials private.
        </p>
      </section>

      <section className="card p-6 sm:p-8">
        <h2 className="mb-1 text-2xl font-bold text-slate-900">Welcome back</h2>
        <p className="mb-5 text-sm text-slate-500">Login to continue sending emails.</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
          <button type="submit" disabled={loading} className="primary-btn w-full">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-4">
          <Alert type="error" message={error} />
        </div>
        <p className="mt-4 text-sm text-slate-600">
          New user?{" "}
          <Link to="/signup" className="font-semibold text-blue-600 hover:underline">
            Create an account
          </Link>
        </p>
      </section>
      <div className="md:hidden">
        <p className="text-center text-xs text-slate-500">Secure sending via platform email and Firebase.</p>
      </div>
    </main>
  );
}
