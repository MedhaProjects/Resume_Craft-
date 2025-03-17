import { Link } from "react-router-dom";
import { FaHome, FaPalette, FaCrown, FaChartLine } from "react-icons/fa";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { FaRegFileAlt } from "react-icons/fa"; // New icon for Build Your Resume
import { useState, useEffect } from "react";
import { auth } from "../firebase"; // Import Firebase authentication
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const [user, setUser] = useState(null);

  // Listen to authentication changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  // Handle Logout
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <nav className="w-full p-4 flex justify-between items-center shadow-lg bg-gray-900 text-white">
      {/* Left - Logo */}
      <h1 className="text-2xl font-bold text-yellow-600">Resume Craft</h1>

      {/* Middle - Navigation Links */}
      <div className="space-x-8 hidden md:flex">
        <Link to="/" className="flex items-center space-x-2 text-gray-300 hover:text-yellow-500 transition-all duration-300">
          <FaHome className="transition-transform transform hover:scale-110" />
          <span>Dashboard</span>
        </Link>
        <Link to="/template" className="flex items-center space-x-2 text-gray-300 hover:text-yellow-500 transition-all duration-300">
          <FaPalette className="transition-transform transform hover:scale-110" />
          <span>Template</span>
        </Link>
        <Link to="/upgrade" className="flex items-center space-x-2 text-gray-300 hover:text-yellow-500 transition-all duration-300">
          <FaCrown className="transition-transform transform hover:scale-110" />
          <span>Upgrade</span>
        </Link>
        <Link to="/resume-types" className="flex items-center space-x-2 text-gray-300 hover:text-yellow-500 transition-all duration-300">
          <FaChartLine className="transition-transform transform hover:scale-110" />
          <span>Resume Types</span>
        </Link>
        <Link to="/ats" className="flex items-center space-x-2 text-gray-300 hover:text-yellow-500 transition-all duration-300">
          <FaChartLine className="transition-transform transform hover:scale-110" />
          <span>ATS</span>
        </Link>

        {/* Build Your Resume Button with new colors and icon */}
        <Link to="/build-resume" className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg shadow-md transition-all duration-300 
             bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
  <FaRegFileAlt className="transition-transform transform hover:scale-110" />
  <span>Build Your Resume</span>
</Link>
      </div>

      {/* Right - Authentication Buttons */}
      {user ? (
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
        >
          <FiLogOut className="mr-2" /> Logout
        </button>
      ) : (
        <Link to="/auth" className="flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 transition-all duration-300">
          <FiLogIn className="mr-2" /> Login / Sign Up
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
