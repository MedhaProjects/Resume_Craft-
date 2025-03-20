import { Link } from "react-router-dom";
import { FaHome, FaPalette, FaCrown, FaChartLine, FaRegFileAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        {/* Logo & Tagline */}
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h1 className="text-2xl font-bold text-yellow-500">Resume Craft</h1>
          <p className="text-gray-400 text-sm mt-2">Craft your perfect resume with ease.</p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center space-x-6 text-gray-300 mb-6 md:mb-0">
          <Link to="/" className="hover:text-yellow-500 transition-all duration-300">Dashboard</Link>
          <Link to="/template" className="hover:text-yellow-500 transition-all duration-300">Template</Link>
          <Link to="/upgrade" className="hover:text-yellow-500 transition-all duration-300">Upgrade</Link>
          <Link to="/resume-types" className="hover:text-yellow-500 transition-all duration-300">Resume Types</Link>
          <Link to="/ats" className="hover:text-yellow-500 transition-all duration-300">ATS</Link>
          <Link to="/build-resume" className="hover:text-yellow-500 transition-all duration-300">Build Resume</Link>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-yellow-500 transition-all duration-300 text-xl"><FaFacebook /></a>
          <a href="#" className="text-gray-400 hover:text-yellow-500 transition-all duration-300 text-xl"><FaTwitter /></a>
          <a href="#" className="text-gray-400 hover:text-yellow-500 transition-all duration-300 text-xl"><FaInstagram /></a>
          <a href="#" className="text-gray-400 hover:text-yellow-500 transition-all duration-300 text-xl"><FaLinkedin /></a>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-6"></div>

      {/* Copyright and Contact Info */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Resume Craft. All rights reserved.</p>
        <p className="text-sm text-gray-400">
          Contact us at: <a href="mailto:support@resumecraft.com" className="text-yellow-500 hover:underline">support@resumecraft.com</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
