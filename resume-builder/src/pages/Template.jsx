import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCrown, FaTimes } from "react-icons/fa";
import { auth } from "../firebase"; // Firebase import for authentication
import { onAuthStateChanged } from "firebase/auth";

const templates = [
  { id: 1, name: "Basic", image: "/r1.jpg", path: "/template5", isPremium: false },
  { id: 2, name: "Creative", image: "/r2.jpg", path: "/template10", isPremium: false },
  { id: 3, name: "Professional", image: "/r1.jpg", path: "/template7", isPremium: false },
  { id: 4, name: "Fresher", image: "/r1.jpg", path: "/template9", isPremium: false },
  { id: 5, name: "Pro", image: "/r1.jpg", path: "/template1", isPremium: true },
  { id: 6, name: "Exp", image: "/r1.jpg", path: "/template2", isPremium: true },
  { id: 7, name: "Photo", image: "/r1.jpg", path: "/template3", isPremium: true },
  { id: 8, name: "Final", image: "/r1.jpg", path: "/template4", isPremium: true },
];
const filters = ["all", "free", "premium", "fresher", "experience", "creative"];

const TemplatePage = () => {
  const navigate = useNavigate();
  const [hoveredTemplate, setHoveredTemplate] = useState(null);
  const [isPremiumUser, setIsPremiumUser] = useState(false); // Change this based on user status
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [user, setUser] = useState(null); // Track if the user is logged in

  // Listen for authentication status changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set user if logged in
    });
    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 py-10 text-center text-white px-5">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-5xl font-extrabold text-teal-400 drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Choose Your Perfect CV Template
        </motion.h2>
        <p className="mt-4 text-lg text-gray-300">
          Professional, ATS-friendly, and stylish templates to land your dream job.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mt-12 max-w-6xl mx-auto">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            className="relative bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 shadow-lg text-white hover:shadow-2xl transition-transform transform hover:scale-105 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            onMouseEnter={() => setHoveredTemplate(template.id)}
            onMouseLeave={() => setHoveredTemplate(null)}
          >
            {template.isPremium && (
              <FaCrown className="text-yellow-500 text-2xl absolute top-4 right-4" />
            )}
            <img
              src={template.image}
              alt={template.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold mt-3 text-center text-teal-300">
              {template.name}
            </h3>

            {hoveredTemplate === template.id && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 text-white text-lg font-semibold rounded-lg space-y-4 p-4">
                {!user ? (
                  // If the user is not logged in, show a "Login to Use" message
                  <>
                    <p className="text-xl">Login to Use Template</p>
                    <button
                      className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
                      onClick={() => navigate("/auth")}
                    >
                      Login Now
                    </button>
                  </>
                ) : (
                  <>
                    {template.isPremium && !isPremiumUser ? (
                      <>
                        <FaCrown className="text-yellow-400 text-4xl" />
                        <p>Subscribe to Unlock</p>
                        <button
                          className="px-6 py-3 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition"
                          onClick={() => navigate("/upgrade")}
                        >
                          Upgrade Now
                        </button>
                        <button
                          className="px-6 py-2 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition"
                          onClick={() => setPreviewTemplate(template)}
                        >
                          Preview
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="px-6 py-2 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-600 transition"
                          onClick={() => navigate(template.path)}
                        >
                          Use Template
                        </button>
                        <button
                          className="px-6 py-2 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition"
                          onClick={() => setPreviewTemplate(template)}
                        >
                          Preview
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Full-Screen Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
          <div className="relative w-full h-full flex flex-col justify-center items-center">
            <button
              className="absolute top-5 right-5 text-white text-3xl hover:text-gray-400"
              onClick={() => setPreviewTemplate(null)}
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl font-bold text-teal-400 text-center mb-4">
              {previewTemplate.name} Template Preview
            </h2>
            <div className="flex flex-col items-center w-full h-full">
              <img
                src={previewTemplate.image}
                alt={previewTemplate.name}
                className="w-auto h-full object-contain"
              />
              {/* Action Buttons */}
              <div className="absolute bottom-10 flex justify-center space-x-4">
                {previewTemplate.isPremium && !isPremiumUser ? (
                  <button
                    className="px-6 py-3 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition"
                    onClick={() => navigate("/upgrade")}
                  >
                    Subscribe to Unlock
                  </button>
                ) : (
                  <button
                    className="px-6 py-3 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-600 transition"
                    onClick={() => navigate(previewTemplate.path)}
                  >
                    Use Template
                  </button>
                )}
                <button
                  className="px-6 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition"
                  onClick={() => setPreviewTemplate(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplatePage;
