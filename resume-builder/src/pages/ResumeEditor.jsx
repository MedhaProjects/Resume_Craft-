import React, { useState } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ResumeEditor = () => {
  const { templateId } = useParams();

  const [formData, setFormData] = useState({
    fullName: "John Doe",
    jobTitle: "Software Developer",
    email: "johndoe@example.com",
    phone: "+123 456 7890",
    address: "New York, USA",
    summary: "Passionate software developer with expertise in React and Node.js.",
    skills: ["JavaScript", "React", "Node.js", "MongoDB"],
    education: [
      { degree: "B.Tech in Computer Science", school: "XYZ University", year: "2023" },
    ],
    experience: [
      { position: "Frontend Developer", company: "ABC Corp", year: "2023-Present" },
    ],
    profileImage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, profileImage: reader.result });
    };
    if (file) reader.readAsDataURL(file);
  };

  const downloadPDF = () => {
    const element = document.getElementById("resume-preview");
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 280);
      pdf.save("resume.pdf");
    });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Edit Your Resume</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Side - Form Input */}
        <div className="bg-white text-black p-6 rounded-lg shadow-lg">
          <label className="block mb-2">Full Name:</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full p-2 border rounded" />

          <label className="block mt-4 mb-2">Job Title:</label>
          <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} className="w-full p-2 border rounded" />

          <label className="block mt-4 mb-2">Profile Image:</label>
          <input type="file" onChange={handleImageUpload} className="w-full p-2 border rounded" />

          <label className="block mt-4 mb-2">Summary:</label>
          <textarea name="summary" value={formData.summary} onChange={handleChange} className="w-full p-2 border rounded"></textarea>

          <button onClick={downloadPDF} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Download Resume
          </button>
        </div>

        {/* Right Side - Resume Preview */}
        <div id="resume-preview" className="bg-white text-black p-6 rounded-lg shadow-lg">
          {formData.profileImage && <img src={formData.profileImage} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4" />}
          <h2 className="text-2xl font-bold text-center">{formData.fullName}</h2>
          <h3 className="text-center text-gray-700">{formData.jobTitle}</h3>
          <p className="text-center">{formData.summary}</p>
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;
