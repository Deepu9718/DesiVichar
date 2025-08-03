import React from "react";

const roadmapData = [
  {
    version: "📍 Version 1 – DesiVichar Power Launch",
    status: "✅ Live Now (We are here)",
    color: "bg-green-100",
    features: [
      "User Registration (email)",
      "Login/Logout",
      "Upload Post (Text + Image)",
      "Home Page",
      "Trending Hashtags",
      "Badges + Yellow Tick Auto Distribution",
      "User Profile + Editable",
      "Manually allotment of Badges & Yellow Tick",
      "Follow/Unfollow + Follower List",
      "Submit Vichar Page",
      "Founder Message",
      "Original Content Warning",
      "Desi Feed (All Posts)",
      "Static Pages: About, Contact, Privacy etc."
    ],
  },
  {
    version: "🟦 Version 2 – Gamified Engagement Update (December 2025)",
    color: "bg-blue-100",
    features: [
      "Tag system (contacts + users)",
      "Invite leaderboard",
      "Quotes to images page",
      "Custom Profile Frame",
      "Featured Users / Popular Posts tab"
    ],
  },
  {
    version: "🟩 Version 3 – Creator Tools Update (April 29, 2026)",
    color: "bg-green-200",
    features: [
      "Desi Pages system (public + followers)",
      "Page Posts listing",
      "Page Explorer (category wise)",
      "My Stats (followers, views, post count)",
      "Profile Background + Status Line",
      "GIF support in posts",
      "🔥 Vichar Battle: Challenge-based competitions"
    ],
  },
  {
    version: "🟧 Version 4 – Social Boost + Messaging (August 2026)",
    color: "bg-orange-100",
    features: [
      "Friend request system (add/accept/decline)",
      "Direct Messaging (friends only)",
      "Notification system (follow, tag, react)",
      "Comment reply + nested comments",
    ],
  },
  {
    version: "🟪 Version 5 – Final Tools & Missed Items (December 2026)",
    color: "bg-purple-100",
    features: [
      "Registration via Mobile (email/mobile toggle)",
      "Anything missed from past versions",
      "Boost system basics",
    ],
  },
  {
    version: "🟥 Version 6 – Earning + Monetization (Holi 2027)",
    color: "bg-red-100",
    features: [
      "Coin → INR logic (admin controlled)",
      "Top 100 payout system",
      "Desicoins - Real Value will be revealed",
      "Brand Boost / Sponsored posts",
      "Weekly leaderboard",
      "Paid badges, page promotions"
    ],
  },
  {
    version: "🟨 Version 7 – Premium + Sponsorships (Diwali 2027)",
    color: "bg-yellow-100",
    features: [
      "Full App + Web Completion",
      "Contests for creators",
      "Premium features unlocked",
      "Sponsorship system for businesses",
      "Welcome new investors"
    ],
  },
];

const Roadmap = () => {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-yellow-50 to-pink-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-red-600 mb-8">🗺️ DesiVichar Roadmap</h1>
        {roadmapData.map((ver, idx) => (
          <div key={idx} className={`mb-6 p-4 rounded-xl shadow ${ver.color}`}>
            <h2 className="text-xl font-semibold text-purple-700 mb-2">{ver.version}</h2>
            {ver.status && (
              <p className="text-sm text-green-700 font-semibold mb-2">{ver.status}</p>
            )}
            <ul className="list-disc list-inside text-gray-800 space-y-1">
              {ver.features.map((feat, i) => (
                <li key={i}>✅ {feat}</li>
              ))}
            </ul>
          </div>
        ))}
        <p className="text-center mt-10 text-sm text-gray-600 italic">
          🚀 Ye roadmap sabhi users ke liye public hai — DesiVichar ka safar yahan se start hua hai.
        </p>
        <p className="text-center mt-10 text-sm text-gray-1000 bold">
          Or bhi bahut saare new features hum roadmap me update karte rahenge.
          We will update more exiting upcoming features in our roadmap. 
        </p>
        <p className="text-center mt-50 text-sm text-gray-2500 bold">
          Stay Tuned.
          </p>
      </div>
    </div>
  );
};

export default Roadmap;
