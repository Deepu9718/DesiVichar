import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [showReset, setShowReset] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email || !password) {
      setMessage("❌ Please fill all fields.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        setMessage("❌ Please verify your email before logging in.");
        return;
      }

      setMessage("✅ Login successful! Redirecting...");
      setTimeout(() => navigate("/feed"), 1500);
    } catch (error) {
      console.error("Login error:", error.message);
      setMessage("❌ " + error.message);
    }
  };

  const handleResetPassword = async () => {
    if (!resetEmail) {
      alert("Please enter your registered email.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert("Password reset email sent! Check your inbox.");
      setResetEmail("");
      setShowReset(false);
    } catch (error) {
      console.error("Reset error:", error.message);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm border-2 border-blue-400"
      >
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-2">
          🔐 Login to DesiVichar
        </h2>
        <p className="text-center mb-4 text-gray-600">
          Welcome back! Let's continue expressing 💬✨
        </p>

        <label className="text-sm font-semibold">📧 Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full mb-3 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="text-sm font-semibold">🔒 Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full mb-1 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Forgot Password Link */}
        <p
          onClick={() => setShowReset(true)}
          className="text-sm text-blue-600 mb-3 cursor-pointer hover:underline text-right"
        >
          Forgot Password?
        </p>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold"
        >
          Login
        </button>

        {message && (
          <div
            className={`mt-4 p-2 rounded text-sm text-center ${
              message.startsWith("✅")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <p className="mt-4 text-center text-sm text-gray-600">
          New here?{" "}
          <a href="/register" className="text-blue-500 underline">
            Create an account
          </a>
        </p>

        {/* Forgot Password UI */}
        {showReset && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-md font-semibold text-gray-700 mb-2">
              Reset Your Password
            </h3>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded mb-2"
            />
            <button
              onClick={handleResetPassword}
              type="button"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Send Reset Link
            </button>
            <button
              onClick={() => setShowReset(false)}
              type="button"
              className="w-full mt-2 text-sm text-red-500 underline"
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;