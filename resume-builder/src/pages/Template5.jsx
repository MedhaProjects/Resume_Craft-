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

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      const pdf = new jsPDF("p", "mm", "a4");
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("resume.pdf");
    });
  };

  return (
    <div className="container mx-auto p-6 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Resume Editor</h2>
        <div className="w-16"></div>
      </div>

      <div className="border rounded-lg p-6 shadow-md bg-white w-full max-w-3xl">
        <Editor
          apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
          initialValue={`<h1 style='text-align:center; font-size:24px; font-weight:bold; margin-bottom:10px;'>Medhavi Rampal</h1>
<p style='text-align:center; font-size:14px; margin-bottom:5px;'>Phone: +91 8882376779 | Email: medha8183@gmail.com</p>
<p style='text-align:center; font-size:14px; margin-bottom:10px;'>LinkedIn: linkedin.com/in/medhavi-rampal | GitHub: github.com/medhavi</p>

<h2 style='font-size:18px; font-weight:bold; margin-bottom:10px; border-bottom:2px solid #000; padding-bottom:5px;'>PROFESSIONAL SUMMARY</h2>
<p style='margin-bottom:15px;'>Results-driven Full Stack Developer with 4+ years of experience in designing, developing, and deploying scalable web and mobile applications. Proficient in React, Node.js, Firebase, and Android Studio.</p>

<h2 style='font-size:18px; font-weight:bold; margin-bottom:10px; border-bottom:2px solid #000; padding-bottom:5px;'>WORK EXPERIENCE</h2>
<h3 style='font-size:16px; font-weight:bold; margin-bottom:5px;'>Senior Software Developer – ABC Tech Solutions</h3>
<p style='margin-bottom:5px;'>July 2021 – Present | New Delhi, India</p>
<ul style='margin-bottom:15px; list-style-type: disc; padding-left: 20px;'>
  <li>Led a team of 5 developers to deliver a scalable appointment booking system used by over 50,000 users.</li>
  <li>Architected backend APIs using Node.js and Express, reducing response times by 40%.</li>
</ul>

<h3 style='font-size:16px; font-weight:bold; margin-bottom:5px;'>Software Developer – XYZ Solutions</h3>
<p style='margin-bottom:5px;'>Jan 2019 – June 2021 | Gurgaon, India</p>
<ul style='margin-bottom:15px; list-style-type: disc; padding-left: 20px;'>
  <li>Developed RESTful APIs and admin dashboards for fintech applications using MERN stack.</li>
  <li>Worked closely with QA teams to automate unit and integration tests using Jest and Cypress.</li>
</ul>

<h2 style='font-size:18px; font-weight:bold; margin-bottom:10px; border-bottom:2px solid #000; padding-bottom:5px;'>PROJECTS</h2>
<h3 style='font-size:16px; font-weight:bold; margin-bottom:5px;'>AppointLix – Appointment Booking System</h3>
<p style='margin-bottom:5px;'>Technologies: React, Node.js, MongoDB, Cloudinary</p>
<ul style='margin-bottom:15px; list-style-type: disc; padding-left: 20px;'>
  <li>Developed a secure, scalable appointment system with role-based access for doctors and patients.</li>
</ul>

<h2 style='font-size:18px; font-weight:bold; margin-bottom:10px; border-bottom:2px solid #000; padding-bottom:5px;'>TECHNICAL SKILLS</h2>
<ul style='margin-bottom:15px; list-style-type: disc; padding-left: 20px;'>
  <li><strong>Languages:</strong> JavaScript, TypeScript, Java, C++, Python</li>
  <li><strong>Frameworks:</strong> React, Node.js, Express, Spring Boot</li>
  <li><strong>Database:</strong> MongoDB, PostgreSQL, MySQL, Firebase</li>
</ul>



<h2 style='font-size:18px; font-weight:bold; margin-bottom:10px; border-bottom:2px solid #000; padding-bottom:5px;'>EDUCATION</h2>
<h3 style='font-size:16px; font-weight:bold; margin-bottom:5px;'>Bachelor of Computer Applications</h3>
<p style='margin-bottom:15px;'>Guru Gobind Singh Indraprastha University, 2022 | CGPA: 9.12</p>`}
          init={{
            height: 400,
            menubar: true,
            plugins: ["lists", "wordcount", "link", "code", "preview"],
            toolbar:
              "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright | numlist bullist | link | removeformat",
          }}
          onEditorChange={handleEditorChange}
          ref={editorRef}
        />
      </div>

      <div
        id="resume-preview"
        className="mt-6 p-8 bg-white text-black shadow-xl border w-[210mm] min-h-[297mm] overflow-hidden rounded-lg"
        style={{
          fontFamily: "Arial, sans-serif",
          lineHeight: "1.7",
          color: "#2c3e50",
          padding: "20px",
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>

      <button
        onClick={downloadPDF}
        className="mt-6 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Download as PDF
      </button>
    </div>
  );
}
