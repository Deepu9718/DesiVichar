import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const rewards = [
  { label: "🪙 5 DesiCoins", type: "desicoins", value: 5, weight: 30 },
  { label: "🪙 10 DesiCoins", type: "desicoins", value: 10, weight: 20 },
  { label: "🪙 25 DesiCoins", type: "desicoins", value: 25, weight: 15 },
  { label: "🪙 50 DesiCoins", type: "desicoins", value: 50, weight: 10 },
  { label: "🟡 Yellow Tick (5 Days)", type: "yellowTick", weight: 2 },
  { label: "🌟 Dream Badge (5 Days)", type: "dreamBadge", weight: 2 },
  { label: "📌 Pin Post (3 Days)", type: "pinPost", weight: 2 },
  { label: "💎 500 DesiCoins", type: "desicoins", value: 500, weight: 1 },
];

// Weighted random picker
const pickWeightedReward = () => {
  const totalWeight = rewards.reduce((sum, r) => sum + r.weight, 0);
  let random = Math.random() * totalWeight;
  for (const reward of rewards) {
    if (random < reward.weight) return reward;
    random -= reward.weight;
  }
  return rewards[0]; // Fallback
};

const LuckySpin = () => {
  const [user] = useAuthState(auth);
  const [spinCount, setSpinCount] = useState(0);
  const [reward, setReward] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [lastSpinDate, setLastSpinDate] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchSpinData = async () => {
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);
      const data = snap.data();
      const today = new Date().toDateString();

      if (data.lastSpinDate !== today) {
        await updateDoc(userRef, {
          spinCountToday: 0,
          lastSpinDate: today,
        });
        setSpinCount(0);
        setLastSpinDate(today);
      } else {
        setSpinCount(data.spinCountToday || 0);
        setLastSpinDate(data.lastSpinDate || "");
      }
    };

    fetchSpinData();
  }, [user]);

  const showAdBeforeSpin = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const confirmed = window.confirm("Watch an ad to unlock this spin?");
        resolve(confirmed);
      }, 300); // simulate delay
    });
  };

  const handleSpin = async () => {
    if (!user || spinCount >= 10) return;

    const allowed = await showAdBeforeSpin();
    if (!allowed) return;

    setSpinning(true);

    const chosen = pickWeightedReward();
    setReward(chosen);

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();

    const updateData = {
      spinCountToday: spinCount + 1,
      lastSpinDate: new Date().toDateString(),
    };

    if (chosen.type === "desicoins") {
      updateData.desicoins = (userData.desicoins || 0) + chosen.value;
    }

    if (chosen.type === "yellowTick") {
      updateData.tempYellowTick = Date.now() + 5 * 24 * 60 * 60 * 1000;
    }

    if (chosen.type === "dreamBadge") {
      updateData.tempDreamBadge = Date.now() + 5 * 24 * 60 * 60 * 1000;
    }

    if (chosen.type === "pinPost") {
      updateData.tempPinnedPost = {
        allowed: true,
        expires: Date.now() + 3 * 24 * 60 * 60 * 1000,
      };
    }

    await updateDoc(userRef, updateData);
    setSpinCount((prev) => prev + 1);
    setTimeout(() => setSpinning(false), 2000);
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-6">
      <div className="max-w-md mx-auto bg-white shadow rounded-xl p-6 text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">🎡 Lucky Spin</h2>
        <p className="text-gray-600 mb-2">Spin Daily and Win Exciting Rewards!</p>
        <p className="text-sm mb-4">
          🌀 Spins Left Today: <strong>{10 - spinCount}</strong>
        </p>

        <button
          onClick={handleSpin}
          disabled={spinCount >= 10 || spinning}
          className="px-6 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 disabled:opacity-50"
        >
          {spinning ? "Spinning..." : "Spin Now 🎯"}
        </button>

        {reward && (
          <div className="mt-6 p-4 border rounded bg-purple-50">
            <p className="font-semibold text-purple-700">🎁 You won:</p>
            <p className="text-lg font-bold mt-2">{reward.label}</p>
          </div>
        )}

        <div className="mt-8 text-sm text-gray-500">1 Ad = 1 Spin | Max 10 Spins/Day</div>
      </div>
    </div>
  );
};

export default LuckySpin;
