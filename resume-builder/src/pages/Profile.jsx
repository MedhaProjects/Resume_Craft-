import { motion } from "framer-motion";
import { getDoc, doc } from "firebase/firestore";

import {
  FiUser,
  FiCalendar,
  FiMail,
  FiCreditCard,
  FiCheckCircle,
  FiClock,
  FiFileText,
} from "react-icons/fi";
import { FaCrown } from "react-icons/fa";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";

export default function Profile() {
  const [user, setUser] = useState();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const resumeHistory = [
    {
      id: 1,
      title: "Software Engineer Resume",
      createdAt: "April 10, 2025",
      downloadUrl: "#",
    },
    {
      id: 2,
      title: "Cybersecurity Specialist",
      createdAt: "March 28, 2025",
      downloadUrl: "#",
    },
    {
      id: 3,
      title: "Web Developer",
      createdAt: "March 15, 2025",
      downloadUrl: "#",
    },
  ];

  useEffect(() => {
    const fetchSubscription = async () => {
      if (user) {
        try {
          setLoading(true);
          const userRef = doc(db, "subscriptions", user.email);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            console.log("Subscription Data:", data);
            setData(data);
          } else {
            console.log("No subscription found.");
          }
        } catch (error) {
          console.error("Error fetching subscription:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSubscription();
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  return (
    <>
      {loading ? (
        "loading..."
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-[#101828] text-gray-100 py-12 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.header
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="flex justify-between items-center mb-8"
            >
              <h1 className="text-3xl font-bold text-[#00CFC6]">My Profile</h1>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-[#00CFC6] text-[#101828] px-4 py-2 rounded-lg font-medium"
              >
                <FaCrown className="text-[#101828]" />
                <span>{data?.title || "Freemly"}</span>
              </motion.div>
            </motion.header>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* User Profile Card */}
              <motion.div
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                className="lg:col-span-1 bg-[#1D2939] rounded-xl shadow-lg overflow-hidden border border-[#344054]"
              >
                <div className="bg-[#00CFC6] h-32 relative">
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                    <div className="h-24 w-24 rounded-full border-4 border-[#101828] bg-[#344054] overflow-hidden flex items-center justify-center">
                      <FiUser className="h-12 w-12 text-[#00CFC6]" />
                    </div>
                  </div>
                </div>
                <div className="pt-16 pb-6 px-6">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-gray-100">
                      {user?.email?.split("@")[0] || "User"}
                    </h2>
                    <p className="text-[#00CFC6]">{user?.email}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-[#344054] p-2 rounded-lg">
                        <FiCalendar className="text-[#00CFC6]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">
                          Subscription Start Date
                        </p>
                        <p className="font-medium text-gray-100">
                          {new Date(
                            data?.createdAt.toDate() || Date.now()
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-[#344054] p-2 rounded-lg">
                        <FiCreditCard className="text-[#00CFC6]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">
                          Subscription Status
                        </p>
                        <div className="flex items-center gap-2">
                          <FiCheckCircle className="text-green-400" />
                          <span className="font-medium capitalize text-gray-100">
                            {data?.status || "-"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-[#344054] p-2 rounded-lg">
                        <FiClock className="text-[#00CFC6]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">
                          Subscription Expired
                        </p>
                        <p className="font-medium text-gray-100">
                          {new Date(data?.age).toLocaleDateString() || "Unlimited"}
            
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-[#344054] p-2 rounded-lg">
                        <FiFileText className="text-[#00CFC6]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Resumes Created</p>
                        <p className="font-medium text-gray-100">
                          {resumeHistory.length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Resume History and Details */}
              <div className="lg:col-span-2 space-y-8">
                {/* Subscription Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-[#1D2939] rounded-xl shadow-lg overflow-hidden border border-[#344054]"
                >
                  <div className="p-6 border-b border-[#344054]">
                    <h3 className="text-lg font-bold text-gray-100">
                      Subscription Details
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">
                          Plan
                        </h4>
                        <p className="font-medium text-gray-100">
                          {data?.title}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">
                          Status
                        </h4>
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-2 w-2 rounded-full ${
                              data?.status === "successful"
                                ? "bg-green-400"
                                : "bg-yellow-400"
                            }`}
                          ></div>
                          <span className="font-medium capitalize text-gray-100">
                            {data?.status}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">
                          Price ID
                        </h4>
                        <p className="font-mono text-sm text-gray-300 truncate">
                          {data?.priceId || "-"}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">
                          Session ID
                        </h4>
                        <p className="font-mono text-sm text-gray-300 truncate">
                          {data?.sessionId || "-"}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Resume History */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-[#1D2939] rounded-xl shadow-lg overflow-hidden border border-[#344054]"
                >
                  <div className="p-6 border-b border-[#344054]">
                    <h3 className="text-lg font-bold text-gray-100">
                      Your Resume History
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {resumeHistory &&
                        resumeHistory.map((resume) => (
                          <motion.div
                            key={resume.id}
                            whileHover={{ scale: 1.01 }}
                            className="flex justify-between items-center p-4 border border-[#344054] rounded-lg hover:bg-[#344054] transition-colors"
                          >
                            <div>
                              <h4 className="font-medium text-gray-100">
                                {resume.title}
                              </h4>
                              <p className="text-sm text-gray-400">
                                {resume.createdAt}
                              </p>
                            </div>
                            <motion.a
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              href={resume.downloadUrl}
                              className="text-[#101828] bg-[#00CFC6] hover:bg-[#00e0d6] px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                              Download
                            </motion.a>
                          </motion.div>
                        ))}
                    </div>
                  </div>
                </motion.div>

                {/* Account Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-[#1D2939] rounded-xl shadow-lg overflow-hidden border border-[#344054]"
                >
                  <div className="p-6 border-b border-[#344054]">
                    <h3 className="text-lg font-bold text-gray-100">
                      Account Information
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-400">
                            User ID
                          </h4>
                          <p className="font-mono text-sm text-gray-300 truncate">
                            {data?.uid || user?.uid || "-"}
                          </p>
                        </div>
                        <button className="text-sm text-[#00CFC6] hover:text-[#00e0d6]">
                          Copy
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-400">
                            Email
                          </h4>
                          <p className="text-gray-300">{data?.email || user?.email || "sample@gmail.com"}</p>
                        </div>
                        <button className="text-sm text-[#00CFC6] hover:text-[#00e0d6]">
                          Verified
                        </button>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400">
                          Account Age
                        </h4>
                        <p className="text-gray-300">
                          { new Date(data?.age || Date.now()).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
