import React, { useState } from "react";

const ResumeTemplate = () => {
  const [resumeData, setResumeData] = useState({
    name: "RICHARD SANCHEZ",
    title: "MARKETING MANAGER",
    contact: {
      phone: "+123-456-7890",
      email: "hello@reallygreatsite.com",
      address: "123 Anywhere St, Any City",
      website: "www.reallygreatsite.com",
    },
    education: [
      { year: "2029 - 2030", university: "WARDIERE UNIVERSITY", degree: "Master of Business Management" },
      { year: "2025 - 2029", university: "WARDIERE UNIVERSITY", degree: "Bachelor of Business", gpa: "GPA: 3.8 / 4.0" },
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
    ],
  });

  const handleChange = (field, value) => {
    setResumeData({ ...resumeData, [field]: value });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg p-8 border rounded-lg font-sans text-black">
      <div className="flex items-center border-b pb-4 mb-4">
        <img src="/h2.png" alt="Profile" className="w-24 h-24 rounded-full mr-4" />
        <div>
          <input 
            type="text" 
            value={resumeData.name} 
            onChange={(e) => handleChange("name", e.target.value)}
            className="text-3xl font-bold border rounded p-1 w-full"
          />
          <input 
            type="text" 
            value={resumeData.title} 
            onChange={(e) => handleChange("title", e.target.value)}
            className="text-lg border rounded p-1 w-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold border-b pb-2 mb-2">Contact</h2>
          <input
            type="text"
            value={resumeData.contact.phone}
            onChange={(e) => setResumeData({ ...resumeData, contact: { ...resumeData.contact, phone: e.target.value } })}
            className="w-full border rounded p-1"
          />
          <input
            type="text"
            value={resumeData.contact.email}
            onChange={(e) => setResumeData({ ...resumeData, contact: { ...resumeData.contact, email: e.target.value } })}
            className="w-full border rounded p-1 mt-2"
          />
          <input
            type="text"
            value={resumeData.contact.address}
            onChange={(e) => setResumeData({ ...resumeData, contact: { ...resumeData.contact, address: e.target.value } })}
            className="w-full border rounded p-1 mt-2"
          />
        </div>
        <div className="col-span-2">
          <h2 className="text-xl font-semibold border-b pb-2">Work Experience</h2>
          {resumeData.workExperience.map((job, index) => (
            <div key={index} className="mt-4">
              <input
                type="text"
                value={job.company}
                onChange={(e) => {
                  const updatedExperience = [...resumeData.workExperience];
                  updatedExperience[index].company = e.target.value;
                  setResumeData({ ...resumeData, workExperience: updatedExperience });
                }}
                className="font-bold border rounded p-1 w-full"
              />
              <input
                type="text"
                value={job.period}
                onChange={(e) => {
                  const updatedExperience = [...resumeData.workExperience];
                  updatedExperience[index].period = e.target.value;
                  setResumeData({ ...resumeData, workExperience: updatedExperience });
                }}
                className="italic border rounded p-1 w-full mt-1"
              />
              <input
                type="text"
                value={job.role}
                onChange={(e) => {
                  const updatedExperience = [...resumeData.workExperience];
                  updatedExperience[index].role = e.target.value;
                  setResumeData({ ...resumeData, workExperience: updatedExperience });
                }}
                className="border rounded p-1 w-full mt-1"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplate;