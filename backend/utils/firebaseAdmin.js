const admin = require("firebase-admin");

// Only initialize if it hasn't been already (prevents errors on Vercel hot-reloads)
if (!admin.apps.length) {
  try {
    // If the user has explicitly provided a service account JSON string in the environment
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      console.log("Firebase Admin Initialized with Custom Service Account");
    } else {
      // Fallback for local development or GCP default credentials
      console.log("Firebase Admin initializing with Default Credentials (ensure GOOGLE_APPLICATION_CREDENTIALS is set if not on GCP/Vercel)");
      admin.initializeApp();
    }
  } catch (error) {
    console.error("Firebase Admin Initialization Error:", error);
  }
}

const db = admin.apps.length ? admin.firestore() : null;

module.exports = { admin, db };
