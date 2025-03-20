import React, { useState } from "react";

const ResumeTemplate = () => {
  const [data, setData] = useState({
    name: "DANIEL GALLEGO",
    title: "UX DESIGNER",
    contact: "123 Anywhere St, Any City | hello@reallygreatsite.com | www.reallygreatsite.com",
    summary:
      "UX Designer with a focus on delivering impactful results, eager to tackle dynamic challenges and apply creativity to craft intuitive user experiences. Demonstrated proficiency in project management, user-centric problem-solving, and seamless collaboration across teams. Skilled in leveraging state-of-the-art tools and methodologies to streamline processes and elevate user satisfaction.",
    skills: [
      "Prototyping Tools", "Interaction Design", "Accessibility",
      "User Research", "Visual Design", "Responsive Design",
      "Information Architecture", "Usability Heuristics", "User Testing Tools"
    ],
    projects: [
      {
        title: "Instant Chartz App, Morcelle Program",
        duration: "Jan 2023 - Present",
        details: [
          "Led development of an advanced automation system, achieving a 15% increase in operational efficiency.",
          "Streamlined manufacturing processes, reducing production costs by 10%.",
          "Implemented preventive maintenance strategies, resulting in a 20% decrease in equipment downtime."
        ]
      },
      {
        title: "System UX Engineer, XarrowAI Industries",
        duration: "Feb 2021 - Dec 2022",
        details: [
          "Designed and optimized a robotic control system, realizing a 12% performance improvement.",
          "Coordinated testing and validation, ensuring compliance with industry standards.",
          "Provided technical expertise, contributing to a 15% reduction in system failures."
        ]
      }
    ],
    education: [
      {
        degree: "UX Industrial Basics and General Application",
        institution: "University of Engineering UX Cohort",
        year: "Aug 2016 - Oct 2019"
      },
      {
        degree: "Bachelor of Design in Process Engineering",
        institution: "Engineering University",
        year: "May 2014 - May 2016"
      }
    ],
    additional: {
      languages: "English, French, Mandarin",
      certifications: "Professional Design Engineer (PDE) License, Project Management Tech (PMT)",
      awards: "Most Innovative Employer of the Year (2021), Overall Best Employee Division Two (2024), Onboarding Project Lead (2023)"
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleArrayChange = (e, field, index) => {
    const { name, value } = e.target;
    const updatedArray = [...data[field]];
    updatedArray[index] = { ...updatedArray[index], [name]: value };
    setData(prevData => ({
      ...prevData,
      [field]: updatedArray
    }));
  };

  const handleClearField = (field) => {
    setData(prevData => ({
      ...prevData,
      [field]: field === 'skills' ? [] : ''
    }));
  };

  const handleClearArrayField = (field, index, key) => {
    const updatedArray = [...data[field]];
    updatedArray[index] = { ...updatedArray[index], [key]: '' };
    setData(prevData => ({
      ...prevData,
      [field]: updatedArray
    }));
  };

  return (
    <div className="flex space-x-4">
      {/* Form Section */}
      <div className="flex-1 text-black bg-white shadow-lg p-8 border rounded-lg font-sans">
        <h2 className="text-2xl font-semibold">Edit Resume</h2>

        {/* Name */}
        <div className="flex items-center mb-2">
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="border p-2 w-full"
          />
          <button onClick={() => handleClearField('name')} className="ml-2 p-2 bg-red-500 text-white rounded">Clear</button>
        </div>

        {/* Title */}
        <div className="flex items-center mb-2">
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            placeholder="Job Title"
            className="border p-2 w-full"
          />
          <button onClick={() => handleClearField('title')} className="ml-2 p-2 bg-red-500 text-white rounded">Clear</button>
        </div>

        {/* Contact Info */}
        <div className="flex items-center mb-2">
          <input
            type="text"
            name="contact"
            value={data.contact}
            onChange={handleChange}
            placeholder="Contact Info"
            className="border p-2 w-full"
          />
          <button onClick={() => handleClearField('contact')} className="ml-2 p-2 bg-red-500 text-white rounded">Clear</button>
        </div>

        {/* Summary */}
        <div className="flex items-center mb-2">
          <textarea
            name="summary"
            value={data.summary}
            onChange={handleChange}
            placeholder="Summary"
            className="border p-2 w-full"
          />
          <button onClick={() => handleClearField('summary')} className="ml-2 p-2 bg-red-500 text-white rounded">Clear</button>
        </div>

        {/* Skills */}
        <div className="flex items-center mb-2">
          <textarea
            name="skills"
            value={data.skills.join(", ")}
            onChange={(e) => handleChange({ target: { name: "skills", value: e.target.value.split(", ") } })}
            placeholder="Skills (comma separated)"
            className="border p-2 w-full"
          />
          <button onClick={() => handleClearField('skills')} className="ml-2 p-2 bg-red-500 text-white rounded">Clear</button>
        </div>

        {/* Projects */}
        {data.projects.map((project, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center mb-2">
              <input
                type="text"
                name="title"
                value={project.title}
                onChange={(e) => handleArrayChange(e, "projects", index)}
                placeholder="Project Title"
                className="border p-2 w-full"
              />
              <button onClick={() => handleClearArrayField('projects', index, 'title')} className="ml-2 p-2 bg-red-500 text-white rounded">Clear</button>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="text"
                name="duration"
                value={project.duration}
                onChange={(e) => handleArrayChange(e, "projects", index)}
                placeholder="Duration"
                className="border p-2 w-full"
              />
              <button onClick={() => handleClearArrayField('projects', index, 'duration')} className="ml-2 p-2 bg-red-500 text-white rounded">Clear</button>
            </div>
            <div className="flex items-center mb-2">
              <textarea
                name="details"
                value={project.details.join(", ")}
                onChange={(e) => handleArrayChange(e, "projects", index)}
                placeholder="Project Details (comma separated)"
                className="border p-2 w-full"
              />
              <button onClick={() => handleClearArrayField('projects', index, 'details')} className="ml-2 p-2 bg-red-500 text-white rounded">Clear</button>
            </div>
          </div>
        ))}

        {/* Education */}
        {data.education.map((edu, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center mb-2">
              <input
                type="text"
                name="degree"
                value={edu.degree}
                onChange={(e) => handleArrayChange(e, "education", index)}
                placeholder="Degree"
                className="border p-2 w-full"
              />
              <button onClick={() => handleClearArrayField('education', index, 'degree')} className="ml-2 p-2 bg-red-500 text-white rounded">Clear</button>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="text"
                name="institution"
                value={edu.institution}
                onChange={(e) => handleArrayChange(e, "education", index)}
                placeholder="Institution"
                className="border p-2 w-full"
              />
              <button onClick={() => handleClearArrayField('education', index, 'institution')} className="ml-2 p-2 bg-red-500 text-white rounded">Clear</button>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="text"
                name="year"
                value={edu.year}
                onChange={(e) => handleArrayChange(e, "education", index)}
                placeholder="Year"
                className="border p-2 w-full"
              />
              <button onClick={() => handleClearArrayField('education', index, 'year')} className="ml-2 p-2 bg-red-500 text-white rounded">Clear</button>
            </div>
          </div>
        ))}

        {/* Additional Info - Editable Fields */}
        <div className="flex items-center mb-2">
          <input
            type="text"
            name="languages"
            value={data.additional.languages}
            onChange={(e) => handleChange({ target: { name: "additional", value: { ...data.additional, languages: e.target.value } } })}
            placeholder="Languages"
            className="border p-2 w-full"
          />
        </div>
        <div className="flex items-center mb-2">
          <input
            type="text"
            name="certifications"
            value={data.additional.certifications}
            onChange={(e) => handleChange({ target: { name: "additional", value: { ...data.additional, certifications: e.target.value } } })}
            placeholder="Certifications"
            className="border p-2 w-full"
          />
        </div>
        <div className="flex items-center mb-2">
          <input
            type="text"
            name="awards"
            value={data.additional.awards}
            onChange={(e) => handleChange({ target: { name: "additional", value: { ...data.additional, awards: e.target.value } } })}
            placeholder="Awards"
            className="border p-2 w-full"
          />
        </div>
      </div>

      {/* Preview Section */}
      <div className="flex-1 bg-white text-black shadow-lg p-8 border rounded-lg font-sans" style={{ width: '8.27in', height: '11.69in', pageBreakAfter: 'always', border: '1px solid #000', padding: '2rem' }}>
        <h1 className="text-3xl font-bold">{data.name}</h1>
        <h2 className="text-lg font-semibold text-gray-600">{data.title}</h2>
        <p className="text-gray-700 mt-2">{data.contact}</p>
        <div className="mt-4 bg-gray-200 p-3 rounded-md">
          <h3 className="font-semibold">SUMMARY</h3>
          <p className="text-gray-700 text-sm">{data.summary}</p>
        </div>
        <div className="mt-4 bg-gray-200 p-3 rounded-md">
          <h3 className="font-semibold">TECHNICAL SKILLS</h3>
          <ul className="text-gray-700 text-sm grid grid-cols-3 gap-1">
            {data.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold bg-gray-200 p-3 rounded-md">PROJECTS</h3>
          {data.projects.map((project, index) => (
            <div key={index} className="mt-2">
              <h4 className="font-semibold">{project.title}</h4>
              <p className="text-gray-600 text-sm">{project.duration}</p>
              <ul className="list-disc list-inside text-gray-700 text-sm">
                {project.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h3 className="font-semibold bg-gray-200 p-3 rounded-md">EDUCATION</h3>
          {data.education.map((edu, index) => (
            <div key={index} className="mt-2">
              <h4 className="font-semibold">{edu.degree}</h4>
              <p className="text-gray-600 text-sm">{edu.institution}, {edu.year}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h3 className="font-semibold bg-gray-200 p-3 rounded-md">ADDITIONAL</h3>
          <p className="text-gray-700 text-sm">Languages: {data.additional.languages}</p>
          <p className="text-gray-700 text-sm">Certifications: {data.additional.certifications}</p>
          <p className="text-gray-700 text-sm">Awards: {data.additional.awards}</p>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplate;
