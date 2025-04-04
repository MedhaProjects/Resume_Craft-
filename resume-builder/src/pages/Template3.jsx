import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ResumeEditor() {
  const [content, setContent] = useState("");
  const editorRef = useRef(null);

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  const downloadPDF = () => {
    const element = document.getElementById("resume-preview");
    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("resume.pdf");
    });
  };

  return (
    <div className="container mx-auto p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mb-4 text-indigo-800">Resume Editor</h1>

      <div className="border rounded-lg p-6 shadow-lg bg-white w-full max-w-3xl">
        <Editor
          apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
          initialValue={`<div style='font-family: Arial, sans-serif; color: #2c3e50; font-size: 14px;'>
  <h1 style='text-align:center; font-size:26px; font-weight:bold; color: #4b0082;'>JOHN DOE</h1>
  <p style='text-align:center;'>123, Model Town, Delhi | +91-9999999999 | john.doe@email.com | linkedin.com/in/johndoe</p>
  <hr style='border-top: 2px solid #4b0082; margin: 16px 0;' />

  <h2 style='color: #4b0082;'>OBJECTIVE</h2>
  <p>Self-motivated and detail-oriented Computer Applications graduate, seeking to launch a professional career in software development. Passionate about front-end technologies, problem-solving, and continuously enhancing technical skills to deliver impactful digital solutions.</p>
  <br/><hr />

  <h2 style='color: #4b0082;'>EDUCATION</h2>
  <strong>Bachelor of Computer Applications (BCA)</strong>
  <p>Mata Sundri College, Delhi University | 2022 – 2025 | CGPA: 8.7</p>
  <ul>
    <li><strong>Key Subjects:</strong> Data Structures, Operating Systems, Web Development, Software Engineering</li>
    <li><strong>Academic Projects:</strong> Attendance Management System, Portfolio Website</li>
  </ul>
  <br/><hr />

  <h2 style='color: #4b0082;'>INTERNSHIPS</h2>
  <strong>Frontend Developer Intern – ABC Tech Solutions</strong><span style='float:right;'>Jan 2024 – Mar 2024</span>
  <ul>
    <li>Collaborated on building responsive web interfaces using React and Tailwind CSS.</li>
    <li>Worked with RESTful APIs and state management using Redux Toolkit.</li>
  </ul>
  <br/><hr />

  <h2 style='color: #4b0082;'>PROJECTS</h2>
  <strong>Resume Builder App</strong><br/>
  <ul>
    <li>Built a dynamic resume builder using React.js, TinyMCE, and jsPDF.</li>
    <li>Integrated HTML-to-PDF functionality and ensured ATS-friendly structure.</li>
  </ul>

  <strong>Personal Portfolio</strong><br/>
  <ul>
    <li>Designed a mobile-responsive personal website to showcase my skills and projects.</li>
    <li>Deployed on GitHub Pages and optimized for performance and SEO.</li>
  </ul>
  <br/><hr />

  <h2 style='color: #4b0082;'>TECHNICAL SKILLS</h2>
  <ul>
    <li><strong>Languages:</strong> C, C++, JavaScript, Python</li>
    <li><strong>Frontend:</strong> HTML, CSS, Bootstrap, React.js, Tailwind</li>
    <li><strong>Backend:</strong> Node.js (Basics), Express.js</li>
    <li><strong>Databases:</strong> MySQL, Firebase, MongoDB (Basics)</li>
    <li><strong>Tools:</strong> Git, GitHub, VS Code, Postman</li>
  </ul>
  <br/><hr />

  <h2 style='color: #4b0082;'>CERTIFICATIONS</h2>
  <ul>
    <li>Full-Stack Web Development with React – Coursera</li>
    <li>JavaScript Essentials – HackerRank</li>
    <li>Firebase for Web Developers – Google Developers</li>
  </ul>
  <br/><hr />

  <h2 style='color: #4b0082;'>ACHIEVEMENTS</h2>
  <ul>
    <li>Top 5 in University Hackathon 2023 (Built a Smart Scheduler App)</li>
    <li>Received “Star Intern” recognition at ABC Tech Solutions</li>
  </ul>
</div>`}
          init={{
            height: 500,
            menubar: false,
            plugins: ["lists", "wordcount", "link"],
            toolbar:
              "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright | numlist bullist | link",
            content_style: `
              body {
                font-family: Arial, sans-serif;
                font-size: 14px;
                color: #2c3e50;
              }
              h2 {
                font-size: 18px;
                color: #4b0082;
                margin-top: 24px;
                font-weight: bold;
              }
              ul {
                margin-bottom: 16px;
              }
            `,
          }}
          onEditorChange={handleEditorChange}
          ref={editorRef}
        />
      </div>

      <div
        id="resume-preview"
        className="mt-6 bg-white text-black shadow-xl border w-[794px] min-h-[1123px] p-[40px] rounded-lg"
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "14px",
          lineHeight: "1.7",
          color: "#2c3e50",
          backgroundColor: "#ffffff",
          overflow: "hidden",
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>

      <button
        onClick={downloadPDF}
        className="mt-6 px-5 py-3 bg-indigo-800 text-white rounded-lg hover:bg-indigo-600 transition"
      >
        Download as PDF
      </button>
    </div>
  );
}
