const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.onUserFieldUpdate = functions.firestore
  .document("users/{userId}")
  .onUpdate(async (change, context) => {
    const userId = context.params.userId;
    const before = change.before.data();
    const after = change.after.data();

    const prevBadges = before.unlockedBadges || [];
    const newBadges = new Set(prevBadges);
    let desiCoinsToAdd = 0;
    const updates = {};

    const {
      postCount = 0,
      commentsCount = 0,
      likesCount = 0,
      sharesCount = 0,
      invites = 0,
      followers = 0,
    } = after;

    const badgeChecks = [
      {
        name: "👋 Welcome Badge",
        condition: postCount >= 5,
        reward: 50,
      },
      {
        name: "📅 Regular Badge",
        condition:
          postCount >= 20 &&
          likesCount >= 25 &&
          commentsCount >= 10 &&
          sharesCount >= 5,
        reward: 100,
      },
      {
        name: "🌟 Dream Badge",
        condition:
          followers >= 150 &&
          postCount >= 100 &&
          likesCount >= 150 &&
          commentsCount >= 30 &&
          sharesCount >= 10,
        reward: 250,
        yellowTick: true,
      },
      {
        name: "💎 Valuable Badge",
        condition:
          followers >= 500 &&
          postCount >= 250 &&
          commentsCount >= 50 &&
          likesCount >= 400 &&
          sharesCount >= 50 &&
          invites >= 5,
        reward: 400,
      },
      {
        name: "🎖️ Digital Badge",
        condition:
          invites >= 10 &&
          followers >= 1000 &&
          postCount >= 650 &&
          likesCount >= 1000 &&
          commentsCount >= 100 &&
          sharesCount >= 100,
        reward: 600,
      },
      {
        name: "🎭 Desi Kalakaar Badge",
        condition:
          invites >= 50 &&
          followers >= 5000 &&
          postCount >= 1200 &&
          likesCount >= 2000 &&
          commentsCount >= 250 &&
          sharesCount >= 250,
        reward: 1000,
      },
      {
        name: "🚀 Influencer Badge",
        condition: invites >= 100,
        reward: 2500,
      },
    ];

    for (const badge of badgeChecks) {
      if (badge.condition && !newBadges.has(badge.name)) {
        newBadges.add(badge.name);
        desiCoinsToAdd += badge.reward;
        console.log(`✅ Unlocked: ${badge.name} for ${userId}`);

        if (badge.yellowTick) {
          updates.yellowTick = true;
          console.log("🟡 Yellow Tick granted");
        }
      }
    }

    updates.unlockedBadges = Array.from(newBadges);

    if (desiCoinsToAdd > 0) {
      const currentCoins = after.desicoins || 0;
      updates.desicoins = currentCoins + desiCoinsToAdd;
      console.log(`🪙 +${desiCoinsToAdd} coins added`);
    }

    if (Object.keys(updates).length > 0) {
      await db.collection("users").doc(userId).update(updates);
      console.log("✅ User updated successfully.");
    }
  });
