# Email Sender Web Application

- **Frontend:** React (Vite) + Tailwind  
- **Backend:** Firebase (Auth, Firestore, Cloud Functions)  
- **Email:** SendGrid (API key only on the server)

## Quick start

```bash
npm run frontend:install
npm run functions:install
```

Copy `frontend/.env.example` → `frontend/.env` (or use the provided values for project `hardy-ally-483414-k6`).

```bash
npm run frontend:dev
```

## Firebase + SendGrid

1. Enable **Authentication** (Email/Password) and **Firestore** in the Firebase console.  
2. Deploy rules and indexes:

   ```bash
   firebase deploy --only firestore:rules,firestore:indexes
   ```

3. Set SendGrid for **deployed** Cloud Functions (required in production; `functions/.env` is for local/emulator only and is not uploaded — see `.firebasignore`):

   ```bash
   firebase functions:config:set sendgrid.key="YOUR_SENDGRID_KEY" sendgrid.from_email="your-verified-sender@example.com"
   ```

   The `from` address must be **verified** in SendGrid (Single Sender or domain authentication).

4. Deploy the callable function:

   ```bash
   npm run deploy:functions
   ```

5. Ensure **Cloud Functions API** (and related build APIs) are enabled on the GCP project if deploy fails.

## Hosting

```bash
npm run frontend:build
npm run deploy:hosting
```

## Layout

```text
frontend/src/     — React app
functions/      — sendEmail callable (SendGrid)
firestore.rules — user-scoped access
```
