import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { MailCheck, LogIn } from 'lucide-react';
import { verifyLogin } from '../services/api';

export default function Login({ onLogin }) {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log('Login Success:', tokenResponse);
      const toastId = toast.loading('Verifying identity...');
      
      try {
        // Fetch User Info from Google and verify ID Token with backend
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });

        const userData = {
          ...res.data,
          accessToken: tokenResponse.access_token,
        };

        toast.success(`Welcome, ${userData.name}!`, { id: toastId });
        onLogin(userData);
      } catch (error) {
        console.error('Handshake failed:', error);
        toast.error('Identity verification failed', { id: toastId });
      }
    },
    onError: (error) => {
      console.error('Login Failed:', error);
      toast.error('Google login failed');
    },
    scope: 'https://www.googleapis.com/auth/gmail.send profile email',
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-xl shadow-blue-200">
          <MailCheck className="text-white" size={32} />
        </div>
        <h1 className="text-4xl font-black tracking-tight text-slate-900">MailFlow Pro</h1>
        <p className="mt-4 text-lg font-medium text-slate-500">
          Securely send emails from your own account using Google OAuth.
        </p>

        <div className="mt-12 rounded-[40px] border-4 border-white bg-white/40 p-10 shadow-2xl backdrop-blur-3xl">
          <button
            onClick={() => login()}
            className="flex w-full items-center justify-center gap-4 rounded-3xl bg-[#4285F4] py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-[#357abd] active:scale-95"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white p-1">
              <img src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/16px.svg" alt="Google Logo" />
            </div>
            <span>Sign in with Google</span>
          </button>
          <p className="mt-6 text-xs font-bold uppercase tracking-widest text-slate-400 opacity-60">
            Powered by Gmail API & OAuth 2.0
          </p>
        </div>
      </div>
    </div>
  );
}
