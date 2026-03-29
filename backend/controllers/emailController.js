const { sendGmail } = require("../utils/gmailHelper");
const { db, admin } = require("../utils/firebaseAdmin");

/**
 * Sends an email using the Gmail API with the provided access token.
 */
exports.sendEmailAction = async (req, res) => {
  const { to, subject, message, accessToken, userId } = req.body;

  if (!to || !subject || !message || !accessToken) {
    return res.status(400).json({ error: "To, Subject, Message and AccessToken are required" });
  }

  try {
    const result = await sendGmail(accessToken, { to, subject, message });

    // Securely log the email to Firestore from the backend
    if (db && userId) {
      await db.collection("emails").add({
        userId,
        to_email: to,
        subject,
        message,
        status: "sent",
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    res.status(200).json({
      success: true,
      message: "Email sent successfully via Gmail API",
      data: result,
    });
  } catch (error) {
    console.error("Email sending failed:", error);
    res.status(500).json({ error: error.message || "Email sending failed" });
  }
};

/**
 * Fetches the user's email history securely from the backend.
 */
exports.getHistoryAction = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "userId is required to fetch history" });
  }

  if (!db) {
    return res.status(500).json({ error: "Database not initialized on backend. Please configure Service Account." });
  }

  try {
    const historyRef = db.collection("emails").where("userId", "==", userId);
    const snapshot = await historyRef.get();
    
    let history = [];
    snapshot.forEach(doc => {
      // Convert Firestore Timestamp to match frontend expectations if needed, but the original logic
      // just uses timestamp.seconds. We will keep it plain.
      history.push({ id: doc.id, ...doc.data() });
    });

    history.sort((a, b) => {
      const timeA = a.timestamp?.seconds || 0;
      const timeB = b.timestamp?.seconds || 0;
      return timeB - timeA;
    });

    res.status(200).json(history);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ error: "Failed to fetch email history" });
  }
};
