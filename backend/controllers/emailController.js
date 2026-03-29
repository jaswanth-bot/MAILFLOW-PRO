const { sendGmail } = require("../utils/gmailHelper");

/**
 * Sends an email using the Gmail API with the provided access token.
 */
exports.sendEmailAction = async (req, res) => {
  const { to, subject, message, accessToken } = req.body;

  if (!to || !subject || !message || !accessToken) {
    return res.status(400).json({ error: "To, Subject, Message and AccessToken are required" });
  }

  try {
    const result = await sendGmail(accessToken, { to, subject, message });

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
