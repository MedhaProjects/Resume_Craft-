import React, { useState } from "react";

const ResumeEditor = () => {
  const [resume, setResume] = useState({
    name: "Daniel Gallego",
    contact: "hello@reallygreatsite.com | 123 Anywhere St., Any City",
    website: "www.reallygreatsite.com",
    websiteText: "My Portfolio",
    title: "UX Designer",
    summary:
      "Results-driven UX Designer with expertise in user research, wireframing, and prototyping. Adept at improving user engagement and satisfaction through intuitive designs.",
    projects: [
      "System UX Engineer, XarrowAI Industries (02/2021 - 12/2022) - Led UX research, improved customer engagement by 30%, designed wireframes.",
      "Instant Chartz App, Morcelle Program (01/2023 - Present) - Developed user flows, enhanced UI design consistency, increased retention rate.",
    ],
    education: [
      "Bachelor of Design in Process Engineering, Engineering University (05/2014 - 05/2016)",
      "UX Industrial Basics and General Application, University of Engineering UX Cohort (08/2016 - 10/2019)",
    ],
    skills: [
      "Prototyping Tools (Figma, Adobe XD)",
      "User Research & Testing",
      "Information Architecture",
      "Interaction Design",
      "Agile & Scrum Methodologies",
    ],
    languages: ["English (Fluent)", "French (Intermediate)", "Mandarin (Basic)"],
    certifications: ["Professional Design Engineer (PDE) License"],
    achievements: ["Most Innovative Employer of the Year (2021)"],
  });

  const handleChange = (e, field) => {
    setResume({ ...resume, [field]: e.target.value });
  };

  const handleArrayChange = (e, field, index) => {
    const newValues = [...resume[field]];
    newValues[index] = e.target.value;
    setResume({ ...resume, [field]: newValues });
  };

  const handleAdd = (field) => {
    setResume({ ...resume, [field]: [...resume[field], ""] });
  };

  const handleRemove = (field, index) => {
    const newValues = resume[field].filter((_, i) => i !== index);
    setResume({ ...resume, [field]: newValues });
  };

  return (
    <div className="flex p-10 bg-gray-900 min-h-screen">
      <div className="w-full flex flex-row gap-8">
        {/* Resume Editor Section */}
        <div className="bg-white p-6 text-black rounded-lg shadow-lg border border-gray-300 w-1/2">
          <h2 className="text-2xl font-bold text-gray-800">Edit Resume</h2>
          <div className="mt-4 space-y-4">
            {Object.entries(resume).map(([field, value]) =>
              Array.isArray(value) ? (
                <div key={field} className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-700 capitalize">{field.replace(/_/g, " ")}</h3>
                  {value.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 mt-2">
                      <input
                        className="w-full border p-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 text-black"
                        value={item}
                        onChange={(e) => handleArrayChange(e, field, index)}
                      />
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                        onClick={() => handleRemove(field, index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    className="bg-green-500 text-black px-3 py-1 mt-2 rounded-md hover:bg-green-600 transition"
                    onClick={() => handleAdd(field)}
                  >
                    + Add {field.slice(0, -1)}
                  </button>
                </div>
              ) : (
                <label key={field} className="block text-gray-700">
                  <span className="font-semibold capitalize">{field.replace(/_/g, " ")}:</span>
                  <input
                    className="w-full border p-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 mt-1 text-black"
                    value={value}
                    onChange={(e) => handleChange(e, field)}
                  />
                </label>
              )
            )}
          </div>
        </div>

        {/* Resume Preview Section - A4 Paper Size */}
        <div
          className="bg-white p-8 shadow-lg border border-gray-300 rounded-lg w-1/2"
          style={{
            width: "210mm",
            height: "297mm",
            overflow: "auto",
            marginTop: "10px",
            marginBottom: "10px",
            boxSizing: "border-box",
          }}
        >
          <h1 className="text-4xl font-extrabold text-blue-700">{resume.name}</h1>
          <p className="text-gray-700 mt-1 text-sm font-medium">{resume.title}</p>
          <p className="text-gray-700 text-sm font-medium">{resume.contact}</p>
          <p className="text-gray-700 text-sm font-medium">
            <a
              href={`https://${resume.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {resume.websiteText}
            </a>
          </p>

          <section className="mt-6">
            <h2 className="text-lg font-bold text-blue-700 uppercase border-b pb-1">Summary</h2>
            <p className="text-gray-700 text-sm mt-2">{resume.summary}</p>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-bold text-blue-700 uppercase border-b pb-1">Projects</h2>
            <ul className="text-gray-700 text-sm mt-2 list-disc pl-5">
              {resume.projects.map((item, index) => (
                <li key={index} className="mb-2">
                  <div className="font-semibold">{item.split(" (")[0]}</div>
                  <div className="text-sm">{item.split(" (")[1]}</div>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-bold text-blue-700 uppercase border-b pb-1">Education</h2>
            <ul className="text-gray-700 text-sm mt-2 list-disc pl-5">
              {resume.education.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-bold text-blue-700 uppercase border-b pb-1">Skills</h2>
            <ul className="text-gray-700 text-sm mt-2 list-disc pl-5">
              {resume.skills.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-bold text-blue-700 uppercase border-b pb-1">Languages</h2>
            <ul className="text-gray-700 text-sm mt-2 list-disc pl-5">
              {resume.languages.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-bold text-blue-700 uppercase border-b pb-1">Certifications</h2>
            <ul className="text-gray-700 text-sm mt-2 list-disc pl-5">
              {resume.certifications.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-bold text-blue-700 uppercase border-b pb-1">Achievements</h2>
            <ul className="text-gray-700 text-sm mt-2 list-disc pl-5">
              {resume.achievements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;
