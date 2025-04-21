const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
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
};

async function chatBot(userMessage) {
  try {
    const systemPrompt = `
You are an AI assistant integrated into a platform called "Resume Craft". 
Your role is to help users improve and understand their resumes. 
Only provide answers related to resume building, formatting, ATS optimization, job-specific tailoring, skills to include, and how to write effective bullet points or summaries.

Always keep responses short, clear, and beginner-friendly. 
Do not answer questions unrelated to resumes, jobs, or career documentation. 
If the question is off-topic, respond with:
"I'm here to help only with resume and job-application related questions. Let's get back to improving your resume!"

Examples of good questions:
- "How can I improve my resume for software engineering?"
- "What skills should I include for a frontend role?"
- "Is it okay to use color in a resume?"
- "How do I write a strong summary for my resume?"

Be professional, helpful, and to the point.
`;

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemPrompt}\n\nUser: ${userMessage}` }],
        },
      ],
      generationConfig,
    });

    const response = await result.response;
    const text = response.text();

    return text; // No need to JSON.parse unless you're expecting structured JSON
  } catch (error) {
    console.error("Error generating resume response:", error);
    return "Sorry, I couldn't process your request right now.";
  }
}

module.exports = chatBot;
