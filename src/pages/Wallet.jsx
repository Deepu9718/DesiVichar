import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";
import { checkAndUpdateBadges } from "../utils/badgeLogic";

function Wallet() {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [desicoins, setDesicoins] = useState(0);
  const [loginStreak, setLoginStreak] = useState(0);
  const [badge, setBadge] = useState("None");

  useEffect(() => {
    const fetchWallet = async () => {
      if (!user) return;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        setDesicoins(data.desicoins || 0);
        setLoginStreak(data.loginStreak || 0);
        setBadge(data.badges || "None");
      }
    };
    fetchWallet();
  }, [user]);

  return (
    <div
      className="min-h-screen p-6 text-white"
      style={{
        background: "linear-gradient(to bottom right, orange, white, green)",
      }}
    >
      <div className="max-w-xl mx-auto bg-white text-black rounded-2xl p-6 shadow-xl border-4 border-yellow-400">
        <h1 className="text-2xl font-bold mb-4 text-center text-red-600">
          🪙 Your DesiVichar Wallet
        </h1>

        <div className="text-lg font-semibold space-y-2">
          <p>
            🔸 <span className="text-gray-700">DesiCoins:</span>{" "}
            <span className="text-green-600 font-bold">{desicoins}</span>
          </p>
          <p>
            💰 <span className="text-gray-700">Real Money:</span>{" "}
            <span className="text-gray-500">Unlocks at Badge 5 ({badge})</span>
          </p>
          <p>
            🔥 <span className="text-gray-700">Login Streak:</span>{" "}
            <span className="text-orange-600 font-bold">{loginStreak} days</span>
          </p>
        </div>

        <div className="mt-6 bg-yellow-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed">
  <h2 className="text-lg font-bold text-blue-600 mb-2">📜 How to Earn DesiCoins?</h2>
  <ul className="list-disc list-inside space-y-1">
    <li>📝 Daily Login = +5 DesiCoins</li>
    <li>🔥 7-day streak = +10 Bonus</li>
    <li>🔥 14-day streak = +25 Bonus</li>
    <li>🔥 30-day streak = +50 Bonus</li>
    <li>🔥 60-day streak = +120 Bonus</li>
    <li>🔥 120-day streak = +350 Bonus</li>
    <li>🔥 350-day streak = +1000 Bonus</li>
    <li>✍️ Every Post = +5 DesiCoins</li>
    <li>✍️ Every Comments/ Reactions/ Share = +1 DesiCoins for each</li>
    <li>🏆 Badge Achievement = Bonus Coins</li>
    <li>🎁 Lucky Spin = Win Coins + More</li>
  </ul>

  <p className="mt-4 text-blue-700 font-semibold">
    📢 <span className="text-red-500">DesiCoins</span> hi asli power hain!
    Aapke likhe har Vichaar ka, har Post ka, har Roz ka Login...  
    sab kuch banega aapka 🏆 Digital Future!
  </p>

  <p className="mt-2 text-green-700">
    🧠 Red Tick & Badges se milti hai izzat,  
    lekin <strong>DesiCoins</strong> se milega asli reward 💸
  </p>

  <p className="mt-2 text-purple-700 italic">
    💥 Aage chal kar ye DesiCoins banenge aapki earning ka raasta...
  </p>
</div>

        <div className="mt-6 bg-blue-50 rounded-xl p-4 text-sm text-gray-700">
  <h2 className="text-lg font-bold text-purple-700 mb-2">🏆 Badges & Rewards</h2>
  <ul className="list-disc list-inside space-y-1">
    <li>🎉 <strong>Welcome Badge</strong> = After 5 posts (+20 DesiCoins)</li>
    <li>💬 <strong>Regular Badge</strong> = 20 Posts + 25 Likes... (+50 DesiCoins)</li>
    <li>🌠 <strong>Dream Badge</strong> = 100 Posts + 150 Likes... (+100 DesiCoins + 🔱 Red Tick)</li>
    <li>🧠 <strong>Valuable Badge</strong> = 250 Posts + 500 Followers... (+200 DesiCoins)</li>
    <li>💻 <strong>Digital Badge</strong> = 650 Posts + 1000 Likes... (+500 DesiCoins + Earnings Start)</li>
    <li>🎭 <strong>Desi Kalakaar</strong> = 1200 Posts + 5000 Followers... (+1000 DesiCoins)</li>
    <li>🚀 <strong>Influencer</strong> = Invite 100+ Users = (+2500 Coins + All Access)</li>
  </ul>

  <p className="mt-4 text-purple-700 font-semibold">
    🔐 Badge ke sath milte hain Special Rewards, aur <span className="text-red-600 font-bold">DesiCoins</span>!
  </p>
</div>
      </div>
    </div>
  );
}

export default Wallet;