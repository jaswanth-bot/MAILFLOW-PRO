import { useState, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem("mailflow_session");
    if (session) {
      setCurrentUser(JSON.parse(session));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem("mailflow_session", JSON.stringify(userData));
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("mailflow_session");
    setCurrentUser(null);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white text-slate-900">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="min-h-screen bg-slate-50">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute user={currentUser}>
                <Dashboard user={currentUser} onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute user={currentUser}>
                <History user={currentUser} onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              currentUser ? (
                <Navigate to="/" replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route path="*" element={<Navigate to={currentUser ? "/" : "/login"} replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
