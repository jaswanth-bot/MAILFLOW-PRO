const admin = require("firebase-admin");

if (!admin.apps.length) {
  try {
    // Check if the user has provided the 3 main pieces of the Service Account directly
    if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          // Vercel sometimes escapes newlines in private keys, we fix it dynamically
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        })
      });
      console.log("🔥 Firebase Admin Initialized with Individual Vercel Environment Variables");
    } 
    // Fallback if they pasted the entire JSON file as one string
    else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      console.log("🔥 Firebase Admin Initialized with JSON Object");
    } else {
      console.error("❌ CRITICAL: No Firebase credentials found in Vercel Environment Variables!");
    }
  } catch (error) {
    console.error("❌ Firebase Admin Initialization Error:", error.message);
  }
}

const db = admin.apps.length ? admin.firestore() : null;

module.exports = { admin, db };
