import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { uploadResume } from "../utils/cloudinary.utils";
import { auth } from "../firebase";

export default function ResumeEditor() {
  const [content, setContent] = useState("");
  const editorRef = useRef(null);

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  const downloadPDF = async() => {
    try {
      const element = document.getElementById("resume-preview");
      const originalStyle = element.getAttribute("style");
  
      element.style.width = "794px";
      element.style.minHeight = "1123px";
      element.style.padding = "40px";
      element.style.backgroundColor = "#ffffff";
      element.style.color = "#2c3e50";
  
      html2canvas(element, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = 210;
        const pageHeight = 297;
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
        element.setAttribute("style", originalStyle || "");
      });


      const user = auth.currentUser;
      const resumeDetail = await  uploadResume(pdf,user.email);
      console.log(resumeDetail,"res")
    } catch (error) {
      console.log(error);
    }
   
  };

  return (
    <div className="container mx-auto p-6 flex flex-col items-center">
    {/* Top Bar */}
    <div className="w-full flex justify-between items-center mb-6">
    
      <h2 className="text-3xl font-bold">Resume Editor</h2>
      <div className="w-16"></div> {/* Placeholder for alignment */}
    </div>

      <div className="border rounded-lg p-6 shadow-md bg-white w-full max-w-3xl">
                <Editor
          apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
          initialValue={`<div style='font-family: Arial, sans-serif; color: #2c3e50; font-size: 14px;'>
  <h1 style='text-align:center; font-size:24px; font-weight:bold; color: #0a3d62;'>Medhavi Rampal</h1>
  <p style='text-align:center;'>
    📞 +91 8882376779 | 📧 medha8183@gmail.com | 🔗 <a href='https://linkedin.com/in/medhavi-rampal' target='_blank'>linkedin.com/in/medhavi-rampal</a> | 💻 <a href='https://github.com/medhavi' target='_blank'>github.com/medhavi</a>
  </p>

  <div style="height: 16px;"></div>

  <div style='margin-bottom: 16px;'>
    <h2 style='background: #0a3d62; color: white; padding: 5px;'>Career Objective</h2>
    <p>Highly motivated and detail-oriented BCA student with a strong foundation in computer science and cybersecurity. Seeking a challenging role to utilize technical skills and contribute to organizational growth.</p>
  </div>

  <div style='margin-bottom: 16px;'>
    <h2 style='background: #0a3d62; color: white; padding: 5px;'>Education</h2>
    <p><strong>Don Bosco Institute of Technology (GGIPU)</strong><br />BCA in Cyber Security (2022 – 2025) | CGPA: 9.12</p>
  </div>

  <div style='margin-bottom: 16px;'>
    <h2 style='background: #0a3d62; color: white; padding: 5px;'>Internship Experience</h2>
    <p><strong>XYZ Tech Solutions</strong> – Web Development Intern (June 2024 – Aug 2024)</p>
    <ul>
      <li>Built responsive websites using React.js and Tailwind CSS.</li>
      <li>Worked with backend APIs and deployed projects using Vercel.</li>
    </ul>
  </div>

  <div style='margin-bottom: 16px;'>
    <h2 style='background: #0a3d62; color: white; padding: 5px;'>Projects</h2>
    <p><strong>Paws and Claws Care - Veterinary Care App</strong></p>
    <ul>
      <li>Technologies: Java, Android Studio, Firebase</li>
      <li>Developed a pet healthcare system with appointment booking features.</li>
    </ul>
  </div>

  <div style='margin-bottom: 16px;'>
    <h2 style='background: #0a3d62; color: white; padding: 5px;'>Certifications</h2>
    <ul>
      <li>Google Cybersecurity Professional Certificate</li>
      <li>React Fundamentals – Coursera</li>
    </ul>
  </div>

  <div style='margin-bottom: 16px;'>
    <h2 style='background: #0a3d62; color: white; padding: 5px;'>Technical Skills</h2>
    <ul>
      <li><strong>Web Development:</strong> HTML, CSS, JavaScript, React</li>
      <li><strong>Mobile App:</strong> Android Studio</li>
      <li><strong>Databases:</strong> MySQL, Firebase, MongoDB</li>
    </ul>
  </div>

  <div style='margin-bottom: 16px;'>
    <h2 style='background: #0a3d62; color: white; padding: 5px;'>Soft Skills</h2>
    <ul>
      <li>Strong communication and teamwork</li>
      <li>Time management and adaptability</li>
    </ul>
  </div>

  <div style='margin-bottom: 16px;'>
    <h2 style='background: #0a3d62; color: white; padding: 5px;'>Achievements</h2>
    <ul>
      <li>Top 5 Finalist in Inter-College Hackathon 2023</li>
      <li>Runner-up in college tech quiz competition</li>
    </ul>
  </div>

  <div style='margin-bottom: 16px;'>
    <h2 style='background: #0a3d62; color: white; padding: 5px;'>Languages</h2>
    <ul>
      <li>English (Fluent)</li>
      <li>Hindi (Native)</li>
    </ul>
  </div>

</div>`}
          init={{
            height: 500,
            menubar: false,
            plugins: ["lists", "wordcount", "link", "preview"],
            toolbar:
              "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright | numlist bullist | link | removeformat",
            content_style: `
              body {
                font-family: Arial, sans-serif;
                font-size: 14px;
                color: #2c3e50;
                line-height: 1.7;
              }
              h2 {
                margin-top: 24px;
                margin-bottom: 10px;
              }
              p, ul {
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
        className="mt-6 px-5 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Download as PDF
      </button>
    </div>
  );
}
