import { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";

// ✅ Initial Template 8 Content Based on Uploaded Image
const initialTemplate8Content = `
<div style="font-family: 'Georgia', serif; color: #2c3e50; background-color: #f9f9f9; padding: 40px;">
  <h1 style="font-size: 32px; font-weight: bold; letter-spacing: 1px; margin-bottom: 0;">Elvis Raj [Professional]</h1>
  <p style="font-size: 14px; margin-top: 4px; margin-bottom: 20px;">Bangalore, India | <a href="#">LinkedIn</a> | +91 88823 76779 | elvis.raj@email.com</p>

  <table style="width: 100%; font-size: 14px;">
    <tr>
      <td style="width: 100%; vertical-align: top;">
        <div style="margin-bottom: 30px;">
          <h3 style="background-color: #e8e8e8; padding: 6px 10px;">WORK EXPERIENCE</h3>

          <p><strong>Unacademy</strong> – Bangalore, India<br><em>Marketing Intern</em> • September 2022–Present</p>
          <ul>
            <li>Analyzed social media growth using Sprout Social and Excel for campaign performance</li>
            <li>Increased LinkedIn followers by 120% and improved engagement by 45%</li>
          </ul>

          <p><strong>Tata Consultancy Services</strong> – Mumbai, India<br><em>Business Analyst Intern</em> • January 2021–June 2022</p>
          <ul>
            <li>Created automated dashboards and reports for multiple stakeholders using Power BI</li>
            <li>Improved data processing time by 60%, enabling faster decision-making</li>
          </ul>

          <p><strong>Reliance Retail</strong> – Chennai, India<br><em>Sales Associate</em> • April 2019–December 2020</p>
          <ul>
            <li>Improved store sales by 18% through customer engagement and upselling</li>
            <li>Executed promotional displays which led to a 22% increase in footfall</li>
          </ul>
        </div>

        <hr />

        <div style="margin-bottom: 30px;">
          <h3 style="background-color: #e8e8e8; padding: 6px 10px;">LEADERSHIP EXPERIENCE</h3>

          <p><strong>National Entrepreneurship Network (NEN)</strong> – Pune, India<br><em>Chapter President</em> • August 2021–Present</p>
          <ul>
            <li>Organized 15+ events on resume writing, interview prep, and startup mentoring</li>
            <li>Collaborated with startups and corporates like Zomato, Zoho & Deloitte India</li>
          </ul>

          <p><strong>Feeding India by Zomato</strong> – Hyderabad, India<br><em>Volunteer Leader</em> • March 2020–January 2021</p>
          <ul>
            <li>Distributed over 8000 meals weekly to underserved communities</li>
            <li>Led a team of 12 volunteers, increasing donations by 30%</li>
          </ul>
        </div>

        <hr />

        <div style="margin-bottom: 30px;">
          <h3 style="background-color: #e8e8e8; padding: 6px 10px;">EDUCATION</h3>

          <p><strong>Christ University</strong> – Bangalore, India<br>BBA in Marketing & Analytics (GPA: 9.2/10) • Graduation Date: June 2023</p>
          <ul>
            <li>Dean’s List, Merit Scholarship Recipient, Google India Marketing Challenge Winner</li>
          </ul>
        </div>

        <hr />

        <div style="margin-bottom: 30px;">
          <h3 style="background-color: #e8e8e8; padding: 6px 10px;">SKILLS & INTERESTS</h3>
          <p><strong>Skills:</strong> MS Office, Power BI, Sprout Social, Salesforce, HubSpot, Zoho CRM, SQL</p>
          <p><strong>Interests:</strong> Marketing Strategy, Data Analytics, Public Speaking, Cricket, Stand-up Comedy</p>
        </div>
      </td>
    </tr>
  </table>
</div>


`;

export default function ResumeEditor() {
  const [content, setContent] = useState("");
  const editorRef = useRef(null);
  const [templateNumber] = useState("8");

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  const downloadPDF = async () => {
    const element = document.getElementById("resume-preview");
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
    });

    await storeResume(templateNumber, content);
  };

  useEffect(() => {
    (async function () {
      try {
        const content = await getResume(templateNumber);
        if (!content) {
          setContent(initialTemplate8Content);
        } else {
          setContent(content);
        }
      } catch (error) {
        setContent(initialTemplate8Content);
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
      <div className="w-full flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Resume Editor</h2>
        <div className="w-16"></div>
      </div>

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

      <button
        onClick={downloadPDF}
        className="mt-6 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Download as PDF
      </button>
    </div>
  );
}
