import { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getResume, storeResume } from "../utils/utils";
import toast from "react-hot-toast";
import { initialTemplate2Content } from "../utils/templateContent";
export default function ResumeEditor() {
  const [content, setContent] = useState("");
  const [templateNumber] = useState("2");
  const editorRef = useRef(null);
  const [user, setUser] = useState();
  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };
  const downloadPDF = async () => {
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
      await storeResume("2", content);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);





  useEffect(() => {
    (async function () {
      try {
        const content = await getResume(templateNumber);
        if(!content){
          setContent(initialTemplate2Content)
        }else{
          setContent(content);
        }
        
      } catch (error) {
        setContent(initialTemplate2Content)
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
        <div className="w-16"></div> {/* Placeholder for alignment */}
      </div>

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
        className="mt-6 px-5 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Download as PDF
      </button>
    </div>
  );
}
