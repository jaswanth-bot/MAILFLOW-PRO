# 📧 MailFlow Pro Setup Guide (Gmail API + OAuth)

MailFlow Pro is an enterprise-grade email platform that uses **Google OAuth 2.0** and the **Gmail API** to send emails directly from a user's account. This prevents your emails from ending up in spam and requires no hardcoded passwords.

---

## 1. Google Cloud Project Setup (CRITICAL)

1.  **Create Project**: Go to the [Google Cloud Console](https://console.cloud.google.com/) and create a new project.
2.  **Enable Gmail API**: Search for "Gmail API" in the library and click **Enable**.
3.  **Configure OAuth Consent Screen**:
    *   Set **User Type** to `External`.
    *   Add your app name and email.
    *   **Add Scopes**: Add `https://www.googleapis.com/auth/gmail.send`, `openid`, `https://www.googleapis.com/auth/userinfo.profile`, and `https://www.googleapis.com/auth/userinfo.email`.
    *   **Add Test Users**: Add your own Gmail address as a test user while in "Testing" mode.
4.  **Create OAuth Credentials**:
    *   Navigate to **APIs & Services > Credentials**.
    *   Click **Create Credentials > OAuth Client ID**.
    *   Type: **Web Application**.
    *   **Authorized JavaScript Origins**: `http://localhost:5173`.
    *   **Authorized Redirect URIs**: `http://localhost:5173`.
    *   Copy your **Client ID** and **Client Secret**.

---

## 2. Environment Variables

### Frontend (`frontend/.env`)
```env
VITE_GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
VITE_API_URL=http://localhost:5000

# Firebase (Used for Firestore History)
VITE_FIREBASE_API_KEY=xxxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxxx
VITE_FIREBASE_PROJECT_ID=xxxxx
VITE_FIREBASE_STORAGE_BUCKET=xxxxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxxxx
VITE_FIREBASE_APP_ID=xxxxx
```

### Backend (`backend/.env`)
```env
PORT=5000
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret
```

---

## 3. Running the Project

### Start Backend
```bash
cd backend
npm install
node index.js
```

### Start Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🏁 Architecture Overview
*   **Frontend**: React handles Google Login and retrieves an **ID Token** and **Access Token**.
*   **Backend**: Node.js receives the tokens, verifies them with Google, and uses the **Access Token** to send the raw email via `gmail.users.messages.send`.
*   **History**: Every successful send is logged to **Firebase Firestore** locally from the client to track activity.

---

## 🚀 Deployment Notes
*   **Redirect URIs**: When deploying, update the Google Cloud Console with your production domain (e.g., `https://mailflow-pro.vercel.app`).
*   **Production Plan**: To use with any user, you must submit your app for **Verification** in the Google Cloud Console.
