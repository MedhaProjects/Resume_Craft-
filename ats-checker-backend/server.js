import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import { uploadResume } from "./cloudinary.js";
import multer from "multer";

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


app.post("/resumeUpload",upload.single('resume'),async(req,res)=>{
    try {
        const resume = req.file;
        console.log(req.body);
        console.log(req.file,"res")
        // const res = await uploadResume(resume,email);

        // console.log(res,"cloud res");

    return res.json({
        message:"successfully upload resume",
        resumeUrl:res.publicId,
        success:true
    })
    } catch (error) {
        console.error("Stripe error:", error);
        res.status(500).json({ error: "Failed to create checkout session" });
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
