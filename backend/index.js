require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const emailRoutes = require("./routes/emailRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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
