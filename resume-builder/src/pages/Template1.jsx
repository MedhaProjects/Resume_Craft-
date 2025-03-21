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
      const doc = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      doc.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      doc.save("resume.pdf");
    });
  };

  return (
    <div className="container mx-auto p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6">Resume Editor</h2>
      <div className="border rounded-lg p-6 shadow-md bg-white w-full max-w-3xl">
        <Editor
          apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
          initialValue={`<h1 style='text-align:center; font-size:24px; color:#2c3e50;'>ESTELLE DARCY</h1>
            <h3 style='text-align:center; font-size:18px; color:#34495e;'>PROCESS ENGINEER</h3>
            <p style='text-align:center; font-size:14px;'>123 Anywhere St., Any City | hello@reallygreatsite.com | www.reallygreatsite.com</p>
            <hr>
            <h2 style='color:#2980b9;'>SUMMARY</h2>
            <p>Results-driven Process Engineer with 5+ years of experience in process design and automation...</p>
            <h2 style='color:#2980b9;'>PROFESSIONAL EXPERIENCE</h2>
            <h3>Instrument Tech, Morcelle Program | Jan 2024 - Present</h3>
            <ul>
              <li>Developed automation systems, improving efficiency by 30%...</li>
              <li>Led cost-saving initiatives, reducing expenses by $500K...</li>
            </ul>`}
          init={{
            height: 400,
            menubar: true,
            plugins: [
              "lists", "table", "wordcount", "advlist", "autolink", "link", "charmap", "print", "preview", "anchor", "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media", "paste", "help", "wordcount"
            ],
            toolbar:
              "undo redo | formatselect | bold italic underline | forecolor backcolor | alignleft aligncenter alignright | numlist bullist | table | link | removeformat",
          }}
          onEditorChange={handleEditorChange}
          ref={editorRef}
        />
      </div>
      
      <div
        id="resume-preview"
        className="mt-6 p-8 bg-white text-black shadow-xl border w-[210mm] h-[297mm] overflow-hidden rounded-lg"
        style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.5", color: "#2c3e50" }}
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
