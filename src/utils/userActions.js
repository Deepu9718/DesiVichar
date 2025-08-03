import { doc, updateDoc, getDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebase";

// ✅ Follow User
export const followUser = async (followerId, targetUserId) => {
  if (followerId === targetUserId) return;

  const followerRef = doc(db, "users", followerId);
  const targetRef = doc(db, "users", targetUserId);

  const [followerSnap, targetSnap] = await Promise.all([
    getDoc(followerRef),
    getDoc(targetRef),
  ]);

  const followerData = followerSnap.data();
  const targetData = targetSnap.data();

  if (followerData.following?.includes(targetUserId)) return;

  await updateDoc(followerRef, {
    following: arrayUnion(targetUserId),
  });

  await updateDoc(targetRef, {
    followers: arrayUnion(followerId),
  });
};

// ✅ Unfollow User
export const unfollowUser = async (followerId, targetUserId) => {
  if (followerId === targetUserId) return;

  const followerRef = doc(db, "users", followerId);
  const targetRef = doc(db, "users", targetUserId);

  await updateDoc(followerRef, {
    following: arrayRemove(targetUserId),
  });

  await updateDoc(targetRef, {
    followers: arrayRemove(followerId),
  });
};
