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
      {/* Top Bar */}
      <div className="w-full flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Resume Editor</h2>
        <div className="w-16"></div>
      </div>

      {/* Resume Editor */}
      <div className="border rounded-lg p-6 shadow-md bg-white w-full max-w-3xl">
        <Editor
          apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
          initialValue={`<h1 style='text-align:center; font-size:22px; font-weight:bold; margin-bottom:10px;'>Medhavi Rampal</h1>
<p style='text-align:center; font-size:14px; margin-bottom:5px;'>Phone: +91 8882376779 | Email: medha8183@gmail.com</p>
<p style='text-align:center; font-size:14px; margin-bottom:10px;'>LinkedIn: linkedin.com/in/medhavi-rampal | GitHub: github.com/medhavi</p>

<h2 style='margin-bottom:10px; border-bottom: 2px solid #000; padding-bottom: 5px; font-weight:bold;'>EDUCATION</h2>
<h3 style='margin-bottom:5px; font-weight:bold;'>Don Bosco Institute of Technology (Guru Gobind Singh Indraprastha University)</h3>
<p style='margin-bottom:10px;'>Bachelor of Computer Application (Cyber Security), Aug 2022 - July 2025 | CGPA: 9.12</p>
<h3 style='margin-bottom:5px; font-weight:bold;'>Bal Mandir Public School</h3>
<p style='margin-bottom:15px;'>Class 12th: 89% (2022) | Class 10th: 81% (2019)</p>

<h2 style='margin-bottom:10px; border-bottom: 2px solid #000; padding-bottom: 5px; font-weight:bold;'>PROJECTS</h2>
<h3 style='margin-bottom:5px; font-weight:bold;'>Paws and Claws Care - Veterinary Care System</h3>
<p style='margin-bottom:5px;'>Technologies: Java, Android Studio, Firebase</p>
<ul style='margin-bottom:15px; list-style-type: disc; padding-left: 20px;'>
  <li>Developed an application for veterinary clinics and appointment booking.</li>
  <li>Implemented Firebase for real-time data storage and authentication.</li>
  <li>Secured pet data with authentication and authorization mechanisms.</li>
</ul>
<h3 style='margin-bottom:5px; font-weight:bold;'>AppointLix - Appointment Booking System</h3>
<p style='margin-bottom:5px;'>Technologies: React, JavaScript, Node.js, MongoDB</p>
<ul style='margin-bottom:15px; list-style-type: disc; padding-left: 20px;'>
  <li>Built an appointment scheduling platform for doctors and patients.</li>
  <li>Developed user-friendly panels for admins, doctors, and patients.</li>
  <li>Integrated Cloudinary for efficient media management.</li>
</ul>

<h2 style='margin-bottom:10px; border-bottom: 2px solid #000; padding-bottom: 5px; font-weight:bold;'>TECHNICAL SKILLS</h2>
<ul style='margin-bottom:15px; list-style-type: disc; padding-left: 20px;'>
  <li><strong>Programming Languages:</strong> C, C++, Java</li>
  <li><strong>Web Development:</strong> HTML, CSS, JavaScript, React</li>
  <li><strong>Android Development:</strong> Android Studio</li>
  <li><strong>Database:</strong> MySQL, Firebase, MongoDB</li>
  <li><strong>Tools & Platforms:</strong> GitHub, Vercel, Canva</li>
</ul>

<h2 style='margin-bottom:10px; border-bottom: 2px solid #000; padding-bottom: 5px; font-weight:bold;'>ACHIEVEMENTS</h2>
<ul style='margin-bottom:15px; list-style-type: disc; padding-left: 20px;'>
  <li>2nd Place in College Debate Competition at 'ITरANG'.</li>
  <li>Ranked in Top 10 Students in College and under 150 University-wide.</li>
  <li>Published articles in the college newsletter on campus events.</li>
  <li>Head Coordinator for Christmas Carnival and Event Coordinator at IT Fest.</li>
</ul>`}
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

      {/* Resume Preview */}
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

      {/* Download Button */}
      <button
        onClick={downloadPDF}
        className="mt-6 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Download as PDF
      </button>
    </div>
  );
}
