import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../services/email";
import { toast } from "react-hot-toast";
import { Mail, Lock, UserPlus, MailCheck } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Passwords don't match");
    }
    setLoading(true);
    try {
      await signupUser(email, password);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
            <MailCheck className="text-white" size={24} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">MailFlow</h1>
          <p className="mt-2 text-slate-500">Create an account to start sending</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                <input
                  type="email"
                  required
                  className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
                <input
                  type="password"
                  required
                  className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
                <input
                  type="password"
                  required
                  className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              ) : (
                <>
                  <UserPlus size={18} />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700 transition">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
