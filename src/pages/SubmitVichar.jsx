import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { checkAndUpdateBadges } from "../utils/badgeLogic";

const rewardPostCoins = async (userId) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const data = userSnap.data();
    const currentCoins = data.desicoins || 0;
    const currentPostCount = data.postCount || 0;

    await updateDoc(userRef, {
      desicoins: currentCoins + 5,
      postCount: currentPostCount + 1,
    });

    console.log("✅ 5 DesiCoins added & postCount updated!");
  }
};


const SubmitYourVichar = () => {
  const [caption, setCaption] = useState("");
  const [images, setImages] = useState([]);
  const [user] = useAuthState(auth);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!caption && images.length === 0) {
    alert("Please enter text or upload image.");
    return;
  }

  try {
    const uploadedUrls = [];

    for (const image of images) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "desivichar_preset");
      formData.append("cloud_name", "dzjq5iefg");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dzjq5iefg/image/upload",
        formData
      );

      uploadedUrls.push(res.data.secure_url);
    }

    // ✅ Step 1: Get username from Firestore 'users' collection
    let username = "Unknown User";
    if (user?.uid) {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        username = userData.username || "Unknown User";
      }
    }

    // ✅ Step 2: Save post to Firestore with username
    await addDoc(collection(db, "posts"), {
      text: caption,
      images: uploadedUrls,
      createdAt: serverTimestamp(),
      userId: user?.uid || "",
      username: username,
    });

      // ✅ Step 3: Reward Desicoins & Check Badges
      await rewardPostCoins(user.uid);
      await checkAndUpdateBadges(user.uid);
    alert("Vichar uploaded successfully!");
    setCaption("");
    setImages([]);
  } catch (error) {
    console.error("Upload Failed:", error);
    alert("Upload Failed");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 via-yellow-100 to-red-100 py-10 px-4 flex justify-center items-start">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg">
        <h2 className="text-center text-xl font-bold mb-4 text-red-700">
          🌸 Submit Your Vichar 🌸
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            placeholder="Kya kehna hai duniya se?"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full p-2 border rounded-md resize-none"
          />

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full"
          />

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded shadow w-full"
          >
            Submit Your Vichar
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitYourVichar;