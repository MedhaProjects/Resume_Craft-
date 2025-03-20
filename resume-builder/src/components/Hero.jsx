import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaCheckCircle, FaPlus, FaMinus } from "react-icons/fa";

const Hero = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const navigate = useNavigate();

  const handleGetStarted = () => navigate("/template");

  const features = [
    { title: "ATS Score Calculator", description: "Analyze your resume and get an ATS compatibility score with detailed feedback.", color: "from-green-400 to-blue-500" },
    { title: "Template Options", description: "Choose from multiple professional and modern templates for different job roles.", color: "from-purple-400 to-pink-500" },
    { title: "Download Feature", description: "Easily download your resume in PDF or Word format with a single click.", color: "from-yellow-400 to-red-500" },
    { title: "AI Chatbot Assistance", description: "Get instant guidance on resume building with an AI-powered chatbot.", color: "from-blue-400 to-green-500" },
    { title: "Template Type Description", description: "Understand the strengths of different templates and pick the best one for your career needs.", color: "from-pink-400 to-purple-500" },
    { title: "Upgrade Options", description: "Unlock premium features, advanced templates, and expert reviews for a professional edge.", color: "from-orange-400 to-yellow-500" }
  ];
  

  const faqData = [
    { question: "What makes Resume Craft the best resume tool?", answer: "Using the Resume Builder app, you have a 30% higher chance of getting a job..." },
    { question: "How do I use the Resume Craft app?", answer: "Simply sign up, choose a template, enter your details, and let AI-powered suggestions guide you." },
    { question: "Should I make a different resume for every job application?", answer: "Yes, tailoring your resume to each job increases your chances of getting noticed." }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center justify-center gap-6">
      <div className="flex flex-row items-center justify-center gap-6 w-full max-w-6xl">
        <div className="w-1/2 max-w-md">
          {/* Carousel with autoPlay and interval set, disable manual scrolling */}
          <Carousel 
            autoPlay 
            infiniteLoop 
            showThumbs={false} 
            showStatus={false} 
            interval={3000} // Set the interval time to scroll automatically (in milliseconds)
            swipeable={false} // Disable swipe to prevent backward scroll
            showArrows={false} // Disable arrows to avoid manual navigation
            dynamicHeight={true}
            transitionTime={1000} // Adjust the transition speed for the revolving effect
          >
            {["/h2.png", "/homeback.png","/homeback.png", "/h2.png", "/homeback.png","/homeback.png", "/h2.png", "/homeback.png"].map((imgSrc, index) => (
              <div key={index}>
                <motion.img 
                  src={imgSrc} 
                  alt={`Resume ${index + 1}`} 
                  className="rounded-lg object-cover"
                  initial={{ opacity: 0, rotateY: 90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: -90 }}
                  transition={{ duration: 1 }}
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="w-1/2 text-left">
          <motion.h2 className="text-4xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
            Create professional Resume with Our Resume Craft!
          </motion.h2>
          <motion.p className="text-base opacity-80 mb-4">
            Easily create a resume for any job using our feature-packed and easy-to-use resume builder.
          </motion.p>
          <motion.button
            className="bg-gradient-to-r from-teal-500 to-cyan-500 px-5 py-2 rounded-full text-white font-bold"
            onClick={handleGetStarted}
          >
            Get Started
          </motion.button>
        </div>
      </div>

      <motion.h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500 mt-12">
        Struggling to get hired? Build a professional resume in minutes and boost your chances by 36%!
      </motion.h2>

      <div className="mt-6 w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {features.map((feature, index) => (
          <motion.div 
            key={index} 
            className="p-6 bg-gray-800 rounded-xl shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-700"
            whileHover={{ scale: 1.05, backgroundColor: "#374151" }}
          >
            <FaCheckCircle className="text-4xl text-white mx-auto mb-3" />
            <h3 className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${feature.color}`}>
              {feature.title}
            </h3>
            <p className="text-sm opacity-80 mt-2">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.h2 className="text-3xl font-bold text-center mt-12">
        Frequently Asked Questions
      </motion.h2>

      <div className="w-full max-w-4xl mt-6">
        {faqData.map((faq, index) => (
          <div 
            key={index} 
            className="p-4 bg-gray-800 rounded-lg mb-2 cursor-pointer transition duration-300 ease-in-out hover:bg-gray-700"
            onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">{faq.question}</h3>
              {openFAQ === index ? <FaMinus /> : <FaPlus />}
            </div>
            {openFAQ === index && (
              <motion.p 
                className="mt-2 text-sm opacity-80"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                {faq.answer}
              </motion.p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
