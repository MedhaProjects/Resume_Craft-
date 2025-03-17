import { useState } from "react";

export default function ResumeTemplateOne() {
  const [resume, setResume] = useState({
    name: "John Doe",
    title: "Software Engineer",
    summary: "Passionate developer with 5+ years of experience.",
    experience: [
      { company: "Tech Corp", role: "Frontend Developer", duration: "2020 - Present" },
      { company: "Web Solutions", role: "Junior Developer", duration: "2018 - 2020" }
    ],
    education: "B.S. in Computer Science, XYZ University",
    skills: ["React", "JavaScript", "CSS", "Node.js"]
  });

  const handleChange = (field, value) => {
    setResume({ ...resume, [field]: value });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <input 
        className="text-2xl font-bold w-full border-b-2" 
        value={resume.name} 
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <input 
        className="text-lg text-gray-600 w-full border-b" 
        value={resume.title} 
        onChange={(e) => handleChange("title", e.target.value)}
      />
      <textarea 
        className="w-full mt-4 border p-2" 
        value={resume.summary} 
        onChange={(e) => handleChange("summary", e.target.value)}
      />
      <h2 className="mt-4 text-xl font-semibold">Experience</h2>
      {resume.experience.map((exp, index) => (
        <div key={index} className="mt-2 border-b pb-2">
          <input 
            className="font-semibold w-full" 
            value={exp.company} 
            onChange={(e) => {
              let newExp = [...resume.experience];
              newExp[index].company = e.target.value;
              setResume({ ...resume, experience: newExp });
            }}
          />
          <input 
            className="text-gray-600 w-full" 
            value={exp.role} 
            onChange={(e) => {
              let newExp = [...resume.experience];
              newExp[index].role = e.target.value;
              setResume({ ...resume, experience: newExp });
            }}
          />
          <input 
            className="text-gray-500 w-full" 
            value={exp.duration} 
            onChange={(e) => {
              let newExp = [...resume.experience];
              newExp[index].duration = e.target.value;
              setResume({ ...resume, experience: newExp });
            }}
          />
        </div>
      ))}
      <h2 className="mt-4 text-xl font-semibold">Education</h2>
      <input 
        className="w-full border-b" 
        value={resume.education} 
        onChange={(e) => handleChange("education", e.target.value)}
      />
      <h2 className="mt-4 text-xl font-semibold">Skills</h2>
      <input 
        className="w-full border-b" 
        value={resume.skills.join(", ")} 
        onChange={(e) => handleChange("skills", e.target.value.split(", "))}
      />
    </div>
  );
}
