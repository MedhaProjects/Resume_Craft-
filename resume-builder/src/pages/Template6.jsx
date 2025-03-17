



import React from "react";

const ResumeTemplate = () => {
  const defaultData = {
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
      {
        company: "Studio Showde",
        period: "2024 - 2025",
        role: "Marketing Manager & Specialist",
        responsibilities: [
          "Develop and maintain strong relationships with partners.",
          "Monitor and maintain brand consistency across all marketing materials.",
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
      {
        name: "Harper Richard",
        position: "CEO, Wardiere Inc.",
        phone: "123-456-7890",
        email: "hello@reallygreatsite.com",
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg p-8 border rounded-lg font-sans">
      <div className="flex items-center border-b pb-4 mb-4">
        <img src="/h2.png" alt="Profile" className="w-24 h-24 rounded-full mr-4" />
        <div>
          <h1 className="text-3xl font-bold text-blue-700">{defaultData.name}</h1>
          <p className="text-lg text-gray-600">{defaultData.title}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold border-b pb-2 mb-2">Contact</h2>
          <p>📞 {defaultData.contact.phone}</p>
          <p>✉️ {defaultData.contact.email}</p>
          <p>📍 {defaultData.contact.address}</p>
          <p>🌐 {defaultData.contact.website}</p>
          <h2 className="text-xl font-semibold border-b pb-2 mt-4">Education</h2>
          {defaultData.education.map((edu, index) => (
            <p key={index} className="mt-2">{edu.year} - {edu.university} ({edu.degree})</p>
          ))}
          <h2 className="text-xl font-semibold border-b pb-2 mt-4">Skills</h2>
          <ul>
            {defaultData.skills.map((skill, index) => (
              <li key={index}>• {skill}</li>
            ))}
          </ul>
          <h2 className="text-xl font-semibold border-b pb-2 mt-4">Languages</h2>
          {Object.entries(defaultData.languages).map(([language, proficiency]) => (
            <p key={language}>{language}: {proficiency}</p>
          ))}
        </div>
        <div className="col-span-2">
          <h2 className="text-xl font-semibold border-b pb-2">Work Experience</h2>
          {defaultData.workExperience.map((job, index) => (
            <div key={index} className="mt-4">
              <h3 className="font-bold">{job.company} ({job.period})</h3>
              <p className="italic">{job.role}</p>
              <ul>
                {job.responsibilities.map((task, idx) => (
                  <li key={idx}>• {task}</li>
                ))}
              </ul>
            </div>
          ))}
          <h2 className="text-xl font-semibold border-b pb-2 mt-4">References</h2>
          {defaultData.references.map((ref, index) => (
            <p key={index} className="mt-2">{ref.name} - {ref.position} | 📞 {ref.phone} | ✉️ {ref.email}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplate;