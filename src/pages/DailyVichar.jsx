import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const DailyVichar = () => {
  const [vichars, setVichars] = useState([]);
  const [loading, setLoading] = useState(true);
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const fetchVichars = async () => {
      try {
        const q = query(
          collection(db, "dailyVichar"),
          where("date", "==", today)
        );
        const snapshot = await getDocs(q);
        const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setVichars(posts);
      } catch (err) {
        console.error("Error fetching daily vichars:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVichars();
  }, [today]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-100 to-green-100 p-4">
      <h2 className="text-2xl font-bold text-red-600 text-center mb-6">
        🌟 Aaj Ka Vichar
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : vichars.length === 0 ? (
        <p className="text-center text-gray-500">🔔 Aaj koi vichar post nahi hua hai.</p>
      ) : (
        vichars.map((v) => (
          <div
            key={v.id}
            className="bg-white rounded-xl shadow p-4 mb-4 max-w-xl mx-auto"
          >
            <p className="text-gray-800 mb-2 whitespace-pre-line">{v.text}</p>
            {v.image && (
              <img
                src={v.image}
                alt="vichar"
                className="rounded mt-2 max-h-60 object-cover w-full"
              />
            )}
            <p className="text-sm text-gray-500 mt-2">— @{v.username}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default DailyVichar;
