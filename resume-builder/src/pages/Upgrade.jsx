import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaCrown } from "react-icons/fa";
import { motion } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import { auth } from "../firebase";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { redirect } from "react-router-dom";
import { fetchSubscriptionDataByEmail } from "../utils/utils";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const pricingPlans = [
  {
    title: "Free Plan",
    price: "₹0",
    features: [
      "4 Free Templates",
      "Basic ATS Scoring",
      "Watermarked PDF",
      "Limited AI Resume Suggestions",
    ],
    buttonText: "Start for Free",
    link: "/template",
    isPremium: false,
    age:0
  },
  {
    title: "Premium Monthly",
    price: "   ₹199/month",
    priceId: import.meta.env.VITE_STRIPE_PRICE_ID_PRO_MONTHLY,
    features: [
      "08 Premium Templates",
      "Advanced ATS Scoring",
      "No Watermark PDFs",
      "Unlimited Edits",
    ],
    age: 30, //days,
    buttonText: "Subscribe Monthly",
    isPremium: true,
  },
  {
    title: "Premium Yearly",
    price: "₹1999/year",
    priceId: import.meta.env.VITE_STRIPE_PRICE_ID_PRO_YEARLY,
    features: [
      "All Future Templates",
      "Modern Template",
      "Ats Detailed Review",
      "All Features Unlocked",
      "No Watermark PDFs",
      "Unlimited Edits",
    ],
    age: 365, //days,
    buttonText: "Subscribe Yearly",
    isPremium: true,
  },
];

const Upgrade = () => {
  const [user, setUser] = useState();
  const [isPremiumUser, setIsPremiumUser] = useState();
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

  const handleStripeCheckout = async (priceId, age, title) => {
    try {
      if (!user || !user.email) {
        alert("login first...");
        redirect("/auth");
        return;
      }
      setUser(user);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ priceId }),
        }
      );

      const { sessionId } = await response.json();

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        console.error("Stripe Checkout Error:", error);
        alert("Failed to redirect to checkout.");
      }
      localStorage.setItem("firebaseTitle",title);
      localStorage.setItem("firebasePriceId",priceId);
      localStorage.setItem("firebaseAge",age);
      localStorage.setItem("sessionId",sessionId);
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    }
  };

  // Listen for authentication status changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user && user.email) {
      fetchSubscriptionDataByEmail(user.email)
        .then((data) => setIsPremiumUser(data))
        .catch((error) => console.error("Error fetching subscription:", error));
    }
  }, [user]);
  return (
    <div className="min-h-screen bg-gray-900 py-12 text-center text-white relative">
      <motion.div
        className="absolute top-0 left-0 right-0 bg-gradient-to-r from-red-500 to-yellow-400 text-white py-3 text-lg font-bold shadow-lg"
        initial={{ scale: 0.9, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
      >
        🎉 Limited Time Offer! Ends in{" "}
        <span className="font-extrabold">{formatTime(timeLeft)}</span>
      </motion.div>

      <h1 className="text-5xl font-extrabold text-yellow-400 mt-16 mb-6">
        Upgrade Your Resume
      </h1>
      <p className="text-lg text-gray-300 mb-8">
        Get premium templates, AI resume suggestions, and much more!
      </p>

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
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 20px rgba(255, 215, 0, 0.5)",
            }}
          >
            {plan.isPremium && (
              <FaCrown className="text-yellow-400 text-3xl absolute top-4 right-4" />
            )}
            <h2 className="text-3xl font-bold text-yellow-300">{plan.title}</h2>
            <p className="text-xl font-extrabold text-green-400 my-3">
              {plan.price}
            </p>
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
                onClick={() =>
                  handleStripeCheckout(plan.priceId, plan.age, plan.title)
                }
                className={`  ${
                  isPremiumUser?.title == plan.title
                    ? "bg-gradient-to-r from-green-500 to-blue-500"
                    : "bg-gradient-to-r from-purple-500 to-blue-500"
                }  text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:opacity-90 w-full transition-all`}
              >
                {isPremiumUser?.title == plan.title
                  ? "Subscribed"
                  : plan.buttonText}
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
