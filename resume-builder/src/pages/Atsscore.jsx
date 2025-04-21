import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Checker = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [subData, setSubData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ".pdf,.doc,.docx",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFile(file);
      analyzeResume(file);
    },
  });

  const analyzeResume = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://hariom-major-project.onrender.com/analyze-resume", {
        method: "POST",
        body: formData,
      });

      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Error analyzing resume:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSubscription = async () => {
      if (user) {
        try {
          const userRef = doc(db, "subscriptions", user.email);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setSubData(data);
          }
        } catch (error) {
          console.error("Error fetching subscription:", error);
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

  const isPremium = subData?.status === "active";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500">
            Smart Resume Analyzer
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Get instant feedback on how well your resume performs with Applicant
            Tracking Systems
          </p>
        </header>

        {/* Upload Zone */}
        <div className="flex justify-center mb-10">
          <div
            {...getRootProps()}
            className={`w-full max-w-2xl rounded-2xl p-8 border-2 border-dashed transition-all duration-300 cursor-pointer 
              ${
                isDragActive
                  ? "border-cyan-400 bg-gray-800"
                  : "border-teal-500 bg-gray-800/50"
              } 
              hover:bg-gray-800 hover:border-cyan-400 shadow-xl`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <svg
                className="w-12 h-12 text-teal-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <h2 className="text-xl font-semibold">
                {isDragActive
                  ? "Drop your resume here"
                  : "Drag & drop your resume"}
              </h2>
              <p className="text-gray-400">
                Supported formats: PDF, DOC, DOCX (Max 5MB)
              </p>
              <button className="px-6 py-2 bg-teal-600 hover:bg-teal-500 rounded-full font-medium transition-colors">
                Browse Files
              </button>
            </div>
          </div>
        </div>

        {/* File Info */}
        {file && (
          <div className="flex justify-center mb-8">
            <div className="bg-gray-800/70 rounded-lg px-4 py-3 flex items-center space-x-3 max-w-2xl w-full">
              <svg
                className="w-6 h-6 text-teal-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="truncate flex-1">{file.name}</span>
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-cyan-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
            </div>
          </div>
        )}

        {/* Results Section */}
        {data && (
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-gray-700 mb-10">
            {/* Score Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6">
              <h2 className="text-2xl font-bold text-center mb-2">
                Resume Analysis Results
              </h2>
              <p className="text-gray-400 text-center max-w-2xl mx-auto">
                Based on our analysis of your resume against common ATS criteria
              </p>
            </div>

            <div className="p-6 md:p-8 space-y-10">
              {/* Score Card */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-gray-900/50 rounded-xl p-6">
                <div className="w-48 h-48">
                  <CircularProgressbar
                    value={data?.ats_score}
                    text={`${data?.ats_score}%`}
                    styles={buildStyles({
                      textSize: "16px",
                      textColor: "#fff",
                      pathColor:
                        data?.ats_score > 75
                          ? "#4CAF50"
                          : data?.ats_score > 50
                          ? "#FFC107"
                          : "#FF5722",
                      trailColor: "#2D3748",
                    })}
                  />
                </div>
                <div className="flex-1 max-w-2xl">
                  <h3 className="text-xl font-semibold mb-4">
                    ATS Compatibility Score
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {data?.ats_score > 75
                      ? "Your resume shows strong compatibility with most ATS systems. Keep up the good work!"
                      : data?.ats_score > 50
                      ? "Your resume has moderate ATS compatibility. There's room for improvement in several areas."
                      : "Your resume may have difficulty passing through ATS filters. Consider making some key improvements."}
                  </p>
                  <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        data?.ats_score > 75
                          ? "bg-green-500"
                          : data?.ats_score > 50
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${data?.ats_score}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Premium Upsell or Analysis Sections */}
              {!isPremium ? (
                <div className="relative">
                  <div className="blur-sm pointer-events-none">
                    <AnalysisSections data={data} />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-gradient-to-br from-purple-900/80 to-indigo-900/80 border border-purple-500 rounded-xl p-8 max-w-2xl mx-auto backdrop-blur-sm text-center">
                      <div className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-200 text-gray-900 rounded-full p-2 mb-4">
                        <svg
                          className="w-8 h-8"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
                            clipRule="evenodd"
                          />
                          <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-white">
                        Unlock Full Analysis
                      </h3>
                      <p className="text-gray-300 mb-6">
                        Upgrade to Premium to see detailed strengths,
                        weaknesses, skill recommendations, and personalized
                        course suggestions.
                      </p>
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center space-x-3">
                          <svg
                            className="w-5 h-5 text-green-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>Detailed strengths analysis</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <svg
                            className="w-5 h-5 text-green-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>Actionable improvement areas</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <svg
                            className="w-5 h-5 text-green-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>Personalized course recommendations</span>
                        </div>
                      </div>
                      <button
                        onClick={() => navigate("/upgrade")}
                        className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-full font-semibold text-white transition-all shadow-lg hover:shadow-purple-500/20"
                      >
                        Upgrade to Premium
                      </button>
                      <p className="text-sm text-gray-400 mt-4">
                        Already a subscriber?{" "}
                        <button
                          onClick={() => window.location.reload()}
                          className="text-teal-400 hover:underline"
                        >
                          Refresh
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <AnalysisSections data={data} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AnalysisSections = ({ data }) => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InfoSection
        title="Strengths"
        list={data.strengths}
        icon={
          <svg
            className="w-6 h-6 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        }
        color="bg-green-900/30"
        borderColor="border-green-400"
      />
      <InfoSection
        title="Weaknesses"
        list={data.weaknesses}
        icon={
          <svg
            className="w-6 h-6 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        }
        color="bg-red-900/30"
        borderColor="border-red-400"
      />
      <InfoSection
        title="Existing Skills"
        list={data.existing_skills}
        icon={
          <svg
            className="w-6 h-6 text-teal-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
        color="bg-teal-900/30"
        borderColor="border-teal-400"
      />
      <InfoSection
        title="Recommended Skills"
        list={data.recommended_skills}
        icon={
          <svg
            className="w-6 h-6 text-yellow-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        }
        color="bg-yellow-900/30"
        borderColor="border-yellow-400"
      />
    </div>

    {/* Full-width section for courses */}
    <InfoSection
      title="Course Suggestions"
      list={data.course_suggestions}
      icon={
        <svg
          className="w-6 h-6 text-cyan-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
          />
        </svg>
      }
      color="bg-cyan-900/30"
      borderColor="border-cyan-400"
      fullWidth
    />
  </>
);

const InfoSection = ({
  title,
  list,
  icon,
  color,
  borderColor,
  fullWidth = false,
}) => (
  <div
    className={`rounded-xl border-l-4 ${borderColor} ${color} p-5 ${
      fullWidth ? "col-span-1 md:col-span-2" : ""
    }`}
  >
    <div className="flex items-center mb-3 space-x-2">
      {icon}
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <ul className="space-y-2">
      {list.map((item, i) => (
        <li key={i} className="flex items-start">
          <span className="text-gray-300 mr-2">•</span>
          <span className="text-gray-300">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default Checker;
