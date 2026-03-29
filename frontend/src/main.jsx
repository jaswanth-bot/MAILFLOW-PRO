import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!clientId) {
  const root = document.getElementById('root');
  root.style.padding = '20px';
  root.style.textAlign = 'center';
  root.innerHTML = `<h2 style="color: red;">Missing Google Client ID</h2><p>Please check your Vercel Environment Variables.</p>`;
} else {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <GoogleOAuthProvider clientId={clientId}>
        <App />
        <Toaster position="top-right" />
      </GoogleOAuthProvider>
    </React.StrictMode>,
  );
}
