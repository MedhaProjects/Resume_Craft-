import { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { getResume, storeResume } from "../utils/utils";
import { initialTemplate1Content } from "../utils/templateContent";
import toast from "react-hot-toast"
export default function ResumeEditor() {
  const [content, setContent] = useState("");
  const editorRef = useRef(null);
  const [templateNumber] = useState("1");
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
        if(!content){
          setContent(initialTemplate1Content)
        }else{
          setContent(content);
        }
        
      } catch (error) {
        setContent(initialTemplate1Content)
        console.log(error);
      }
    })();
  }, []);




  const saveResumeContent = async () => {
    try {
      await storeResume(templateNumber, content);
      toast.success("Resume is saved");
    } catch (error) {
      toast.error("something wen wrong, please try again");
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
        <div className=" flex justify-between items-center mb-3">
          <button
            onClick={downloadPDF}
            className=" px-5 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Download as PDF
          </button>
          <button
            onClick={saveResumeContent}
            className="w-[120px] h-[40px] bg-[#071a41] hover:bg-[#2b3955] text-white-400 font-semibold rounded-4xl cursor-pointer  items-end "
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
