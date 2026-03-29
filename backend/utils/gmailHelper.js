const { google } = require("googleapis");

/**
 * Creates a raw RFC822 format email and encodes it to Base64 (URL safe).
 */
const createRawEmail = ({ to, subject, message, from }) => {
  const emailLines = [
    `To: ${to}`,
    `Subject: ${subject}`,
    "Content-Type: text/plain; charset=utf-8",
    "",
    message,
  ];
  const email = emailLines.join("\n").trim();
  return Buffer.from(email)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

/**
 * Sends an email using the Gmail API with the provided access token.
 */
const sendGmail = async (accessToken, emailData) => {
  const oAuth2Client = new google.auth.OAuth2();
  oAuth2Client.setCredentials({ access_token: accessToken });

  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
  const raw = createRawEmail(emailData);

  const response = await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: raw,
    },
  });

  return response.data;
};

module.exports = {
  sendGmail,
};
