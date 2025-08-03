import React, { useEffect, useState } from "react";
import { extractHashtagsFromPosts } from "../utils/hashtagUtils";

const TrendingTags = () => {
  const [hashtags, setHashtags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      const trending = await extractHashtagsFromPosts();
      setHashtags(trending);
    };
    fetchTags();
  }, []);

  return (
    <div className="bg-white shadow p-4 rounded-xl mb-4">
      <h3 className="text-lg font-semibold text-red-600 mb-2">🔥 Trending Hashtags</h3>
      {hashtags.length === 0 ? (
        <p className="text-gray-500 text-sm">No trending tags yet.</p>
      ) : (
        <ul className="text-sm text-blue-600 space-y-1">
          {hashtags.map((item, idx) => (
            <li key={idx}>
              {item.tag} <span className="text-gray-400">({item.count})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrendingTags;
