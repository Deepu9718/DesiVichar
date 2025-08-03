import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const evaluateAndUpdateBadge = async (userId) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return;

  const user = userSnap.data();
  const {
    postCount = 0,
    followers = [],
    likesCount = 0,
    commentsCount = 0,
    sharesCount = 0,
    invites = 0,
    unlockedBadges = [],
    desicoins = 0,
  } = user;

  const newUnlocked = [...unlockedBadges];
  let coinReward = 0;
  let updates = {};

  const checkAndUnlock = (badge, condition, reward, extraFields = {}) => {
    if (!newUnlocked.includes(badge) && condition) {
      newUnlocked.push(badge);
      coinReward += reward;
      Object.assign(updates, extraFields);
    }
  };

  checkAndUnlock("👋 Welcome Badge", postCount >= 5, 50);

  checkAndUnlock("📅 Regular Badge",
    postCount >= 20 && likesCount >= 25 && commentsCount >= 10 && sharesCount >= 5,
    100
  );

  checkAndUnlock("🌟 Dream Badge",
    followers.length >= 150 && postCount >= 100 && likesCount >= 150 && commentsCount >= 30 && sharesCount >= 10,
    250,
    { yellowTick: true } // yellow trishul tick
  );

  checkAndUnlock("💎 Valuable Badge",
    followers.length >= 500 && postCount >= 250 && commentsCount >= 50 && likesCount >= 400 && sharesCount >= 50 && invites >= 5,
    400
  );

  checkAndUnlock("🎖️ Digital Badge",
    invites >= 10 && followers.length >= 1000 && postCount >= 650 && likesCount >= 1000 && commentsCount >= 100 && sharesCount >= 100,
    600
  );

  checkAndUnlock("🎭 Desi Kalakaar Badge",
    invites >= 50 && followers.length >= 5000 && postCount >= 1200 && likesCount >= 2000 && commentsCount >= 250 && sharesCount >= 250,
    1000
  );

  checkAndUnlock("🚀 Influencer Badge",
    invites >= 100,
    2500
  );

  if (coinReward > 0) {
    updates = {
      ...updates,
      unlockedBadges: newUnlocked,
      desicoins: desicoins + coinReward,
    };
    await updateDoc(userRef, updates);
    console.log("🎉 Badge(s) Unlocked & Coins rewarded:", updates);
  }
};
export const checkAndUpdateBadges = async (uid) => {
  // Logic to:
  // - check followers, posts, likes etc.
  // - award badges
  // - update badges[] and desicoins in firestore
};
