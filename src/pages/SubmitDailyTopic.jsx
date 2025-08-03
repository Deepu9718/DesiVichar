import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const SubmitDailyTopic = () => {
  const [topic, setTopic] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().slice(0, 10);

    try {
      await addDoc(collection(db, "dailyTopics"), {
        date: today,
        topic,
        createdAt: serverTimestamp(),
      });
      alert("✅ Aaj ka topic set ho gaya!");
      setTopic("");
    } catch (err) {
      alert("❌ Topic save nahi ho paya.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-yellow-100 to-green-100 p-6 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white max-w-md w-full p-5 rounded-xl shadow-xl"
      >
        <h2 className="text-xl font-bold text-red-600 mb-3">📝 Aaj Ka Vichar Topic Set Kijiye</h2>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter today's topic..."
          required
          className="w-full border p-2 rounded mb-4"
        />
        <button
          type="submit"
          className="bg-red-600 text-white w-full py-2 rounded hover:bg-red-700"
        >
          Set Topic
        </button>
      </form>
    </div>
  );
};

export default SubmitDailyTopic;
