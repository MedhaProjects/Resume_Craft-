
const { GoogleGenerativeAI } = require("@google/generative-ai")
const pdfParse = require("pdf-parse")
const fs = require("fs");
const dotenv = require("dotenv")
dotenv.config();


const apiKey = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 0.8,
  topP: 0.9,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

 async function analyzeResume(fileBuffer, jobDescription) {
  try {
    const pdfData = await pdfParse(fileBuffer);
    const resumeText = pdfData.text;

    let prompt = `You are an advanced Applicant Tracking System (ATS) with expertise in HR and technical recruitment.

    Your task is to analyze the following resume and provide a structured evaluation.
    
    Return a valid JSON object with these keys:
    - "ats_score" (Number between 0-100)
    - "strengths" (Array of strings)
    - "weaknesses" (Array of strings)
    - "existing_skills" (Array of strings)
    - "recommended_skills" (Array of strings)
    - "course_suggestions" (Array of strings in "Course Name - Platform" format)
    
    Resume:
    ${resumeText}
    
    ${jobDescription ? `Job Description:\n${jobDescription}` : ""}
    
    Respond ONLY with raw JSON — no explanations, no markdown, no formatting.
    `;
    
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });
    const response = await result.response;
    const text = response.text();

    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating study material:", error);
    return null;
  }
}

module.exports = analyzeResume;