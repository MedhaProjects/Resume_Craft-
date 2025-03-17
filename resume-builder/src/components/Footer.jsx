import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-8 mt-15 text-center">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          {/* Logo and Trustpilot */}
          <div className="text-left mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-purple-500">Resume Builder</h2>
            <div className="flex items-center mt-2">
              <img src="/trustpilot.png" alt="Trustpilot" className="w-24" />
              <p className="text-sm ml-2">TrustScore 4.2 | 791 reviews</p>
            </div>
          </div>
          {/* Navigation Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="font-semibold text-white">Build Your Resume</h3>
              <ul className="mt-2 space-y-1">
                <li><Link to="/ai-builder" className="hover:text-purple-500">AI Resume Builder</Link></li>
                <li><Link to="/examples" className="hover:text-purple-500">Basic Resume Examples</Link></li>
                <li><Link to="/how-to-write" className="hover:text-purple-500">How To Write a Resume</Link></li>
                <li><Link to="/app" className="hover:text-purple-500">Resume Builder App</Link></li>
                <li><Link to="/cover-letter" className="hover:text-purple-500">Cover Letter Builder</Link></li>
                <li><Link to="/resume-templates" className="hover:text-purple-500">Resume Templates</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white">Career Resources</h3>
              <ul className="mt-2 space-y-1">
                <li><Link to="/make-resume" className="hover:text-purple-500">How To Make a Resume</Link></li>
                <li><Link to="/summary" className="hover:text-purple-500">Professional Resume Summary</Link></li>
                <li><Link to="/formats" className="hover:text-purple-500">Best Resume Formats</Link></li>
                <li><Link to="/fonts" className="hover:text-purple-500">Best Fonts for Your Resume</Link></li>
                <li><Link to="/references" className="hover:text-purple-500">How To List References</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white">About Resume Builder</h3>
              <ul className="mt-2 space-y-1">
                <li><Link to="/about" className="hover:text-purple-500">Dashboard</Link></li>
                <li><Link to="/contact" className="hover:text-purple-500">Tempalte</Link></li>
                <li><Link to="/privacy" className="hover:text-purple-500">Upgrade</Link></li>
                <li><Link to="/terms" className="hover:text-purple-500">Resume Type</Link></li>
                <li><Link to="/press" className="hover:text-purple-500">Ats Checker</Link></li>
                <li><Link to="/accessibility" className="hover:text-purple-500">Accessibility</Link></li>
                <li><Link to="/do-not-sell" className="hover:text-purple-500">Do Not Sell or Share</Link></li>
              </ul>
            </div>
          </div>
        </div>
        {/* Social Media Icons */}
        <div className="flex justify-center space-x-4 text-xl text-gray-500">
          <a href="#" className="hover:text-purple-500">🔗</a>
          <a href="#" className="hover:text-purple-500">❌</a>
          <a href="#" className="hover:text-purple-500">📸</a>
          <a href="#" className="hover:text-purple-500">🎵</a>
          <a href="#" className="hover:text-purple-500">📘</a>
        </div>
        {/* Copyright */}
        <p className="text-sm text-gray-500 mt-4">© {new Date().getFullYear()}, Bold Limited. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
