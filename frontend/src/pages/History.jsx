import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { toast } from "react-hot-toast";
import { History as HistoryIcon, Mail, User, CheckCircle, Search } from "lucide-react";
import { fetchHistory } from "../services/api";

export default function History({ user, onLogout }) {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const history = await fetchHistory(user.sub);
        setEmails(history);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load history");
      } finally {
        setLoading(false);
      }
    };
    getHistory();
  }, [user.sub]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Layout user={user} onLogout={onLogout}>
      <header className="mb-12 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-blue-600">
          <HistoryIcon size={16} />
          <span>Activity Log</span>
        </div>
        <h1 className="text-5xl font-black tracking-tight text-slate-900">History</h1>
        <p className="mt-2 text-lg font-bold text-slate-500">Track every email sent via Gmail API.</p>
      </header>

      {loading ? (
        <div className="flex h-96 items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent shadow-xl"></div>
        </div>
      ) : emails.length === 0 ? (
        <div className="flex h-96 flex-col items-center justify-center rounded-[40px] border-4 border-dashed border-slate-200 bg-white p-12 text-center transition-all hover:bg-slate-50">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-slate-50 shadow-inner">
            <Mail className="text-slate-200" size={40} />
          </div>
          <p className="text-2xl font-black text-slate-900">No sent emails found</p>
          <p className="mt-2 font-bold text-slate-500">Your email history will appear here.</p>
        </div>
      ) : (
        <div className="group rounded-[40px] border-4 border-white bg-white/40 p-4 shadow-3xl backdrop-blur-3xl transition-all duration-500 hover:border-blue-50">
          <div className="overflow-hidden rounded-[32px] bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b-2 border-slate-100 bg-slate-50/50">
                    <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400">Recipient</th>
                    <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400">Subject</th>
                    <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400">Date & Time</th>
                    <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/50">
                  {emails.map((email) => (
                    <tr key={email.id} className="transition-all hover:bg-slate-50/50">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                            <User size={20} />
                          </div>
                          <span className="text-sm font-bold text-slate-900 truncate max-w-[200px]">{email.to_email}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                         <span className="text-sm font-bold text-slate-900 truncate max-w-[250px]">{email.subject}</span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-bold text-slate-900">{formatDate(email.timestamp)}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex justify-center">
                          <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-5 py-2 text-[10px] font-black uppercase tracking-widest text-emerald-600 shadow-emerald-100 shadow-lg">
                            <CheckCircle size={14} />
                            <span>SENT</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
