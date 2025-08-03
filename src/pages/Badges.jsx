import React from "react";

const badges = [
  {
    name: "👋 Welcome Badge",
    description: "Ye badge un users ko milta hai jinhone apne pehle 5 posts complete kiye hain. DesiVichar par apka swagat hai!",
    coins: 50,
  },
  {
    name: "📅 Regular Badge",
    description: "Aapko ye badge tab milega jab aap 20 posts kar chuke hon + 25 Likes + 10 Comments + 5 Shares.",
    coins: 100,
  },
  {
    name: "🌟 Dream Badge + Yellow Tick",
    description: "150 Followers + 100 Posts + 150 Likes + 30 Comments + 10 Shares par milta hai. Yellow Trishul Tick bhi milega!",
    coins: 250,
  },
  {
    name: "💎 Valuable Badge",
    description: "Ye badge milta hai jab aapke paas ho 500 Followers + 250 Posts + 50 Comments + 400 Likes + 50 Shares + 5 Invites.",
    coins: 400,
  },
  {
    name: "🎖️ Digital Badge",
    description: "10 Invites + 1000 Followers + 650 Posts + 1000 Likes + 100 Comments + 100 Shares ke baad milta hai. Yahan se earning ke options unlock hote hain!",
    coins: 600,
  },
  {
    name: "🎭 Desi Kalakaar Badge",
    description: "50 Invites + 5000 Followers + 1200 Posts + 2000 Likes + 250 Comments + 250 Shares. Yahan se top creator features + ads based earning unlock hoti hai.",
    coins: 1000,
  },
  {
    name: "🚀 Influencer Badge",
    description: "Aapne 100+ users ko invite kiya? Aap ban gaye Influencer! Sabhi naye features pehle aapko milenge. Earning bhi priority pe!",
    coins: 2500,
  },
];

const Badges = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-100 to-red-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-red-700 mb-6">🏅 DesiVichar Badges & Rewards</h1>

      <p className="text-center max-w-4xl mx-auto text-gray-800 text-lg mb-10">
        Har badge ek milestone hai jo aapke sapno, efforts aur consistency ko salute karta hai. Ye badges aapke profile pe dikhte hain
        aur aapko milta hai DesiCoin reward. Aap jitna contribute karenge, utna earn bhi karenge!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {badges.map((badge, index) => (
          <div key={index} className="bg-white p-4 shadow-lg rounded-xl border-l-4 border-red-500">
            <h2 className="text-xl font-semibold text-red-700 mb-1">{badge.name}</h2>
            <p className="text-gray-700 mb-2">{badge.description}</p>
            <p className="text-green-700 font-semibold">🎁 Reward: {badge.coins} DesiCoins</p>
          </div>
        ))}
      </div>

      <div className="mt-12 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-orange-800 mb-2">💰 DesiCoins = Real Paisa</h2>
        <p className="text-gray-800">
          DesiCoins aapke profile me add hote rahenge. Jab final value decide hogi, platform pe announcement kiya jaega.
          Top users ko milega payout — sirf fame hi nahi, paisa bhi!
        </p>
      </div>

      <div className="text-center mt-10 text-blue-600 font-medium">
        Aur puchhna ho? <a href="/faq" className="underline hover:text-blue-800">FAQ Dekhiye</a>
      </div>
    </div>
  );
};

export default Badges;
