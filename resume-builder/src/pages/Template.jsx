import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCrown, FaTimes } from "react-icons/fa";
import { auth } from "../firebase"; // Firebase import for authentication
import { onAuthStateChanged } from "firebase/auth";

const templates = [
  { id: 1, name: "Experience-Basic", image: "/t5.png", path: "/template5", isPremium: false, category: "experience" },
  { id: 5, name: "Fresher-Basic", image: "/F1.png", path: "/template1", isPremium: false, category: "fresher" },
  { id: 2, name: "Experience-Simple", image: "/t10.png", path: "/template10", isPremium: false, category: "experience" },
  
  { id: 6, name: "Fresher-Simple", image: "/F2.png", path: "/template2", isPremium: false, category: "fresher" },
  { id: 7, name: "Fresher-Professional", image: "/F4.png", path: "/template3", isPremium: false, category: "fresher" },
  { id: 3, name: "Experience-Professional", image: "/t7.png", path: "/template7", isPremium: false, category: "experience" },
  { id: 4, name: "Experience-Creative", image: "/t9.png", path: "/template9", isPremium: false, category: "experience" },
 
  { id: 8, name: "Fresher-Creative", image: "/F3.png", path: "/template4", isPremium: false, category: "fresher" },



  { id: 9, name: "Pro", image: "/r1.jpg", path: "/template6", isPremium: true, category: "premium" },
  { id: 10, name: "Exp", image: "/r1.jpg", path: "/template8", isPremium: true, category: "premium" },
  { id: 11, name: "Photo", image: "/r1.jpg", path: "/template6", isPremium: true, category: "premium" },
  { id: 12, name: "Final", image: "/r1.jpg", path: "/template8", isPremium: true, category: "premium" },

  { id: 13, name: "Photo", image: "/r1.jpg", path: "/template6", isPremium: true, category: "creative" },
  { id: 14, name: "Final", image: "/r1.jpg", path: "/template8", isPremium: true, category: "creative" },
];

const filters = ["all", "free", "premium", "fresher", "experience", "creative"];

const TemplatePage = () => {
  const navigate = useNavigate();
  const [hoveredTemplate, setHoveredTemplate] = useState(null);
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [filteredTemplates, setFilteredTemplates] = useState(templates);

  // Listen for authentication status changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Filter logic based on selected category
  useEffect(() => {
    if (selectedFilter === "all") {
      setFilteredTemplates(templates);
    } else if (selectedFilter === "free") {
      setFilteredTemplates(templates.filter((t) => !t.isPremium));
    } else if (selectedFilter === "premium") {
      setFilteredTemplates(templates.filter((t) => t.isPremium));
    } else {
      setFilteredTemplates(templates.filter((t) => t.category === selectedFilter));
    }
  }, [selectedFilter]);

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

      {/* Filter Options */}
      <div className="flex justify-center space-x-4 mt-8 mb-8">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-4 py-2 rounded-lg font-bold ${
              selectedFilter === filter
                ? "bg-teal-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-teal-600"
            } transition`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mt-6 max-w-6xl mx-auto">
        {filteredTemplates.map((template) => (
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
              className="w-full h-48 object-contain rounded-lg"  // Use object-contain for proper visibility
            />
            <h3 className="text-xl font-semibold mt-3 text-center text-teal-300">
              {template.name}
            </h3>

            {hoveredTemplate === template.id && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 text-white text-lg font-semibold rounded-lg space-y-4 p-4">
                {!user ? (
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
