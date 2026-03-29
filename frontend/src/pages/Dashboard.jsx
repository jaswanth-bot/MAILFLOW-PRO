import { useState } from "react";
import Layout from "../components/Layout";
import { toast } from "react-hot-toast";
import { Send, User, Type, MessageSquare, Sparkles } from "lucide-react";
import { sendEmail as sendGmailAction } from "../services/api";

export default function Dashboard({ user, onLogout }) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!to || !subject || !message) {
      return toast.error("Please fill in all fields");
    }

    setLoading(true);
    const toastId = toast.loading("Sending via Gmail API...");
    try {
      await sendGmailAction(to, subject, message, user.accessToken, user.sub);
      toast.success("Email sent successfully!", { id: toastId });
      
      // Clear form
      setTo("");
      setSubject("");
      setMessage("");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || err.message || "Failed to send email", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout user={user} onLogout={onLogout}>
      <header className="mb-12 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-blue-600">
          <Sparkles size={16} />
          <span>New Message</span>
        </div>
        <h1 className="text-5xl font-black tracking-tight text-slate-900">Compose</h1>
        <div className="mt-2 flex items-center gap-2 font-bold text-slate-500">
          <span>Sending as</span>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700">{user.email}</span>
        </div>
      </header>

      <div className="rounded-[40px] border-4 border-white bg-white/40 p-10 shadow-3xl backdrop-blur-3xl transition-all duration-300 hover:border-blue-50">
        <div className="rounded-[32px] bg-white p-12 shadow-sm">
          <form onSubmit={handleSend} className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500">
                  <User size={14} className="text-slate-400" />
                  To (Recipient)
                </label>
                <input
                  type="email"
                  placeholder="recipient@example.com"
                  className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50/10 px-6 py-4 font-bold text-slate-900 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-8 focus:ring-blue-50/50"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500">
                  <Type size={14} className="text-slate-400" />
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Subject of the email"
                  className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50/10 px-6 py-4 font-bold text-slate-900 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-8 focus:ring-blue-50/50"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500">
                <MessageSquare size={14} className="text-slate-400" />
                Message Body
              </label>
              <textarea
                rows="8"
                placeholder="Write your email content here..."
                className="w-full resize-none rounded-[32px] border-2 border-slate-100 bg-slate-50/10 px-8 py-6 font-bold text-slate-900 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-8 focus:ring-blue-50/50"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={loading}
                className="group relative flex h-16 w-full items-center justify-center gap-3 overflow-hidden rounded-[32px] bg-slate-900 px-12 text-sm font-black uppercase tracking-[0.2em] text-white shadow-xl transition-all hover:bg-black active:scale-95 disabled:opacity-50 md:w-auto"
              >
                {loading ? (
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                ) : (
                  <>
                    <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
