require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const authRoutes = require("./routes/authRoutes");
const emailRoutes = require("./routes/emailRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: ["https://mailflow-pro.vercel.app", "http://localhost:5173"] }));
app.use(express.json());

// Configure Rate Limiting (Protects from Spam)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api/email/send", limiter);

// Configure routes to work with and without the /api prefix
const router = express.Router();
router.use("/auth", authRoutes);
router.use("/email", emailRoutes);

app.use("/api", router);
app.use("/", router);

app.get("/", (req, res) => {
  res.send("MailFlow Pro API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
