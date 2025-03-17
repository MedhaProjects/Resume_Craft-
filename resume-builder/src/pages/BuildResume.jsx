import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BuildResume = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  
  const handleExperienceClick = (level) => {
    if (level === "No Experience" || level === "Less Than 3 Years") {
      setStep(2); // Proceed to student question
    } else {
      navigate("/template"); // Navigate to template page
    }
  };

  const handleStudentSelection = (answer) => {
    if (answer === "No") {
      navigate("/template"); // Navigate to template page
    } else {
      setStep(3); // Proceed to education selection
    }
  };

  const handleEducationSelection = () => {
    navigate("/template"); // Navigate to template page
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center justify-center gap-6">
      {step >= 1 && (
        <div className="text-center">
          <h2 className="text-3xl font-bold">How long have you been working?</h2>
          <p className="text-gray-400 text-lg mt-2">We'll find the best templates for you.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-6">
            {["No Experience", "Less Than 3 Years", "3-5 Years", "5-10 Years", "10+ Years"].map((level) => (
              <button 
                key={level}
                className="border border-blue-500 py-3 px-6 rounded-lg text-blue-400 hover:bg-blue-500 hover:text-white transition"
                onClick={() => handleExperienceClick(level)}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      )}

      {step >= 2 && (
        <div className="text-center mt-6">
          <h2 className="text-2xl font-bold">Are you a student?</h2>
          <div className="flex justify-center gap-4 mt-4">
            <button 
              className="border border-blue-500 text-blue-400 py-3 px-6 rounded-lg hover:bg-blue-500 hover:text-white transition"
              onClick={() => handleStudentSelection("Yes")}
            >
              Yes
            </button>
            <button 
              className="border border-blue-500 text-blue-400 py-3 px-6 rounded-lg hover:bg-blue-500 hover:text-white transition"
              onClick={() => handleStudentSelection("No")}
            >
              No
            </button>
          </div>
        </div>
      )}

      {step >= 3 && (
        <div className="text-center mt-6">
          <h2 className="text-2xl font-bold">Select the option that best describes your education level.</h2>
          <p className="text-gray-400 text-lg mt-2">This helps us guide you through relevant sections.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {["Secondary School", "Vocational Certificate or Diploma", "Apprenticeship or Internship Training", "Associates", "Bachelors", "Masters", "Doctorate or Ph.D."].map((level) => (
              <button 
                key={level}
                className="border border-blue-500 text-blue-400 py-3 px-6 rounded-lg hover:bg-blue-500 hover:text-white transition"
                onClick={handleEducationSelection}
              >
                {level}
              </button>
            ))}
          </div>
          <p className="text-blue-400 mt-4 cursor-pointer" onClick={handleEducationSelection}>Prefer not to answer</p>
        </div>
      )}
    </div>
  );
};

export default BuildResume;
