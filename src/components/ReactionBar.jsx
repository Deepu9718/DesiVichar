// src/components/ReactionBar.jsx

import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

const reactionTypes = ["like", "love", "haha", "sad", "angry"];

function ReactionBar({ postId, reactions }) {
  const [userReaction, setUserReaction] = useState(null);
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!currentUser) return;

    // Check if user already reacted
    for (const type of reactionTypes) {
      if (reactions?.[type]?.includes(currentUser.uid)) {
        setUserReaction(type);
        break;
      }
    }
  }, [reactions, currentUser]);

  const handleReact = async (type) => {
    if (!currentUser || !postId) return;

    const postRef = doc(db, "posts", postId);
    const postSnap = await getDoc(postRef);
    if (!postSnap.exists()) return;

    const data = postSnap.data();
    const newReactions = { ...data.reactions } || {};

    // Remove previous reaction
    for (const rType of reactionTypes) {
      if (newReactions[rType]) {
        newReactions[rType] = newReactions[rType].filter((id) => id !== currentUser.uid);
      }
    }

    // Add new reaction
    if (!newReactions[type]) newReactions[type] = [];
    newReactions[type].push(currentUser.uid);

    await updateDoc(postRef, { reactions: newReactions });
    setUserReaction(type);
  };

  return (
    <div className="flex gap-3 text-xl mt-2">
      {reactionTypes.map((type) => (
        <button
          key={type}
          className={`transition-transform hover:scale-125 ${
            userReaction === type ? "text-red-600" : "text-gray-500"
          }`}
          onClick={() => handleReact(type)}
        >
          {getEmoji(type)} {reactions?.[type]?.length || 0}
        </button>
      ))}
    </div>
  );
}

const getEmoji = (type) => {
  switch (type) {
    case "like":
      return "👍";
    case "love":
      return "❤️";
    case "haha":
      return "😂";
    case "sad":
      return "😢";
    case "angry":
      return "😡";
    default:
      return "❓";
  }
};

export default ReactionBar;