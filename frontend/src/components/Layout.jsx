import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Mail, History as HistoryIcon, LogOut, MailCheck } from "lucide-react";

export default function Layout({ children, user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    onLogout();
    toast.success("Signed out successfully");
    navigate("/login");
  };

  const navItems = [
    { label: "Compose", path: "/", icon: Mail },
    { label: "History", path: "/history", icon: HistoryIcon },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-full w-80 flex-col border-r border-slate-100 bg-white/50 backdrop-blur-xl md:flex">
        <div className="flex h-32 items-center gap-4 px-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 shadow-xl shadow-blue-200">
            <MailCheck className="text-white" size={24} />
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900">MailFlow Pro</span>
        </div>
        
        <nav className="flex-1 space-y-3 p-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center gap-4 rounded-3xl px-6 py-5 text-sm font-bold transition-all duration-300 ${
                  isActive 
                  ? "bg-blue-600 text-white shadow-2xl shadow-blue-200" 
                  : "text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-xl hover:shadow-slate-100/50"
                }`}
              >
                <item.icon size={22} className={isActive ? "text-white" : "text-slate-400 group-hover:text-blue-600"} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-8">
          <div className="mb-6 rounded-[32px] bg-slate-900 p-6 text-white shadow-2xl">
            <div className="mb-5 flex items-center gap-4">
              <img src={user.picture} alt={user.name} className="h-12 w-12 rounded-2xl border-2 border-white/10" />
              <div className="overflow-hidden">
                <p className="truncate text-sm font-bold">{user.name}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 opacity-80">CONNECTED</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-white/10 py-3 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-white/20 active:scale-95"
            >
              <LogOut size={16} className="transition-transform group-hover:translate-x-1" />
              Logout
            </button>
          </div>
          <p className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 opacity-60">
            MailFlow Pro v2.0
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto md:ml-80">
        <header className="flex h-24 items-center justify-between border-b border-transparent bg-white px-8 md:hidden">
           <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-xl shadow-blue-200">
              <MailCheck className="text-white" size={20} />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">MailFlow Pro</span>
          </div>
          <button 
            onClick={handleLogout} 
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={20} />
          </button>
        </header>

        <div className="animate-fade-in px-8 py-12 md:px-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
