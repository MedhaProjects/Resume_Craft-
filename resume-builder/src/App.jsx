import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBot from "./pages/ChatBot"; // ✅ Import chatbot
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import Template from "./pages/Template";
import Upgrade from "./pages/Upgrade";
import ResumeEditor from "./pages/ResumeEditor";
import ResumeTypes from "./pages/Types";
import Ats from "./pages/Atsscore";
import BuildResume from "./pages/BuildResume"; // Import the new page

// Resume Templates
import Template1 from "./pages/Template1";
import Template2 from "./pages/Template2";
import Template3 from "./pages/Template3";
import Template4 from "./pages/Template4";
import Template5 from "./pages/Template5";
import Template6 from "./pages/Template6";
import Template7 from "./pages/Template7";
import Template8 from "./pages/Template8";
import Template9 from "./pages/Template9";
import Template10 from "./pages/Template10";
import Success from "./components/Success";
import Profile from "./pages/Profile";
import  {Toaster} from "react-hot-toast"
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />

        {/* ✅ Chatbot appears on all pages */}
        <ChatBot />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/template" element={<Template />} />
          <Route path="/upgrade" element={<Upgrade />} />
          <Route path="/resume-types" element={<ResumeTypes />} />
          <Route path="/ats" element={<Ats />} />
          <Route path="/edit/:type" element={<ResumeEditor />} />
          <Route path="/build-resume" element={<BuildResume />} />
          <Route path="/success" element={<Success />} />
          <Route path="/profile" element={<Profile />} />
          {/* Template Pages */}
          <Route path="/template1" element={<Template1 />} />
          <Route path="/template2" element={<Template2 />} />
          <Route path="/template3" element={<Template3 />} />
          <Route path="/template4" element={<Template4 />} />
          <Route path="/template5" element={<Template5 />} />
          <Route path="/template6" element={<Template6 />} />
          <Route path="/template7" element={<Template7 />} />
          <Route path="/template8" element={<Template8 />} />
          <Route path="/template9" element={<Template9 />} />
          <Route path="/template10" element={<Template10 />} />
        </Routes>

        <Footer />
        <Toaster/>
      </div>
    </Router>
  );
};

export default App;
