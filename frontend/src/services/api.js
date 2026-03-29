import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

/**
 * Verifies the Google Identity token with the backend server.
 */
export const verifyLogin = async (idToken) => {
  const response = await axios.post(`${API_BASE_URL}/auth/google`, { idToken });
  return response.data;
};

/**
 * Sends an email using the Gmail API through our backend.
 * The backend handles successfully logging the transmission securely.
 */
export const sendEmail = async (to, subject, message, accessToken, userId) => {
  const response = await axios.post(`${API_BASE_URL}/email/send`, {
    to,
    subject,
    message,
    accessToken,
    userId, // Passed for backend Firebase logging
  });

  return response.data;
};

/**
 * Fetches the user's email history via our secure backend.
 */
export const fetchHistory = async (userId) => {
  try {
    console.log("Fetching emails for UID:", userId);
    const response = await axios.get(`${API_BASE_URL}/email/history?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("History fetch error:", error);
    throw error;
  }
};
