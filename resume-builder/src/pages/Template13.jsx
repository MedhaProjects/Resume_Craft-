import { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";

// 🔽 Initial Template 7 Content Based on Image
const initialTemplate7Content = `
<div style="font-family: 'Georgia', serif; color: #2c3e50; background-color: #f9f9f9; padding: 40px;">
  <h1 style="font-size: 32px; font-weight: bold; letter-spacing: 2px; margin-bottom: 0;">Elvis</h1>
  <p style="font-size: 14px; margin-top: 4px; margin-bottom: 20px; letter-spacing: 1px;">📞 +91 8882376779 | 📧 elvis8183@gmail.com|🔗 linkedin.com/in/elvis |  💻 github.com/elvis</p>

  <table style="width: 100%; font-size: 14px;">
    <tr>
      <!-- Left Column -->
      <td style="width: 33%; vertical-align: top; padding-right: 20px;">
        <div style="margin-bottom: 30px;">
          <h3 style="background-color: #e8e8e8; padding: 6px 10px;">CONTACT</h3>
          <p>6967 Main Street<br>Brooklyn, New York 48127<br>718.555.0100<br>alta@example.com<br>www.interestingsite.com</p>
        </div>
        <hr />

        <div style="margin-bottom: 30px;">
          <h3 style="background-color: #e8e8e8; padding: 6px 10px;">EDUCATION</h3>
          <p><strong>Juris Doctor</strong> • June 20XX<br>Jasper University, Manhattan, NYC<br>Real Estate Clinic<br>1st place in Moot Court</p>
          <br>
          <p><strong>BA in Political Science</strong> • June 20XX<br>Moultrie Fones College, Small Town, Massachusetts</p>
        </div>
        <hr />

        <div style="margin-bottom: 30px;">
          <h3 style="background-color: #e8e8e8; padding: 6px 10px;">KEY SKILLS</h3>
          <ul style="margin-top: 8px; padding-left: 20px;">
            <li>Data analysis</li>
            <li>Organization</li>
            <li>Critical thinking</li>
          </ul>
        </div>
        <hr />

        <div style="margin-bottom: 30px;">
          <h3 style="background-color: #e8e8e8; padding: 6px 10px;">INTERESTS</h3>
          <ul style="margin-top: 8px; padding-left: 20px;">
            <li>Literature</li>
            <li>Environmental conservation</li>
            <li>Volunteerism</li>
          </ul>
        </div>
      </td>

      <!-- Right Column -->
      <td style="width: 67%; vertical-align: top; padding-left: 20px;">
        <div style="margin-bottom: 30px;">
          <h3 style="background-color: #e8e8e8; padding: 6px 10px;">PROFILE</h3>
          <p>Analytical, energetic, and detail-oriented attorney with broad and deep experience in business and real estate matters, including business formation, real estate transactions, distressed property, due diligence, permitting, contract and lease negotiations, and landlord/tenant.</p>
        </div>
        <hr />

        <div style="margin-bottom: 30px;">
          <h3 style="background-color: #e8e8e8; padding: 6px 10px;">EXPERIENCE</h3>

          <p><strong>In-House Counsel • March 20XX–Present</strong><br>Bandor Real Estate • NYC, New York</p>
          <ul style="margin-left: 20px; margin-top: 5px;">
            <li>Draft, negotiate, and enforce lease and purchase agreements</li>
            <li>Manage contracts for residential/commercial properties</li>
            <li>Coordinate due diligence, financing, insurance, and closing</li>
            <li>Handle landlord/tenant legal issues and disputes</li>
            <li>Conduct use/zoning law research</li>
            <li>Work with city officials on land acquisition and permitting</li>
          </ul>
          <br>

          <p><strong>Associate Attorney • Feb 20XX–Nov 20XX</strong><br>Luca Littles Law Firm • NYC, New York</p>
          <ul style="margin-left: 20px; margin-top: 5px;">
            <li>Represented clients in business, real estate, and legal matters</li>
            <li>Assisted in litigation and dispute resolution</li>
            <li>Handled casework and business dissolutions</li>
          </ul>
          <br>

          <p><strong>Junior Associate Attorney • Sept 20XX–Jan 20XX</strong><br>Law Offices of Keith Aoki • NYC, New York</p>
          <ul style="margin-left: 20px; margin-top: 5px;">
            <li>Conducted legal research and drafted memoranda</li>
            <li>Assisted in motion practice and brief writing</li>
            <li>Supported senior attorneys during litigation</li>
          </ul>
        </div>
      </td>
    </tr>
  </table>
</div>

`;

export default function ResumeEditor() {
  const [content, setContent] = useState("");
  const editorRef = useRef(null);
  const [templateNumber] = useState("7");

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
          setContent(initialTemplate7Content);
        } else {
          setContent(content);
        }
      } catch (error) {
        setContent(initialTemplate7Content);
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
