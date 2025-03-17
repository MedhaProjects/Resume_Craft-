import { SignUp } from "@clerk/clerk-react";

const Signup = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-yellow-500 mb-6">
          Create an Account
        </h2>
        <SignUp routing="path" path="/signup" />
      </div>
    </div>
  );
};

export default Signup;
