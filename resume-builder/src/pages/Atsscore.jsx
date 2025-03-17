import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Checker = () => {
  const [file, setFile] = useState(null);
  const [score, setScore] = useState(null);
  const [mistakes, setMistakes] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".pdf,.doc,.docx",
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
      analyzeResume(acceptedFiles[0]);
    },
  });

  const analyzeResume = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setScore(data.ats_score);
      setMistakes(data.mistakes);
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error("Error analyzing resume:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gradient-to-r from-gray-900 via-gray-800 to-black min-h-screen text-white">
      <h1 className="text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500 drop-shadow-lg">
        ATS Resume Checker
      </h1>
      <div
        {...getRootProps()}
        className="w-96 h-44 border-4 border-dashed border-teal-400 rounded-xl flex flex-col items-center justify-center cursor-pointer bg-gray-800 hover:bg-teal-500 hover:border-cyan-400 transition-all p-5 shadow-2xl"
      >
        <input {...getInputProps()} />
        <p className="text-gray-300 font-medium">Drag & Drop your resume here, or click to browse</p>
      </div>
      {file && <p className="mt-3 text-gray-400 italic">Uploaded: {file.name}</p>}
      {loading && <p className="text-gray-400 mt-3">Analyzing...</p>}
      {score !== null && (
        <div className="mt-6 flex flex-col items-center">
          <div className="w-40 h-40">
            <CircularProgressbar
              value={score}
              text={`${score}%`}
              styles={buildStyles({
                textColor: "#fff",
                pathColor: score > 70 ? "#4CAF50" : "#FF5722",
                trailColor: "#444",
              })}
            />
          </div>
          <h2 className="text-xl mt-4">Your ATS Score</h2>
          <h3 className="text-lg text-teal-400">Mistakes:</h3>
          <ul className="list-disc text-gray-300">{mistakes.map((m, i) => <li key={i}>{m}</li>)}</ul>
          <h3 className="text-lg text-cyan-400">Suggestions:</h3>
          <ul className="list-disc text-gray-300">{suggestions.map((s, i) => <li key={i}>{s}</li>)}</ul>
        </div>
      )}
    </div>
  );
};

export default Checker;
