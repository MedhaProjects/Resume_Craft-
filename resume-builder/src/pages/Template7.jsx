import React, { useState } from "react";

const ResumeTemplate = () => {
  const [data, setData] = useState({
    name: "",
    title: "",
    contact: "",
    email: "",
    summary: "",
    skills: [""],
    experience: [{ company: "", duration: "", details: "" }],
    education: [{ degree: "", institution: "", year: "" }],
    projects: "",
    certificates: [""],
    achievements: [""],
    languages: [""],
  });

  // Handle simple input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // Handle changes for array inputs
  const handleArrayChange = (index, e, field) => {
    const { value } = e.target;
    const updatedArray = [...data[field]];
    updatedArray[index] = value;
    setData({ ...data, [field]: updatedArray });
  };

  // Handle changes for array of objects inputs
  const handleArrayObjectChange = (index, e, field, subfield) => {
    const { value } = e.target;
    const updatedArray = [...data[field]];
    updatedArray[index] = { ...updatedArray[index], [subfield]: value };
    setData({ ...data, [field]: updatedArray });
  };

  // Add new empty array field
  const addArrayField = (field) => {
    const newField =
      field === "experience"
        ? { company: "", duration: "", details: "" }
        : field === "education"
        ? { degree: "", institution: "", year: "" }
        : field === "skills" || field === "achievements" || field === "languages"
        ? ""
        : "";
    setData({ ...data, [field]: [...data[field], newField] });
  };

  // Remove a field from an array
  const removeArrayField = (field, index) => {
    const updatedArray = [...data[field]];
    updatedArray.splice(index, 1);
    setData({ ...data, [field]: updatedArray });
  };

  return (
    <div className="flex space-x-8 p-8 bg-gray-100 min-h-screen justify-center">
      {/* Input Section */}
      <div className="w-full max-w-2xl bg-white text-black p-6 shadow-lg rounded-lg border border-gray-300">
        <h2 className="text-xl font-bold mb-4 text-center">Enter Resume Details</h2>

        {/* Basic Info */}
        {["name", "title", "contact", "email"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={data[field]}
            onChange={handleChange}
            className="w-full mb-2 p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        ))}

        {/* Summary */}
        <textarea
          name="summary"
          placeholder="Professional Summary"
          value={data.summary}
          onChange={handleChange}
          className="w-full mb-4 p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Experience Section */}
        <h3 className="font-semibold mt-4 text-lg">Experience</h3>
        {data.experience.map((exp, index) => (
          <div
            key={index}
            className="mb-2 border border-gray-300 p-3 rounded-lg shadow-sm relative"
          >
            {["company", "duration", "details"].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={exp[field]}
                onChange={(e) =>
                  handleArrayObjectChange(index, e, "experience", field)
                }
                className="w-full mb-2 p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            ))}
            <button
              onClick={() => removeArrayField("experience", index)}
              className="text-red-500 text-sm absolute top-2 right-2"
            >
              ✕ Remove
            </button>
          </div>
        ))}
        <button
          onClick={() => addArrayField("experience")}
          className="bg-blue-500 text-white px-4 py-1 rounded-full mt-2 w-full"
        >
          + Add Experience
        </button>

        {/* Education Section */}
        <h3 className="font-semibold mt-4 text-lg">Education</h3>
        {data.education.map((edu, index) => (
          <div
            key={index}
            className="mb-2 border border-gray-300 p-3 rounded-lg shadow-sm relative"
          >
            {["degree", "institution", "year"].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={edu[field]}
                onChange={(e) =>
                  handleArrayObjectChange(index, e, "education", field)
                }
                className="w-full mb-2 p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            ))}
            <button
              onClick={() => removeArrayField("education", index)}
              className="text-red-500 text-sm absolute top-2 right-2"
            >
              ✕ Remove
            </button>
          </div>
        ))}
        <button
          onClick={() => addArrayField("education")}
          className="bg-green-500 text-white px-4 py-1 rounded-full mt-2 w-full"
        >
          + Add Education
        </button>

        {/* Skills Section */}
        <h3 className="font-semibold mt-4 text-lg">Skills</h3>
        {data.skills.map((skill, index) => (
          <div key={index} className="relative mb-2">
            <input
              value={skill}
              onChange={(e) => handleArrayChange(index, e, "skills")}
              placeholder="Skill"
              className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => removeArrayField("skills", index)}
              className="text-red-500 text-sm absolute top-2 right-2"
            >
              ✕ Remove
            </button>
          </div>
        ))}
        <button
          onClick={() => addArrayField("skills")}
          className="bg-purple-500 text-white px-4 py-1 rounded-full mt-2 w-full"
        >
          + Add Skill
        </button>

        {/* Achievements Section */}
        <h3 className="font-semibold mt-4 text-lg">Achievements</h3>
        {data.achievements.map((achievement, index) => (
          <div key={index} className="relative mb-2">
            <input
              value={achievement}
              onChange={(e) => handleArrayChange(index, e, "achievements")}
              placeholder="Achievement"
              className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              onClick={() => removeArrayField("achievements", index)}
              className="text-red-500 text-sm absolute top-2 right-2"
            >
              ✕ Remove
            </button>
          </div>
        ))}
        <button
          onClick={() => addArrayField("achievements")}
          className="bg-orange-500 text-white px-4 py-1 rounded-full mt-2 w-full"
        >
          + Add Achievement
        </button>

        {/* Languages Section */}
        <h3 className="font-semibold mt-4 text-lg">Languages</h3>
        {data.languages.map((language, index) => (
          <div key={index} className="relative mb-2">
            <input
              value={language}
              onChange={(e) => handleArrayChange(index, e, "languages")}
              placeholder="Language"
              className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              onClick={() => removeArrayField("languages", index)}
              className="text-red-500 text-sm absolute top-2 right-2"
            >
              ✕ Remove
            </button>
          </div>
        ))}
        <button
          onClick={() => addArrayField("languages")}
          className="bg-teal-500 text-white px-4 py-1 rounded-full mt-2 w-full"
        >
          + Add Language
        </button>
      </div>
      {/* Resume Preview Section */}
      <div
        className="w-full max-w-2xl bg-white text-black p-8 shadow-2xl rounded-3xl border border-gray-300"
        style={{ maxWidth: "210mm", maxHeight: "297mm", margin: "0 auto", paddingBottom: "20px" }}
      >
        {/* Header */}
        <div className="pb-4 mb-4 text-center border-b border-gray-200">
          <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight">
            {data.name || "Rachelle Beaudry"}
          </h1>
          <p className="text-lg text-gray-600 mt-1">{data.title || "Accounting Executive"}</p>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            {data.contact || "123 Anywhere St, Any City"} <br />
            <span className="text-blue-700">{data.email || "hello@realityestate.com"}</span>
          </p>
        </div>

        {/* Summary */}
        <div className="mb-6 bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-semibold text-lg text-blue-800 mb-3">Professional Summary</h3>
          <p className="text-gray-700 leading-relaxed">
            {data.summary ||
              "Results-driven Accounting Executive with a proven record of optimizing financial performance. Expertise in strategic financial initiatives and team leadership. Seeking a challenging executive role to leverage analytical skills and drive organizational success."}
          </p>
        </div>

        {/* Work Experience */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg text-blue-800 mb-4">Work Experience</h3>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-50 rounded-xl shadow-sm border border-gray-200">
              <p className="font-bold text-lg text-gray-800">{exp.company}</p>
              <p className="text-sm text-gray-500">{exp.duration}</p>
              <ul className="list-disc ml-5 text-gray-700 mt-2 space-y-1">
                {exp.details.split("\n").map((line, i) => (
                  <li key={i} className="text-sm">{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg text-blue-800 mb-4">Core Skills</h3>
          <div className="grid grid-cols-2 gap-2">
            {data.skills.map((skill, index) => (
              <p key={index} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm border border-gray-200 shadow-sm">
                {skill || "Skill"}
              </p>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg text-blue-800 mb-4">Education</h3>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-50 rounded-xl shadow-sm border border-gray-200">
              <p className="font-semibold text-md text-gray-800">{edu.degree}</p>
              <p className="text-sm text-gray-500">{edu.institution}</p>
              <p className="text-gray-700 text-sm">{edu.year}</p>
            </div>
          ))}
        </div>

        {/* Achievements & Languages */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg text-blue-800 mb-4">Achievements & Languages</h3>
          <div className="space-y-3">
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              {data.achievements.map((ach, index) => (
                <li key={index} className="text-sm">{ach}</li>
              ))}
            </ul>
            <ul className="flex flex-wrap gap-2 text-gray-700">
              {data.languages.map((lang, index) => (
                <li key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium shadow-sm border border-gray-200">
                  {lang || "Language"}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplate;
