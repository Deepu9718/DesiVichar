import React, { useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  updateDoc,
  increment,
} from "firebase/firestore";
import { useSearchParams } from "react-router-dom";

function Register() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();

  const refCode = searchParams.get("ref");

  const validatePassword = (pwd) => {
    return (
      pwd.length >= 6 &&
      /[A-Z]/.test(pwd) &&
      /[!@#$%^&*()_+\-={}[\]:;"'\\|,.<>/?]/.test(pwd)
    );
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!fullName || !username || !email || !password) {
      setMessage("❌ Please fill all fields.");
      return;
    }

    if (!validatePassword(password)) {
      setMessage(
        "❌ Password must be at least 6 characters, include uppercase & special char."
      );
      return;
    }

    try {
      // check unique username
      const usernameRef = doc(db, "usernames", username);
      const usernameSnap = await getDoc(usernameRef);
      if (usernameSnap.exists()) {
        setMessage("❌ Username already taken.");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update displayName with username
      await updateProfile(user, { displayName: username });

      // Send verification email
      await sendEmailVerification(user);

      // Save user in Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName,
        username,
        email,
        createdAt: serverTimestamp(),
        verified: false,
        invitedBy: refCode || null,
        invites: 0,
      });

      // Save in usernames collection
      await setDoc(doc(db, "usernames", username), {
        uid: user.uid,
      });

      // Add invite if referred
      if (refCode) {
        const refSnap = await getDoc(doc(db, "usernames", refCode));
        if (refSnap.exists()) {
          const refUid = refSnap.data().uid;
          const refUserRef = doc(db, "users", refUid);
          const refUserSnap = await getDoc(refUserRef);
          if (refUserSnap.exists()) {
            const refUserData = refUserSnap.data();
            const currentCoins = refUserData.desicoins || 0;

            await updateDoc(refUserRef, {
              invites: increment(1),
              desicoins: currentCoins + 50, // ✅ +50 DesiCoins to inviter
            });
          }
        }
      }

      // Sign out after register
      await auth.signOut();

      setMessage(
        "✅ Registration successful. Please verify your mail. Check inbox/spam."
      );
    } catch (err) {
      console.error(err.message);
      setMessage("❌ Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-orange-100 p-4">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm border-2 border-yellow-400"
      >
        <h2 className="text-2xl font-bold text-red-600 text-center mb-2">
          🚀 DesiVichaar Registration
        </h2>
        <p className="text-center mb-4 text-gray-600">
          Join our expressive tribe & earn by your content! 💬✨
        </p>

        <label className="text-sm font-semibold">👨‍🦱 Full Name</label>
        <input
          type="text"
          placeholder="Apna poora naam likhein"
          className="w-full mb-3 p-2 border rounded"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <label className="text-sm font-semibold">👤 Username</label>
        <input
          type="text"
          placeholder="Choose a unique username"
          className="w-full mb-3 p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

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
          placeholder="Create strong password"
          className="w-full mb-3 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 font-semibold"
        >
          Register
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
          Already a user?{" "}
          <a href="/login" className="text-blue-500 underline">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;
