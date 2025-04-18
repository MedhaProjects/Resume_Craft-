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

  const downloadPDF = async() => {
    const element = document.getElementById("resume-preview");
    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("resume.pdf");
    });

    await storeResume( templateNumber, content);
  };



  useEffect(() => {
    (async function () {
      try {
        const content = await getResume(templateNumber);
        if(!content){
          setContent(initialTemplate3Content)
        }else{
          setContent(content);
        }
        
      } catch (error) {
        setContent(initialTemplate3Content)
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
      <h1 className="text-4xl font-bold text-center mb-4 text-indigo-800">Resume Editor</h1>

      <div className="border rounded-lg p-6 shadow-lg bg-white w-full max-w-3xl">
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
          // initialVvalue={initialTemplate4Content}
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
        className="mt-6 px-5 py-3 bg-indigo-800 text-white rounded-lg hover:bg-indigo-600 transition"
      >
        Download as PDF
      </button>
    </div>
  );
}
