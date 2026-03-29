const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Controller to verify the Google ID token and extract user details.
 */
exports.verifyGoogleToken = async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ error: "ID token is required" });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Return the user information
    res.status(200).json({
      googleId,
      email,
      name,
      picture,
    });
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ error: "Invalid token" });
  }
};
