const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Stripe = require("stripe");
const multer = require("multer");

const { uploadResume } = require("./cloudinary.js");
const analyzeResume = require("./utils.js");
const chatBot = require("./chatBot.js");

dotenv.config();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(), // Store file in memory
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();
app.use(express.json());
app.use(cors());

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { priceId } = req.body;

    if (!priceId) {
      return res.status(400).json({ error: "Price ID is required" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

app.post("/resumeUpload", upload.single("resume"), async (req, res) => {
  try {
    const resume = req.file;
    return res.json({
      message: "successfully upload resume",
      resumeUrl: res.publicId,
      success: true,
    });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

app.post("/analyze-resume", upload.single("file"), async (req, res) => {
  try {
    const jobDescription = req.body.job_description || "";
    const fileBuffer = req.file.buffer;

    console.log(req.file, "resume");

    const result = await analyzeResume(fileBuffer, jobDescription);
    res.json({ result, message: "successfully analyze resume", success: true });
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
      success: false,
    });
  }
});


app.post("/chat-bot",async(req,res)=>{
  try {
    const message = req.body.message;
    const result =  await chatBot(message);
    res.json({ result, success: true });
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
      success: false,
    });
  }
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
