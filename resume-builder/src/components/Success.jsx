import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { CheckCircle, Zap, ShieldCheck, Gift } from "lucide-react";
import { Link } from "react-router-dom";

const Success = () => {
  const [user, setUser] = useState(null);
  const [age, setAge] = useState(30);
  const [title, setTitle] = useState("monthly");
  const [loading, setLoading] = useState(true);

  const storeData = async () => {
    if (user) {
      try {
        setLoading(true);
        const title =
          localStorage.getItem("firebaseTitle") || "Premium Monthly";
        setTitle(title);
        const priceId =
          localStorage.getItem("firebasePriceId") ||
          "price_1R469lAzpRjUcig1QZZqJrhw";
        const age = localStorage.getItem("firebaseAge") || 30;
        setAge(age);
        const sessionId = localStorage.getItem("sessionId") || "gdkgjdg";
        const userRef = doc(db, "subscriptions", user.email);
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          sessionId,
          priceId,
          createdAt: new Date(),
          status: "successful",
          age: new Date().setDate(new Date().getDate() + age),
          title: title,
        });
        console.log("Checkout session info saved to Firestore.");
      } catch (error) {
        console.error("Error saving to Firestore:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    storeData();
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-16 w-16 bg-indigo-200 rounded-full mb-4"></div>
          <div className="h-4 w-48 bg-indigo-200 rounded mb-2"></div>
          <div className="h-4 w-64 bg-indigo-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 3 }}
            >
              <CheckCircle
                className="w-20 h-20 text-white mx-auto mb-4"
                strokeWidth={1.5}
              />
            </motion.div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome to Premium!
            </h1>
            <p className="text-indigo-100 text-lg">
              Your subscription is now active. Enjoy exclusive benefits.
            </p>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-indigo-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Zap className="w-6 h-6 text-indigo-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    What's Next?
                  </h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    <span>Access all premium features immediately</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    <span>Check your email for confirmation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    <span>Download our mobile app for better experience</span>
                  </li>
                </ul>
              </div>

              <div className="bg-indigo-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <ShieldCheck className="w-6 h-6 text-indigo-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    Subscription Details
                  </h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Plan</p>
                    <p className="font-medium text-red-500">
                      {title || "Premium Annual"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-medium text-green-600">Active</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Renewal Date</p>
                    <p className="font-medium text-yellow-700">
                      {new Date(age).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Benefits */}
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Your Premium Benefits
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  {
                    icon: <Gift className="w-8 h-8 text-indigo-600 mx-auto" />,
                    text: "Exclusive Content",
                  },
                  {
                    icon: <Zap className="w-8 h-8 text-indigo-600 mx-auto" />,
                    text: "Priority Support",
                  },
                  {
                    icon: (
                      <ShieldCheck className="w-8 h-8 text-indigo-600 mx-auto" />
                    ),
                    text: "Ad-Free Experience",
                  },
                  {
                    icon: (
                      <CheckCircle className="w-8 h-8 text-indigo-600 mx-auto" />
                    ),
                    text: "Early Access",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="bg-white p-4 rounded-lg shadow-md border border-gray-100"
                  >
                    {item.icon}
                    <p className="mt-3 font-medium text-gray-700">
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Link to={"/template"}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Start Exploring Premium Features
                </motion.button>
              </Link>

              <p className="text-gray-500 text-sm mt-4">
                Need help?{" "}
                <a href="#" className="text-indigo-600 hover:underline">
                  Contact our support team
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Success;
