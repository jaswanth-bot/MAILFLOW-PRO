import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../services/authService";
import Alert from "../components/Alert";

export default function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await signupUser(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-6 px-4 py-8 md:grid-cols-2">
      <section className="hidden rounded-3xl bg-blue-700 p-8 text-white shadow-xl md:block">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-100">Create Workspace Access</p>
        <h1 className="mt-3 text-3xl font-bold">Launch your branded email platform in minutes.</h1>
        <p className="mt-3 text-sm text-blue-100">
          Authentication, secure cloud delivery, and email history are ready. Just create your account and start.
        </p>
      </section>

      <section className="card p-6 sm:p-8">
        <h2 className="mb-1 text-2xl font-bold text-slate-900">Create account</h2>
        <p className="mb-5 text-sm text-slate-500">Use at least 6 characters for your password.</p>
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
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
        <div className="mt-4">
          <Alert type="error" message={error} />
        </div>
        <p className="mt-4 text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </section>
      <div className="md:hidden">
        <p className="text-center text-xs text-slate-500">Create your account to access professional email tools.</p>
      </div>
    </main>
  );
}
