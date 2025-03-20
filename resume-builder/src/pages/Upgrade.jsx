import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaCrown } from "react-icons/fa";
import { motion } from "framer-motion";

const pricingPlans = [
  {
    title: "Free Plan",
    price: "$0",
    amount: 0,
    features: [
      "3 Free Templates",
      "Basic ATS Scoring",
      "Watermarked PDF",
      "Limited AI Resume Suggestions",
    ],
    buttonText: "Start for Free",
    link: "/template",
    isPremium: false,
  },
  {
    title: "Premium Plan",
    price: "$9.99/month",
    amount: 999,
    features: [
      "10 Premium Templates",
      "Advanced ATS Scoring & Suggestions",
      "High-Quality PDF (No Watermark)",
      "Priority Support",
      "Unlimited Resume Edits",
    ],
    buttonText: "Upgrade Now",
    isPremium: true,
  },
  {
    title: "Lifetime Plan",
    price: "$99 (One-Time)",
    amount: 9900,
    features: [
      "All Future Templates",
      "AI-Powered Resume Writing",
      "Expert Resume Review",
      "Access to All Features Forever",
      "Premium Customer Support",
    ],
    buttonText: "Go Lifetime",
    isPremium: true,
  },
];

const loadRazorpay = async () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Upgrade = () => {
  const [timeLeft, setTimeLeft] = useState(48 * 60 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const handlePayment = async (plan) => {
    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load. Check your connection.");
      return;
    }

    const options = {
      key: "YOUR_RAZORPAY_KEY",
      amount: plan.amount * 100,
      currency: "INR",
      name: "Resume Builder Pro",
      description: `Purchase ${plan.title}`,
      image: "/logo.png",
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: "John Doe",
        email: "johndoe@example.com",
        contact: "9876543210",
      },
      theme: {
        color: "#F37254",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 text-center text-white relative">
      {/* Animated Limited Offer Banner */}
      <motion.div
        className="absolute top-0 left-0 right-0 bg-gradient-to-r from-red-500 to-yellow-400 text-white py-3 text-lg font-bold shadow-lg"
        initial={{ scale: 0.9, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
      >
        🎉 Limited Time Offer! Ends in <span className="font-extrabold">{formatTime(timeLeft)}</span>
      </motion.div>

      <h1 className="text-5xl font-extrabold text-yellow-400 mt-16 mb-6">Upgrade Your Resume </h1>
      <p className="text-lg text-gray-300 mb-8">Get premium templates, AI resume suggestions, and much more!</p>

      <div className="flex justify-center gap-8 flex-wrap">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={index}
            className={`relative bg-gray-800 text-white p-8 rounded-xl shadow-lg w-80 transform transition-all ${
              plan.isPremium ? "border-2 border-yellow-400" : ""
            }`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(255, 215, 0, 0.5)" }}
          >
            {plan.isPremium && <FaCrown className="text-yellow-400 text-3xl absolute top-4 right-4" />}
            <h2 className="text-3xl font-bold text-yellow-300">{plan.title}</h2>
            <p className="text-xl font-extrabold text-green-400 my-3">{plan.price}</p>
            <ul className="text-left space-y-3 mb-5">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <FaCheckCircle className="text-green-400 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            {plan.isPremium ? (
              <button
                onClick={() => handlePayment(plan)}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:opacity-90 w-full transition-all"
              >
                {plan.buttonText}
              </button>
            ) : (
              <Link
                to={plan.link}
                className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 w-full block text-center transition-all"
              >
                {plan.buttonText}
              </Link>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Upgrade;
