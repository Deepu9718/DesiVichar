// src/pages/DesiFeed.jsx

import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import PostCard from "../components/PostCard";
import TrendingTags from "../components/TrendingTags";

function DesiFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(allPosts);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 p-4">
      <h1 className="text-3xl font-bold text-center text-red-600 mb-6 shadow-md">
        🌟 Desi Feed - Lokpriya Vichar 🌟
      </h1>

      <div className="max-w-2xl mx-auto space-y-6">
        {posts.length === 0 ? (
          <p className="text-center text-gray-600">No posts yet...</p>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
             <div className="w-full md:w-1/3">
       <TrendingTags />
       </div>
       </div>
    </div>
  );
}

export default DesiFeed;