import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-red-100 p-6">
      <div className="bg-white p-6 rounded-xl shadow-md max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-red-600 mb-4">About DesiVichar</h1>

        <p className="mb-3">
          <strong>DesiVichar</strong> is not just a platform — it is a mission born from the dreams of unheard voices,
          unrecognized talents, and unsung creators. It is built for every person who ever thought, *"Mera likha hua
          vichar bhi kisi ko prerna de sakta hai."*
        </p>

        <p className="mb-3">
          In a world flooded with influencers and commercial content, DesiVichar stands as a proudly Indian platform
          dedicated to <strong>text creators, poets, motivational artists, daily thinkers </strong>
          who want to share *original* thoughts, earn respect, and gain popularity — all through *words* and *ideas*.
        </p>

        <p className="mb-3">
          What makes us different? While others reward trends, we reward originality. You can:
        </p>

        <ul className="list-disc list-inside pl-4 mb-4 text-gray-700">
          <li>🧠 Share your thoughts with images, or just pure text</li>
          <li>🏆 Earn <strong>DesiCoins</strong> by writing daily, inviting friends, and winning contests</li>
          <li>🎖️ Unlock <strong>Badges</strong> and even get a <strong>Verified Tick</strong></li>
          <li>🤝 Build friendships, follow profiles, and send private messages (friends only)</li>
          <li>📈 Be part of Monthly Challenges, Daily Vichars, and soon — Vichar Battles & Desi Pages</li>
        </ul>

        <p className="mb-3">
          <strong>DesiVichar</strong> believes in *Respect for Originality*. We are strictly against copied content.
          Only your real thoughts, your real creativity — will lead you to real growth.
        </p>

        <p className="mb-3">
          From badges to earnings, everything starts with your words. Because here, your *Vichar* is your *Power*.
        </p>

        <p className="font-semibold text-green-700 mt-6">
          DesiVichar is proudly presented by C & N Creations.  
          Inspired by dreams, powered by inspiration, and created with code.  
          Welcome to the future of Desi social media.
        </p>
        <p className="font-semibold text-red-1500 mt-6">
        Please visit only our official site https://cnncreations.blogspot.com/
        </p>
      </div>
    </div>
  );
};

export default About;
