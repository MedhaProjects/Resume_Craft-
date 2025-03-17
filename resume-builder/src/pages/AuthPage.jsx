import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Track Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Handle Email/Password Authentication
  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        alert("Verification email sent! Please check your inbox.");
      }
      setUser(userCredential.user);
      alert("Successfully logged in!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      alert("Successfully logged in!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-lg shadow-lg border border-gray-600">
        {user ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition flex items-center justify-center font-semibold text-lg"
            >
              👤 My Account
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-full bg-gray-700 rounded-lg shadow-lg p-2">
                <button className="w-full text-left text-white py-2 px-4 hover:bg-gray-600 rounded-lg">
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-white py-2 px-4 hover:bg-gray-600 rounded-lg"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <h2 className="text-4xl font-bold text-center mb-6 text-purple-400 drop-shadow-lg">
              {isLogin ? "Welcome Back!" : "Create Account"}
            </h2>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label className="block text-gray-300 font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white shadow-md"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-medium">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white shadow-md"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold text-lg shadow-md"
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>

            {/* Google Sign-In Button with Modern UI */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full bg-red-600 text-white py-3 mt-4 rounded-lg hover:bg-red-700 transition flex items-center justify-center font-semibold text-lg shadow-md"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" 
                   alt="Google" className="w-5 h-5 mr-3" />
              Sign in with Google
            </button>

            <p className="text-center mt-6 text-gray-300">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-purple-400 font-semibold hover:underline ml-1 transition"
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
