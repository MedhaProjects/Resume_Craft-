import { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { getResume, storeResume } from "../utils/utils";
import { initialTemplate3Content } from "../utils/templateContent";
import toast from "react-hot-toast";

export default function ResumeEditor() {
  const [content, setContent] = useState("");
  const editorRef = useRef(null);
  const [templateNumber] = useState("3");

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  const downloadPDF = async () => {
    const element = document.getElementById("resume-preview");
    const canvas = await html2canvas(element, { scale: 2 });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgProps = {
      width: canvas.width,
      height: canvas.height,
    };

    const imgRatio = imgProps.width / imgProps.height;
    const pageRatio = pdfWidth / pdfHeight;

    let imgWidth = pdfWidth;
    let imgHeight = pdfWidth / imgRatio;

    if (imgRatio < pageRatio) {
      imgHeight = pdfHeight;
      imgWidth = pdfHeight * imgRatio;
    }

    const x = (pdfWidth - imgWidth) / 2;
    const y = (pdfHeight - imgHeight) / 2;

    pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
    pdf.save("resume.pdf");

    await storeResume(templateNumber, content);
  };

  useEffect(() => {
    (async function () {
      try {
        const content = await getResume(templateNumber);
        if (!content) {
          setContent(initialTemplate3Content);
        } else {
          setContent(content);
        }
      } catch (error) {
        setContent(initialTemplate3Content);
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
    <div className="container mx-auto p-6 flex flex-col items-center bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-slate-900">Resume Editor</h1>

      <div className="border rounded-xl p-6 shadow-xl bg-white w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={downloadPDF}
            className="px-5 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Download as PDF
          </button>
          <button
            onClick={saveResumeContent}
            className="px-5 py-3 bg-green-700 text-white rounded-lg hover:bg-green-600 transition"
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
            plugins: ["lists", "link", "preview"],
            toolbar:
              "undo redo | styleselect | bold italic underline | alignleft aligncenter alignright | bullist numlist | link",
            content_style: `
              body {
                font-family: 'Arial', sans-serif;
                font-size: 14px;
                color: #2e3a59;
                line-height: 1.6;
              }
              h1, h2, h3, h4, h5, h6 {
                color: #1e3a8a; /* Navy blue headings */
                margin-bottom: 8px;
              }
              ul {
                padding-left: 18px;
              }
            `,
          }}
          onEditorChange={handleEditorChange}
          ref={editorRef}
        />
      </div>

      {/* A4-Size Preview */}
      <div
        id="resume-preview"
        className="mt-8 bg-white text-black shadow-xl border w-[794px] h-[1123px] p-[40px] rounded-lg overflow-hidden"
        style={{
          fontFamily: "'Arial', sans-serif",
          fontSize: "14px",
          lineHeight: "1.6",
          color: "#1e3a8a", // Change content text color to navy blue here
          backgroundColor: "#fff",
        }}
      >
        {/* Force heading color in preview */}
        <style>
          {`
            h1, h2, h3, h4, h5, h6 {
              color: #1e3a8a; /* Navy blue headings */
              margin-bottom: 8px;
            }
            p, ul, li {
              color: #1e3a8a; /* Change content text color to navy blue */
            }
          `}
        </style>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>

      <button
        onClick={downloadPDF}
        className="mt-8 px-6 py-3 bg-indigo-800 text-white rounded-lg hover:bg-indigo-600 transition"
      >
        Download PDF
      </button>
    </div>
  );
}
