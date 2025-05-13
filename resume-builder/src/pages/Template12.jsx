import { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";

// 🔽 Initial Template 6 Content Based on Image
const initialTemplate6Content = `
<h1 style="font-size: 28px; font-weight: bold; text-transform: uppercase;">THOMAS BEASLEY</h1>
<p style="margin: 4px 0;"><strong>Phone:</strong> (555) 123-4567 &nbsp;|&nbsp; <strong>Address:</strong> 3665 McLaughlin Street, Seattle, WA 98293 &nbsp;|&nbsp; <strong>Email:</strong> your-name@email.com</p>

<h2 style="background-color: #8B0000; color: white; padding: 4px; font-size: 16px; margin-top: 20px;">SUMMARY</h2>
<p>Passionate Technology Assistant skilled at troubleshooting and repairing digital devices. Excellent people skills from managing the tech support desk at Seattle Community Center. Looking to secure an entry-level position in retail where I can utilize my strong customer service skills and technical knowledge to enhance the customer experience and contribute positively to the team at [Company Name].</p>

<h2 style="background-color: #8B0000; color: white; padding: 4px; font-size: 16px; margin-top: 20px;">EDUCATION</h2>
<p><strong>Bachelor’s Degree in Business Administration</strong><br>
May 20XX | Spokane University | Spokane, WA<br>
GPA: 3.7/4.0</p>
<p><strong>Relevant Coursework:</strong> Implementation of Contemporary Business Practices<br>
<strong>Dissertation Title:</strong> Federal & State Business Law & Regulations, Introduction to HR Theory & Practices, Company Diversity and Inclusion, Introduction to Employer Contract Law</p>

<h2 style="background-color: #8B0000; color: white; padding: 4px; font-size: 16px; margin-top: 20px;">EXPERIENCE</h2>
<p><strong>Volunteer Technology Assistant</strong><br>
May 20XX | Seattle Community Center | Seattle, WA</p>
<ul style="margin-left: 20px;">
  <li>Set up and repair technology devices for community members</li>
  <li>Manage service queues, ensuring community members receive timely updates on service status</li>
  <li>Engage with diverse clients to understand technology issues</li>
  <li>Document detailed notes and estimate completion times</li>
  <li>Collaborate closely with team members to maintain workflow and enhance service delivery</li>
</ul>

<h2 style="background-color: #8B0000; color: white; padding: 4px; font-size: 16px; margin-top: 20px;">KEY SKILLS</h2>
<ul style="columns: 2; margin-left: 20px;">
  <li>Customer service</li>
  <li>Team collaboration</li>
  <li>Troubleshooting</li>
  <li>Multitasking</li>
  <li>Organizing and scheduling</li>
  <li>Time management</li>

</ul>

<h2 style="background-color: #8B0000; color: white; padding: 4px; font-size: 16px; margin-top: 20px;">HOBBIES & INTERESTS</h2>
<ul style="margin-left: 20px;">
  <li><strong>Coding:</strong> Recently completed a Python bootcamp</li>
  <li><strong>Digital art:</strong> Create unique illustrations using Adobe Fresco</li>
  <li><strong>Soccer:</strong> Play for a local team</li>
</ul>
`;

export default function ResumeEditor() {
  const [content, setContent] = useState("");
  const editorRef = useRef(null);
  const [templateNumber] = useState("6");

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  const downloadPDF = async () => {
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

    await storeResume(templateNumber, content);
  };

  useEffect(() => {
    (async function () {
      try {
        const content = await getResume(templateNumber);
        if (!content) {
          setContent(initialTemplate6Content);
        } else {
          setContent(content);
        }
      } catch (error) {
        setContent(initialTemplate6Content);
        console.log(error);
      }
    })();
  }, []);

  const saveResumeContent = async () => {
    try {
      await storeResume(templateNumber, content);
      toast.success("Resume is saved");
    } catch (error) {
      toast.error("Something went wrong, please try again");
      console.log(error);
    }
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
        <div className="flex justify-between items-center mb-3">
          <button
            onClick={downloadPDF}
            className="px-5 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Download as PDF
          </button>
          <button
            onClick={saveResumeContent}
            className="w-[120px] h-[40px] bg-[#071a41] hover:bg-[#2b3955] text-white font-semibold rounded-4xl cursor-pointer"
          >
            Save
          </button>
        </div>

        <Editor
          apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
          value={content}
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
