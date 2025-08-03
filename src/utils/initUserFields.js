import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const initializeUserFieldsIfMissing = async (uid) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return;

  const data = userSnap.data();
  const defaultFields = {
    commentsCount: 0,
    followers: [],
    following: [],
    isInfluencer: false,
    likesCount: 0,
    postCount: 0,
    sharesCount: 0,
    unlockedBadges: [],
    yellowTick: false,
  };

  const missingFields = {};

  for (const key in defaultFields) {
    if (!(key in data)) {
      missingFields[key] = defaultFields[key];
    }
  }

  if (Object.keys(missingFields).length > 0) {
    await updateDoc(userRef, missingFields);
    console.log("✅ Missing user fields initialized:", missingFields);
  }
};
