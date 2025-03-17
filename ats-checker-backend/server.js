import express from "express";
import multer from "multer";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const upload = multer({ storage: multer.memoryStorage() });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(express.json());

const extractTextFromFile = async (file) => {
    if (file.mimetype === "application/pdf") {
      return (await pdfParse(file.buffer)).text;  // ✅ Already correct
    } else if (file.mimetype.includes("word")) {
      return (await mammoth.extractRawText({ buffer: file.buffer })).value;
    }
    return null;
  };
  

const analyzeResume = async (resumeText) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
  Analyze the following resume for ATS compatibility:
  1. Provide an ATS score (0-100).
  2. List mistakes in formatting, keyword usage, or structure.
  3. Provide specific suggestions for improvement.

  Resume Content:
  ${resumeText}
  `;

  const result = await model.generateContent(prompt);
  const response = result.response.text();

  return response;
};

app.post("/analyze", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const resumeText = await extractTextFromFile(req.file);
    if (!resumeText) return res.status(400).json({ error: "Unsupported file format" });

    const analysis = await analyzeResume(resumeText);

    const atsScoreMatch = analysis.match(/ATS Score:\s*(\d+)/);
    const atsScore = atsScoreMatch ? parseInt(atsScoreMatch[1], 10) : 50;

    const mistakesMatch = analysis.match(/Mistakes:\s*(.*?)(Suggestions:|$)/s);
    const mistakes = mistakesMatch ? mistakesMatch[1].trim().split("\n") : [];

    const suggestionsMatch = analysis.match(/Suggestions:\s*(.*)/s);
    const suggestions = suggestionsMatch ? suggestionsMatch[1].trim().split("\n") : [];

    res.json({ ats_score: atsScore, mistakes, suggestions });
  } catch (error) {
    console.error("Error analyzing resume:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
