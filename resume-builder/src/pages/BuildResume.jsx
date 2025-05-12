import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  "Choose a Resume Template",
  "Enter Your Personal Information",
  "Add Work Experience and Education",
  "Include Skills and Achievements",
  "Download and Use Your Resume"
];

export default function BuildResumePage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  // Effect to simulate checking the steps after 2 seconds interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prevStep) => {
        if (prevStep < steps.length - 1) {
          return prevStep + 1;
        }
        clearInterval(timer); // Stop once all steps are completed
        return prevStep;
      });
    }, 2000); // 2 seconds interval

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-8 text-center relative"
      >
        <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full shadow-md text-sm font-semibold">
          Step {currentStep + 1} of {steps.length}
        </div>
        <FileText className="text-blue-600 w-14 h-14 mx-auto mb-4" />
        <h1 className="text-4xl font-extrabold text-gray-800 mb-3">Build Your Resume</h1>
        <p className="text-gray-700 mb-6 text-lg">
          Follow these simple steps to create a professional resume effortlessly.
        </p>

        <div className="mb-6 text-left space-y-3">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`flex items-center gap-3 p-3 rounded-lg shadow-md transition-all ${
                index <= currentStep ? "bg-blue-100" : "bg-gray-200"
              }`}
            >
              {index <= currentStep ? (
                <CheckCircle className="text-blue-600 w-6 h-6" />
              ) : (
                <div className="w-6 h-6 border-2 border-gray-500 rounded-full" />
              )}
              <span className="text-gray-900 font-medium text-lg">{step}</span>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-8 py-3 rounded-xl flex items-center gap-3 mx-auto shadow-lg text-lg font-semibold transition-all"
          onClick={() => navigate("/template")}
        >
          Choose Template <ArrowRight className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </div>
  );
}
