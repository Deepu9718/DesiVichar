import React from "react";

const VicharBattle = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-100 to-green-100 p-6">
      <div className="bg-white shadow-xl rounded-xl max-w-3xl mx-auto p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-red-600 mb-4">
          🆚 Vichar Battle - Desi Dilon Ki Jung!
        </h1>

        <p className="text-gray-700 mb-4">
          Vichar Battle ek anokha feature hai jahan do likhne wale users ek hi topic pe apne vichar post karenge — aur public karegi decide kaun jeetega ye "Vichar Ki Jung".
        </p>

        <h2 className="text-xl font-semibold text-green-700 mb-2">⚔️ Battle Kaise Hogi?</h2>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
          <li>Har battle me 2 users compete karenge ek hi vishay par.</li>
          <li>Public karegi vote – kiska vichar zyada prabhavshali hai.</li>
          <li>Har user sirf ek baar vote de sakta hai.</li>
          <li>Voting window: 24 hours.</li>
        </ul>

        <h2 className="text-xl font-semibold text-green-700 mb-2">🏆 Reward Kya Milega?</h2>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
          <li>Battle jeetne wale ko milenge <strong>50 DesiCoins</strong>.</li>
          <li>Mahine ke Top 5 Battle Winners ka naam hoga homepage par!</li>
        </ul>

        <div className="bg-yellow-100 text-yellow-900 border-l-4 border-yellow-500 p-4 rounded mb-4">
          <strong>📢 Coming Soon:</strong> Ye feature next update me live hoga. Apne vichar taiyaar rakhna, kyunki jung hone wali hai zabardast!
        </div>

        <p className="text-center text-sm text-gray-600">
          💡 DesiVichar — Har likhne wale ko milti hai respect, reward aur recognition.
        </p>
      </div>
    </div>
  );
};

export default VicharBattle;
