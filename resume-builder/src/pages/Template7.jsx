import React, { useState } from "react";

const ResumeTemplate = () => {
  const [data, setData] = useState({
    name: "RICHARD SANCHEZ",
    title: "MARKETING MANAGER",
    contact: {
      phone: "+123-456-7890",
      email: "hello@reallygreatsite.com",
      address: "123 Anywhere St, Any City",
      website: "www.reallygreatsite.com",
    },
    education: [
      {
        year: "2029 - 2030",
        university: "WARDIERE UNIVERSITY",
        degree: "Master of Business Management",
      },
      {
        year: "2025 - 2029",
        university: "WARDIERE UNIVERSITY",
        degree: "Bachelor of Business",
        gpa: "GPA: 3.8 / 4.0",
      },
    ],
    skills: [
      "Project Management",
      "Public Relations",
      "Teamwork",
      "Time Management",
      "Leadership",
      "Effective Communication",
      "Critical Thinking",
    ],
    languages: {
      English: "Fluent",
      French: "Fluent",
      German: "Basic",
      Spanish: "Intermediate",
    },
    workExperience: [
      {
        company: "Borcelle Studio",
        period: "2030 - PRESENT",
        role: "Marketing Manager & Specialist",
        responsibilities: [
          "Develop and execute comprehensive marketing strategies.",
          "Lead, mentor, and manage a high-performing marketing team.",
          "Monitor brand consistency across marketing channels and materials.",
        ],
      },
      {
        company: "Fauget Studio",
        period: "2025 - 2029",
        role: "Marketing Manager & Specialist",
        responsibilities: [
          "Create and manage the marketing budget.",
          "Oversee market research to identify emerging trends.",
          "Monitor brand consistency across marketing channels and materials.",
        ],
      },
    ],
    references: [
      {
        name: "Estelle Darcy",
        position: "CTO, Wardiere Inc.",
        phone: "123-456-7890",
        email: "hello@reallygreatsite.com",
      },
    ],
  });

  const handleChange = (section, key, index, event) => {
    const value = event.target.value;
    setData((prevData) => {
      const updatedData = { ...prevData };
      if (Array.isArray(updatedData[section])) {
        updatedData[section][index][key] = value;
      } else if (typeof updatedData[section] === "object") {
        updatedData[section][key] = value;
      } else {
        updatedData[section] = value;
      }
      return updatedData;
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg p-8 border rounded-lg font-sans">
      {/* Name & Title Section */}
      <div className="flex flex-col border-b pb-4 mb-4">
        <input
          type="text"
          value={data.name}
          onChange={(e) => handleChange("name", null, null, e)}
          className="text-3xl font-bold text-blue-700 w-full"
        />
        <input
          type="text"
          value={data.title}
          onChange={(e) => handleChange("title", null, null, e)}
          className="text-lg text-gray-600 w-full mt-2"
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Contact & Education Section */}
        <div className="col-span-1 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold border-b pb-2 mb-2">Contact</h2>
          {Object.entries(data.contact).map(([key, value]) => (
            <input
              key={key}
              type="text"
              value={value}
              onChange={(e) => handleChange("contact", key, null, e)}
              className="w-full mt-1"
            />
          ))}

          <h2 className="text-xl font-semibold border-b pb-2 mt-4">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mt-2">
              <input
                type="text"
                value={`${edu.year} - ${edu.university} (${edu.degree})`}
                onChange={(e) => handleChange("education", "degree", index, e)}
                className="w-full"
              />
            </div>
          ))}

          {/* Skills Section */}
          <h2 className="text-xl font-semibold border-b pb-2 mt-4">Skills</h2>
          <ul>
            {data.skills.map((skill, index) => (
              <li key={index} className="mt-1">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleChange("skills", index, null, e)}
                  className="w-full"
                />
              </li>
            ))}
          </ul>

          {/* Languages Section */}
          <h2 className="text-xl font-semibold border-b pb-2 mt-4">Languages</h2>
          {Object.entries(data.languages).map(([language, level], index) => (
            <div key={index} className="mt-1">
              <input
                type="text"
                value={`${language}: ${level}`}
                onChange={(e) => handleChange("languages", language, null, e)}
                className="w-full"
              />
            </div>
          ))}

          {/* References Section */}
          <h2 className="text-xl font-semibold border-b pb-2 mt-4">References</h2>
          {data.references.map((ref, index) => (
            <div key={index} className="mt-2">
              <input
                type="text"
                value={`${ref.name} - ${ref.position}`}
                onChange={(e) => handleChange("references", "name", index, e)}
                className="w-full"
              />
              <input
                type="text"
                value={ref.phone}
                onChange={(e) => handleChange("references", "phone", index, e)}
                className="w-full mt-1"
              />
              <input
                type="text"
                value={ref.email}
                onChange={(e) => handleChange("references", "email", index, e)}
                className="w-full mt-1"
              />
            </div>
          ))}
        </div>

        {/* Work Experience Section */}
        <div className="col-span-2">
          <h2 className="text-xl font-semibold border-b pb-2">Work Experience</h2>
          {data.workExperience.map((job, index) => (
            <div key={index} className="mt-4">
              <input
                type="text"
                value={`${job.company} (${job.period}) - ${job.role}`}
                onChange={(e) => handleChange("workExperience", "role", index, e)}
                className="w-full font-bold"
              />
              {job.responsibilities.map((task, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={task}
                  onChange={(e) => {
                    const value = e.target.value;
                    setData((prevData) => {
                      const updatedData = { ...prevData };
                      updatedData.workExperience[index].responsibilities[idx] = value;
                      return updatedData;
                    });
                  }}
                  className="w-full mt-1"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplate;
