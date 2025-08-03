import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { addDoc, collection, serverTimestamp, getDocs, query, where } from "firebase/firestore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SubmitDailyVichar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [vichar, setVichar] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("");

  const todayDate = new Date().toISOString().slice(0, 10); // "yyyy-mm-dd"

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const q = query(collection(db, "dailyTopics"), where("date", "==", todayDate));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          setTopic(doc.data().topic);
        } else {
          setTopic("");
        }
      } catch (error) {
        console.error("Error fetching topic:", error);
        setTopic("");
      }
    };

    fetchTopic();
  }, [todayDate]);

  const handleImageUpload = async () => {
    if (!imageFile) return "";
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "desivichar_preset");
    formData.append("cloud_name", "dzjq5iefg");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dzjq5iefg/image/upload",
      formData
    );
    return res.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vichar) return alert("Vichar likhna zaroori hai!");

    setLoading(true);

    try {
      const imageUrl = await handleImageUpload();
      await addDoc(collection(db, "dailyVichar"), {
        text: vichar,
        image: imageUrl || "",
        date: todayDate,
        topic: topic || "",
        addedBy: currentUser.uid,
        username: currentUser.displayName || "unknown",
        createdAt: serverTimestamp(),
      });
      alert("✅ Daily Vichar submit ho gaya!");
      navigate("/daily-vichar");
    } catch (err) {
      console.error(err);
      alert("❌ Submit failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-red-100 to-green-100 p-4 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6 rounded-xl max-w-md w-full"
      >
        <h2 className="text-xl font-bold text-center text-red-600 mb-2">
          🌞 Aaj Ka Vichar Upload Kariye
        </h2>

        <p className="text-sm text-blue-700 font-semibold mb-4 text-center">
          {topic ? `📌 Aaj Ka Topic: ${topic}` : "🔔 Aaj ka topic abhi set nahi hua hai."}
        </p>

        <label className="block font-medium mb-1">Vichar</label>
        <textarea
          value={vichar}
          onChange={(e) => setVichar(e.target.value)}
          required
          className="w-full border p-2 rounded mb-4"
          rows={4}
          placeholder="Aaj ka prernaadayak vichar likhiye..."
        />

        <label className="block font-medium mb-1">Optional Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="mb-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-semibold"
        >
          {loading ? "Uploading..." : "Submit Vichar"}
        </button>

                {/* ✅ Reward System Note */}
        <div className="bg-green-50 text-green-800 p-4 mt-6 rounded-md border border-green-200 shadow-sm text-sm">
          <h3 className="text-lg font-bold mb-2">🏆 Daily Vichar Reward System</h3>
          <ul className="list-disc ml-5 space-y-1">
            <li>Har din <b>admin ek topic set</b> karega</li>
            <li>Sirf us topic pe likha gaya vichar valid hoga</li>
            <li>Top 3 users ko <b>100 DesiCoins</b> reward diya jaayega</li>
            <li>Selection <b>content quality + engagement</b> pe depend karega</li>
            <li>Daily naye topic pe vichar likhiye aur jeetiye DesiCoins 🎉</li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default SubmitDailyVichar;
