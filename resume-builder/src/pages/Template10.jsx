import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ResumeEditor = () => {
  const defaultFormData = {
    name: "John Doe",
    jobTitle: "Software Engineer",
    summary:
      "Passionate full-stack developer with expertise in React, Node.js, and scalable web applications.",
    experience: [
      {
        id: "1",
        title: "Product Engineer",
        company: "XYZ Company",
        duration: "2022 - Present",
        responsibilities: [
          "Developed scalable web applications using React and Node.js.",
          "Led a team of developers to improve product efficiency.",
          "Implemented CI/CD pipelines for automated deployment.",
        ],
      },
      {
        id: "2",
        title: "Frontend Developer",
        company: "ABC Tech",
        duration: "2019 - 2022",
        responsibilities: [
          "Designed interactive UI components using React.js.",
          "Optimized website performance for better user experience.",
          "Collaborated with backend developers to integrate APIs.",
        ],
      },
    ],
    skills: ["React.js", "Node.js", "Redux", "Tailwind CSS", "MongoDB", "Git"],
    education: "B.Sc. in Computer Science, XYZ University, 2018",
  };

  const [formData, setFormData] = useState(defaultFormData);

  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleExperienceChange = (index, key, value) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[index][key] = value;
    setFormData({ ...formData, experience: updatedExperience });
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16).text(formData.name, 20, 20);
    doc.setFontSize(14).text(formData.jobTitle, 20, 30);
    doc.setFontSize(12).text("Summary:", 20, 45);
    doc.text(formData.summary, 20, 55, { maxWidth: 170 });
    doc.setFontSize(12).text("Experience:", 20, 80);
    let y = 90;
    formData.experience.forEach((exp) => {
      doc.text(`${exp.title} - ${exp.company} (${exp.duration})`, 20, y);
      y += 10;
    });
    doc.save("Resume.pdf");
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(formData.experience);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setFormData({ ...formData, experience: items });
  };

  return (
    <div className="flex gap-6 p-6 max-w-6xl mx-auto">
      <div className="w-1/2 p-6 border rounded-lg bg-white text-black shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Resume Editor</h2>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange(e, "name")}
          className="border p-2 w-full text-xl font-semibold"
        />
        <input
          type="text"
          value={formData.jobTitle}
          onChange={(e) => handleInputChange(e, "jobTitle")}
          className="border p-2 w-full text-lg text-gray-700 mt-2"
        />
        <textarea
          value={formData.summary}
          onChange={(e) => handleInputChange(e, "summary")}
          className="border p-2 w-full mt-4"
        />

        <h3 className="text-lg font-semibold mt-4">Experience</h3>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="experience">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {formData.experience.map((exp, index) => (
                  <Draggable key={exp.id} draggableId={exp.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="border p-4 my-2 bg-gray-100 rounded-lg shadow-sm"
                      >
                        <input
                          type="text"
                          value={exp.title}
                          onChange={(e) => handleExperienceChange(index, "title", e.target.value)}
                          className="border p-2 w-full"
                        />
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                          className="border p-2 w-full mt-2"
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <h3 className="text-lg font-semibold mt-4">Skills</h3>
        <textarea
          value={formData.skills.join(", ")}
          onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(", ") })}
          className="border p-2 w-full bg-gray-100 rounded-lg"
        />

        <h3 className="text-lg font-semibold mt-4">Education</h3>
        <textarea
          value={formData.education}
          onChange={(e) => handleInputChange(e, "education")}
          className="border p-2 w-full bg-gray-100 rounded-lg"
        />
      </div>

      <div className="w-1/2 p-6 border rounded-lg bg-white text-black shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Resume Preview</h2>
        <p className="text-xl font-semibold">{formData.name}</p>
        <p className="text-lg text-gray-700">{formData.jobTitle}</p>
        <p className="mt-4">{formData.summary}</p>
        <h3 className="text-lg font-semibold mt-4">Experience</h3>
        {formData.experience.map((exp, index) => (
          <p key={index} className="mt-2">
            {exp.title} - {exp.company} ({exp.duration})
          </p>
        ))}
        <button onClick={handleDownloadPDF} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md">
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default ResumeEditor;
