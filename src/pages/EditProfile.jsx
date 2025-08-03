import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        setUserData(data);
        setGender(data.gender || "");
        setDob(data.dob || "");
      }
    };
    fetchData();
  }, [user]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setProfilePicFile(e.target.files[0]);
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "desivichar_preset"); // 👈 replace with your preset
    formData.append("cloud_name", "dzjq5iefg");      // 👈 replace with your Cloudinary name

    const response = await fetch("https://api.cloudinary.com/v1_1/dzjq5iefg/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      let profilePicURL = userData.profilePic || "";

      if (profilePicFile) {
        profilePicURL = await uploadToCloudinary(profilePicFile);
        console.log("✅ Cloudinary Upload URL:", profilePicURL);
      }

      await updateDoc(doc(db, "users", user.uid), {
        profilePic: profilePicURL,
        gender,
        dob,
      });

      alert("🎉 Profile updated successfully!");
      navigate(`/profile/${user.uid}`);
    } catch (err) {
      console.error("Error updating profile:", err);
      setErrorMsg("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4 text-center text-red-600">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-center">
          <img
            src={
              profilePicFile
                ? URL.createObjectURL(profilePicFile)
                : userData.profilePic || "/default-profile.png"
            }
            alt="Profile"
            className="w-24 h-24 mx-auto rounded-full border mb-2"
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input type="text" value={userData.fullName} readOnly className="w-full px-4 py-2 border rounded bg-gray-100" />
        </div>

        <div>
          <label className="block text-sm font-medium">Username</label>
          <input type="text" value={userData.username} readOnly className="w-full px-4 py-2 border rounded bg-gray-100" />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" value={userData.email} readOnly className="w-full px-4 py-2 border rounded bg-gray-100" />
        </div>

        <div>
          <label className="block text-sm font-medium">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">Select Gender</option>
            <option value="Male">👨 Male</option>
            <option value="Female">👩 Female</option>
            <option value="Other">🌈 Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {errorMsg && <p className="text-red-600 text-sm text-center">{errorMsg}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default EditProfile;