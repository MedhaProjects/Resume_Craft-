import { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { getResume, storeResume } from "../utils/utils";
import toast from "react-hot-toast";
import { initialTemplate4Content } from "../utils/templateContent";

export default function ResumeEditor() {
  const [content, setContent] = useState("");
  const [templateNumber] = useState("4");
  const editorRef = useRef(null);

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  const downloadPDF = async () => {
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

    await storeResume(templateNumber, content);
  };

  useEffect(() => {
    (async function () {
      try {
        const content = await getResume(templateNumber);
        if (!content) {
          setContent(initialTemplate4Content);
        } else {
          setContent(content);
        }
      } catch (error) {
        setContent(initialTemplate4Content);
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
    <div className="container mx-auto p-6 flex flex-col items-center bg-[#e5eaf3] min-h-screen">
      <div className="w-full flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#1e2d3b]">Resume Editor</h2>
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
            className="w-[120px] h-[40px] bg-[#071a41] hover:bg-[#2b3955] text-white font-semibold rounded-xl cursor-pointer"
          >
            Save
          </button>
        </div>

        <Editor
          apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
          value={content}
          init={{
            height: 500,
            menubar: true,
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
              h1 {
                font-size: 28px;
                font-weight: bold;
                color: #1e2d3b;
                margin-bottom: 4px;
              }
              h2 {
                font-size: 20px;
                font-weight: bold;
                background-color: #e6ecf5;
                padding: 8px 12px;
                margin-top: 30px;
                margin-bottom: 15px;
                border-left: 4px solid #2a4365;
                border-radius: 4px;
              }
              p, li {
                margin-bottom: 10px;
              }
              ul {
                padding-left: 20px;
              }
            `,
          }}
          onEditorChange={handleEditorChange}
          ref={editorRef}
        />
      </div>

      <div
        id="resume-preview"
        className="mt-6 bg-white shadow-lg w-[210mm] min-h-[297mm] border border-gray-300 rounded-lg px-10 py-12 text-[#2c3e50]"
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "14px",
          lineHeight: "1.8",
        }}
      >
        <style>
          {`
            #resume-preview h1 {
              font-size: 28px;
              font-weight: bold;
              color: #1e2d3b;
              margin-bottom: 4px;
            }

            #resume-preview h2 {
              font-size: 20px;
              font-weight: bold;
              background-color: #e6ecf5;
              padding: 8px 12px;
              margin-top: 30px;
              margin-bottom: 15px;
              border-left: 4px solid #2a4365;
              border-radius: 4px;
            }

            #resume-preview p {
              margin-bottom: 10px;
            }

            #resume-preview ul {
              padding-left: 20px;
              list-style-type: disc;
              margin-bottom: 10px;
            }

            #resume-preview li {
              margin-bottom: 6px;
            }
          `}
        </style>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>

      <div className="flex gap-3 items-center justify-center mt-6">
        <button
          onClick={downloadPDF}
          className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Download as PDF
        </button>
        <button
          onClick={saveResumeContent}
          className="px-5 py-3 bg-[#071a41] text-white rounded-lg hover:bg-[#2b3955] transition"
        >
          Save
        </button>
      </div>
    </div>
  );
}
