import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaCrown } from "react-icons/fa";

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
  const handlePayment = async (plan) => {
    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load. Check your connection.");
      return;
    }

    const options = {
      key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay Key ID
      amount: plan.amount,
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
    <div className="min-h-screen bg-gray-900 py-10 text-center text-white">
      <h1 className="text-4xl font-bold text-yellow-400 mb-6">Upgrade Your Resume Builder</h1>
      <p className="text-lg text-gray-300 mb-8">Get access to premium templates, AI suggestions, and more!</p>

      <div className="flex justify-center gap-6 flex-wrap">
        {pricingPlans.map((plan, index) => (
          <div key={index} className={`bg-gray-800 text-white p-6 rounded-lg shadow-lg w-80 relative ${plan.isPremium ? "border-2 border-yellow-400" : ""}`}>
            {plan.isPremium && <FaCrown className="text-yellow-400 text-3xl absolute top-4 right-4" />}
            <h2 className="text-2xl font-semibold text-yellow-300">{plan.title}</h2>
            <p className="text-xl font-bold text-green-400 my-2">{plan.price}</p>
            <ul className="text-left space-y-2 mb-4">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <FaCheckCircle className="text-green-400 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            {plan.isPremium ? (
              <button onClick={() => handlePayment(plan)} className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 w-full">
                {plan.buttonText}
              </button>
            ) : (
              <Link to={plan.link} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full block text-center">
                {plan.buttonText}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upgrade;