import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  serverTimestamp,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const reactionsList = [
  { emoji: "👍", label: "Like" },
  { emoji: "❤️", label: "Love" },
  { emoji: "😂", label: "Haha" },
  { emoji: "😮", label: "Wow" },
  { emoji: "😢", label: "Sad" },
  { emoji: "😡", label: "Angry" },
];

// ✅ Utility to update user stats
const updateUserStats = async (userId, { coins = 1, field = "" }) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      const newCoins = (data.desicoins || 0) + coins;
      const newFieldCount = (data[field] || 0) + 1;

      await updateDoc(userRef, {
        desicoins: newCoins,
        [field]: newFieldCount,
      });

      console.log(`✅ +${coins} DesiCoin & ${field} +1`);
    }
  } catch (error) {
    console.error("Error updating stats:", error);
  }
};

const PostCard = ({ post }) => {
  const [user] = useAuthState(auth);
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [reactionCounts, setReactionCounts] = useState({});
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [copied, setCopied] = useState(false);

  const postRef = doc(db, "posts", post.id);
  const reactionsRef = collection(postRef, "reactions");
  const commentsRef = collection(postRef, "comments");

  useEffect(() => {
    const unsub = onSnapshot(reactionsRef, (snapshot) => {
      const counts = {};
      snapshot.forEach((doc) => {
        const { type } = doc.data();
        counts[type] = (counts[type] || 0) + 1;
        if (doc.id === user?.uid) setSelectedReaction({ label: type });
      });
      setReactionCounts(counts);
    });

    const unsubComments = onSnapshot(commentsRef, (snapshot) => {
      const newComments = snapshot.docs.map((doc) => doc.data());
      setComments(newComments.sort((a, b) => b.createdAt - a.createdAt));
    });

    return () => {
      unsub();
      unsubComments();
    };
  }, [post.id, user?.uid]);

  const handleReaction = async (reaction) => {
    if (!user) return alert("Please login to react.");
    setSelectedReaction(reaction);

    await setDoc(doc(reactionsRef, user.uid), {
      type: reaction.label,
      userId: user.uid,
      username: user.displayName || "Unknown User",
    });

    await updateUserStats(user.uid, { field: "likesCount" });
  };

  const handleCopyLink = async () => {
    const postLink = `${window.location.origin}/post/${post.id}`;
    navigator.clipboard.writeText(postLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    if (user) {
      await updateUserStats(user.uid, { field: "sharesCount" });
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    if (!user) return alert("Please login to comment.");

    try {
      let username = "Unknown User";

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        username = userData.username || "Unknown User";
      }

      await addDoc(commentsRef, {
        text: commentText,
        username: username,
        userId: user.uid,
        createdAt: Date.now(),
      });

      await updateUserStats(user.uid, { field: "commentsCount" });

      setCommentText("");
    } catch (err) {
      console.error("Comment error:", err);
      alert("Error adding comment.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 space-y-3 border border-pink-200">
      {/* User Info */}
      <div className="flex items-center justify-between">
        <Link
          to={`/profile/${post.userId}`}
          className="text-red-600 font-bold hover:underline"
        >
          {post.username || "Unknown User"}
        </Link>
        <span className="text-sm text-gray-500">
          🕒 {post.createdAt?.toDate().toLocaleString() || ""}
        </span>
      </div>

      {/* Post Text */}
      <p className="text-gray-800 whitespace-pre-wrap">{post.text}</p>

      {/* Images */}
      {post.images?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {post.images.map((img, i) => (
            <img key={i} src={img} alt="post" className="rounded-lg w-full" />
          ))}
        </div>
      )}

      {/* Reaction Bar */}
      <div className="flex flex-wrap gap-2 items-center mt-2">
        {reactionsList.map((reaction) => (
          <button
            key={reaction.label}
            onClick={() => handleReaction(reaction)}
            className={`text-xl px-2 py-1 rounded-full ${
              selectedReaction?.label === reaction.label
                ? "bg-yellow-200"
                : "hover:bg-gray-100"
            }`}
            title={reaction.label}
          >
            {reaction.emoji}{" "}
            <span className="text-sm text-gray-600">
              {reactionCounts[reaction.label] || ""}
            </span>
          </button>
        ))}
      </div>

      {/* Tag Placeholder */}
      <div className="text-sm text-blue-500 mt-2">
        🔖 <button className="hover:underline">Tag Friends</button> (Coming Soon)
      </div>

      {/* Share Buttons */}
      <div className="flex flex-wrap gap-4 mt-3 items-center">
        <button
          onClick={handleCopyLink}
          className="bg-gray-100 text-sm px-3 py-1 rounded-full hover:bg-gray-200"
        >
          🔗 Copy Link
        </button>
        {copied && <span className="text-green-600 text-sm">Copied!</span>}
        <a
          href={`https://wa.me/?text=${encodeURIComponent(
            `Check out this Vichar on DesiVichar: ${window.location.origin}/post/${post.id}`
          )}`}
          target="_blank"
          className="text-green-700 hover:underline"
        >
          WhatsApp
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/post/${post.id}`}
          target="_blank"
          className="text-blue-800 hover:underline"
        >
          Facebook
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${window.location.origin}/post/${post.id}`}
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          Twitter (X)
        </a>

        <a
          href={`https://www.instagram.com/`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-500 hover:underline"
        >
          Instagram (Manual)
        </a>
      </div>

      {/* Comment Section */}
      <form onSubmit={handleCommentSubmit} className="mt-4">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="w-full border rounded-md px-3 py-1"
        />
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-1 mt-2 rounded hover:bg-red-700"
        >
          Comment
        </button>
      </form>

      {/* Show Comments */}
      <div className="space-y-2 mt-4">
        {comments.map((comment, i) => (
          <div key={i} className="border-t pt-2 text-sm text-gray-700">
            <span className="font-semibold text-red-600">
              {comment.username}:
            </span>{" "}
            {comment.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostCard;
