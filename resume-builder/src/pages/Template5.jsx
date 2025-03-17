import React, { useState } from "react";

const ResumeEditor = () => {
  const [resume, setResume] = useState({
    name: "Daniel Gallego",
    contact: "hello@reallygreatsite.com | 123 Anywhere St., Any City",
    website: "www.reallygreatsite.com",
    title: "UX Designer",
    summary:
      "UX Designer with a focus on delivering impactful results, eager to tackle dynamic challenges and apply creativity to craft intuitive user experiences. Demonstrated proficiency in project management, user-centric problem-solving, and seamless collaboration across teams. Skilled in leveraging state-of-the-art tools and methodologies to streamline processes and elevate user satisfaction.",
    experience: [
      "System UX Engineer, XarrowAI Industries (Feb 2021 - Dec 2022)",
      "Instant Chartz App, Morcelle Program (Jan 2023 - Present)"
    ],
    education: [
      "Bachelor of Design in Process Engineering, Engineering University (May 2014 - May 2016)",
      "UX Industrial Basics and General Application, University of Engineering UX Cohort (Aug 2016 - Oct 2019)"
    ],
    skills: ["Prototyping Tools", "User Research", "Information Architecture", "Interaction Design", "Visual Design", "Usability Heuristics", "Accessibility", "Responsive Design", "User Testing Tools"],
    languages: ["English", "French", "Mandarin"],
    certifications: ["Professional Design Engineer (PDE) License", "Project Management Tech (PMT)"],
    awards: ["Most Innovative Employer of the Year (2021)", "Overall Best Employee Division Two (2024)", "Onboarding Project Lead (2023)"]
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
    <div className="flex gap-8 max-w-6xl mx-auto p-8 text-left">
      <div className="w-1/2 bg-gray-100 p-4 rounded-md">
        <h2 className="text-lg font-bold">Edit Resume</h2>
        {Object.entries(resume).map(([field, value]) => (
          Array.isArray(value) ? (
            <div key={field} className="mt-4">
              <h3 className="text-md font-bold capitalize">{field}</h3>
              {value.map((item, index) => (
                <div key={index} className="flex items-center gap-2 mt-2">
                  <input
                    className="w-full border p-2"
                    value={item}
                    onChange={(e) => handleArrayChange(e, field, index)}
                  />
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleRemove(field, index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                className="bg-green-500 text-white px-2 py-1 mt-2 rounded"
                onClick={() => handleAdd(field)}
              >
                Add {field.slice(0, -1)}
              </button>
            </div>
          ) : (
            <label key={field} className="block mt-4 capitalize">
              {field}:
              <input
                className="w-full border p-2"
                value={value}
                onChange={(e) => handleChange(e, field)}
              />
            </label>
          )
        ))}
      </div>
      <div className="w-1/2 bg-white shadow-lg p-4 border border-gray-300 rounded-md">
        <h1 className="text-4xl font-extrabold text-blue-700">{resume.name}</h1>
        <p className="text-gray-700 mt-1 text-sm font-medium">{resume.title}</p>
        <p className="text-gray-700 text-sm font-medium">{resume.contact}</p>
        <p className="text-gray-700 text-sm font-medium">{resume.website}</p>
        {Object.entries(resume).slice(4).map(([field, value]) => (
          <section key={field} className="mt-6">
            <h2 className="text-md font-bold text-blue-700 uppercase border-b pb-1 capitalize">{field}</h2>
            {Array.isArray(value) ? (
              <ul className="text-gray-700 text-sm mt-2 list-disc pl-5">
                {value.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700 text-sm mt-2">{value}</p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};

export default ResumeEditor;