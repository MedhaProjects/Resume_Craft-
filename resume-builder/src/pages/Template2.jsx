import React, { useState } from "react";
import { jsPDF } from "jspdf";

const Template2 = () => {
  const [formData, setFormData] = useState({
    name: "Jane Smith",
    title: "Marketing Manager",
    email: "jane.smith@example.com",
    phone: "(123) 456-7890",
    linkedin: "",
    portfolio: "",
    summary: "",
    experienceHeading: "Experience",
    educationHeading: "Education",
    skillsHeading: "Skills",
    certificationsHeading: "Certifications",
    projectsHeading: "Projects",
    achievementsHeading: "Achievements",
    experience: [""],
    education: [""],
    skills: [""],
    certifications: [""],
    projects: [""],
    achievements: [""]
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleArrayChange = (field, index, value) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData({ ...formData, [field]: updatedArray });
  };

  const addArrayItem = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ""]
    });
  };

  const removeArrayItem = (field, index) => {
    const updatedArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updatedArray });
  };

  const downloadResume = () => {
    const doc = new jsPDF();
    const margin = 10;
    const lineHeight = 10;
    const startY = 10;

    doc.setFont("helvetica", "normal");

    let currentY = startY;

    // Name and Title
    doc.setFontSize(22);
    doc.text(formData.name, margin, currentY);
    currentY += lineHeight * 2;
    doc.setFontSize(16);
    doc.text(formData.title, margin, currentY);
    currentY += lineHeight * 2;

    // Contact Info
    doc.setFontSize(12);
    doc.text(`Email: ${formData.email}`, margin, currentY);
    currentY += lineHeight;
    doc.text(`Phone: ${formData.phone}`, margin, currentY);
    if (formData.linkedin) {
      currentY += lineHeight;
      doc.text(`LinkedIn: ${formData.linkedin}`, margin, currentY);
    }
    if (formData.portfolio) {
      currentY += lineHeight;
      doc.text(`Portfolio: ${formData.portfolio}`, margin, currentY);
    }
    currentY += lineHeight;

    // Summary
    if (formData.summary) {
      doc.setFontSize(14);
      doc.text("Summary", margin, currentY);
      currentY += lineHeight;
      doc.setFontSize(12);
      doc.text(formData.summary, margin, currentY);
      currentY += lineHeight * 2;
    }

    // Experience Section
    doc.setFontSize(14);
    doc.text(formData.experienceHeading, margin, currentY);
    currentY += lineHeight;
    doc.setFontSize(12);
    formData.experience.forEach((item, index) => {
      doc.text(`${index + 1}. ${item}`, margin, currentY);
      currentY += lineHeight;
    });

    // Education Section
    doc.setFontSize(14);
    doc.text(formData.educationHeading, margin, currentY);
    currentY += lineHeight;
    formData.education.forEach((item, index) => {
      doc.text(`${index + 1}. ${item}`, margin, currentY);
      currentY += lineHeight;
    });

    // Skills Section
    doc.setFontSize(14);
    doc.text(formData.skillsHeading, margin, currentY);
    currentY += lineHeight;
    formData.skills.forEach((item, index) => {
      doc.text(`${index + 1}. ${item}`, margin, currentY);
      currentY += lineHeight;
    });

    // Certifications Section
    doc.setFontSize(14);
    doc.text(formData.certificationsHeading, margin, currentY);
    currentY += lineHeight;
    formData.certifications.forEach((item, index) => {
      doc.text(`${index + 1}. ${item}`, margin, currentY);
      currentY += lineHeight;
    });

    // Projects Section
    doc.setFontSize(14);
    doc.text(formData.projectsHeading, margin, currentY);
    currentY += lineHeight;
    formData.projects.forEach((item, index) => {
      doc.text(`${index + 1}. ${item}`, margin, currentY);
      currentY += lineHeight;
    });

    // Achievements Section
    doc.setFontSize(14);
    doc.text(formData.achievementsHeading, margin, currentY);
    currentY += lineHeight;
    formData.achievements.forEach((item, index) => {
      doc.text(`${index + 1}. ${item}`, margin, currentY);
      currentY += lineHeight;
    });

    doc.save("resume.pdf");
  };

  return (
    <div className="flex gap-6 p-6 max-w-5xl mx-auto text-black">
      <div className="w-1/2 bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Edit Details</h2>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full p-2 border rounded mb-2 text-black"
          placeholder="Full Name"
        />
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="w-full p-2 border rounded mb-2 text-black"
          placeholder="Job Title"
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="w-full p-2 border rounded mb-2 text-black"
          placeholder="Email"
        />
        <input
          type="text"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className="w-full p-2 border rounded mb-2 text-black"
          placeholder="Phone"
        />
        <input
          type="url"
          value={formData.linkedin}
          onChange={(e) => handleChange("linkedin", e.target.value)}
          className="w-full p-2 border rounded mb-2 text-black"
          placeholder="LinkedIn URL"
        />
        <input
          type="url"
          value={formData.portfolio}
          onChange={(e) => handleChange("portfolio", e.target.value)}
          className="w-full p-2 border rounded mb-2 text-black"
          placeholder="Portfolio URL"
        />
        <textarea
          value={formData.summary}
          onChange={(e) => handleChange("summary", e.target.value)}
          className="w-full p-2 border rounded mb-2 text-black"
          placeholder="Summary"
        ></textarea>

        {["experience", "education", "skills", "certifications", "projects", "achievements"].map((field) => (
          <div key={field} className="mb-4">
            <input
              type="text"
              value={formData[`${field}Heading`]}
              onChange={(e) => handleChange(`${field}Heading`, e.target.value)}
              className="w-full p-2 border rounded mb-2 text-black font-bold"
              placeholder={`Heading for ${field}`}
            />
            {formData[field].map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange(field, index, e.target.value)}
                  className="w-full p-2 border rounded text-black"
                  placeholder={`Add ${field} details`}
                />
                <button
                  onClick={() => removeArrayItem(field, index)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => addArrayItem(field)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Add {field} item
            </button>
          </div>
        ))}
        <button
          onClick={downloadResume}
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        >
          Download Resume as PDF
        </button>
      </div>

      <div className="w-1/2 p-6 border rounded-lg bg-white shadow-md text-black">
        <header className="text-center mb-4">
          <h1 className="text-4xl font-bold">{formData.name}</h1>
          <p className="text-lg">{formData.title}</p>
          <p className="text-md">Email: {formData.email} | Phone: {formData.phone}</p>
          {formData.linkedin && (
            <p className="text-md">
              <a href={formData.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                LinkedIn
              </a>
            </p>
          )}
          {formData.portfolio && (
            <p className="text-md">
              <a href={formData.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                Portfolio
              </a>
            </p>
          )}
        </header>
        {formData.summary && (
          <section className="mt-4">
            <h2 className="text-2xl font-semibold">Summary</h2>
            <p>{formData.summary}</p>
          </section>
        )}
        {["experience", "education", "skills", "certifications", "projects", "achievements"].map((field) => (
          <section key={field} className="mt-4">
            <h2 className="text-2xl font-semibold">{formData[`${field}Heading`]}</h2>
            <ul className="list-disc pl-6 mt-2">
              {formData[field].map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Template2;
