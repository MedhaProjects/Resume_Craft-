import { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const resumeTypes = [
  {
    title: "Chronological Resume",
    bestFor: "Candidates with a strong work history in a specific field.",
    structure: [
      "Contact Information",
      "Summary/Objective",
      "Work Experience (in reverse chronological order)",
      "Education",
      "Skills",
      "Certifications (if applicable)"
    ],
    pros: ["Shows career growth and stability.", "Preferred by recruiters and ATS-friendly."],
    cons: ["Not ideal for career changers or those with employment gaps."],
    color: "from-green-400 to-blue-500"
  },
  {
    title: "Functional Resume (Skills-Based)",
    bestFor: "Career changers, freshers, or those with employment gaps.",
    structure: [
      "Contact Information",
      "Summary/Objective",
      "Skills Section (divided into categories with bullet points)",
      "Work Experience (brief, without details)",
      "Education"
    ],
    pros: ["Focuses on skills rather than job history.", "Good for highlighting transferable skills."],
    cons: ["Some recruiters dislike it because it hides work history.", "Not very ATS-friendly."],
    color: "from-purple-400 to-pink-500"
  },
  {
    title: "Combination (Hybrid) Resume",
    bestFor: "Those with both strong skills and relevant work experience.",
    structure: [
      "Contact Information",
      "Summary/Objective",
      "Skills Section (with details and examples)",
      "Work Experience (reverse chronological)",
      "Education"
    ],
    pros: ["Balances both skills and experience.", "Works well for mid-career professionals."],
    cons: ["Can become lengthy.", "Needs careful formatting to be ATS-friendly."],
    color: "from-yellow-400 to-orange-500"
  },
  {
    title: "Targeted Resume",
    bestFor: "Applying for specific jobs where customization is needed.",
    structure: ["Similar to any of the above formats but tailored to a particular job description."],
    pros: ["Increases chances of selection.", "Shows that you have researched the company."],
    cons: ["Time-consuming to create for each job application."],
    color: "from-blue-400 to-teal-500"
  },
  {
    title: "Infographic Resume",
    bestFor: "Creative fields like graphic design, marketing, and media.",
    structure: ["Uses visual elements like charts, icons, and infographics to present information."],
    pros: ["Grabs attention.", "Shows creativity and design skills."],
    cons: ["Not ATS-friendly.", "Not suitable for traditional industries."],
    color: "from-red-400 to-purple-500"
  },
  {
    title: "CV (Curriculum Vitae)",
    bestFor: "Academia, research, medical fields, and jobs requiring extensive documentation.",
    structure: [
      "Contact Information",
      "Summary/Objective",
      "Education",
      "Work Experience",
      "Research/Publications",
      "Conferences & Certifications",
      "Awards & Honors"
    ],
    pros: ["Ideal for academic and research roles.", "Comprehensive and detailed."],
    cons: ["Too long for most corporate jobs.", "Not ATS-friendly."],
    color: "from-gray-400 to-black"
  }
];

export default function ResumeTypes() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="p-10 bg-gray-900  min-h-screen">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 text-center mb-8 drop-shadow-lg">
        Types of Resumes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {resumeTypes.map((resume, index) => (
          <motion.div
            key={index}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className="p-6 bg-opacity-80 backdrop-blur-md border border-gray-600 rounded-2xl shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:border-white hover:shadow-2xl"
            whileHover={{ scale: 1.05 }}
          >
            <FaCheckCircle className="text-5xl text-white mx-auto mb-4 animate-pulse" />
            <h3
              className={`text-xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r ${resume.color}`}
            >
              {resume.title}
            </h3>
            {hovered === index && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-4 text-white"
              >
                <h3 className="font-semibold text-lg">Best For:</h3>
                <p className="text-sm">{resume.bestFor}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Additional Info Box */}
      <div className="mt-10 p-6 bg-white shadow-xl rounded-lg border-l-8 border-blue-500 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Which One Should You Choose?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          {[
            { category: "Freshers", type: "Functional or Combination Resume" },
            { category: "Experienced Professionals", type: "Chronological or Combination Resume" },
            { category: "Career Changers", type: "Functional or Targeted Resume" },
            { category: "Creative Fields", type: "Infographic Resume" },
            { category: "Academia/Research", type: "CV (Curriculum Vitae)" }
          ].map((item, i) => (
            <div
              key={i}
              className="p-5 bg-gray-100 rounded-lg border-l-4 border-blue-600 hover:bg-blue-50 transition duration-300"
            >
              <span className="block text-lg font-semibold text-blue-700">{item.category}</span>
              <p className="text-gray-800">{item.type}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
