import React, { useEffect, useState } from "react";

const ComingSoon = () => {
  const launchTime = new Date().getTime() + 30 * 60 * 60 * 1000; // 30 hours

  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchTime - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-red-200 text-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-red-600 mb-6">🚀 DesiVichar is Coming Soon!</h1>
      <p className="text-lg md:text-xl text-gray-700 mb-8">
        Platform launching in just a few hours. Get ready to express your thoughts like never before.
      </p>

      <div className="text-3xl font-bold text-red-800 mb-8">
        ⏳ {timeLeft.hours.toString().padStart(2, '0')}:
        {timeLeft.minutes.toString().padStart(2, '0')}:
        {timeLeft.seconds.toString().padStart(2, '0')}
      </div>

      <p className="text-sm text-gray-600 mb-8">Time remaining (HH:MM:SS)</p>

      <SocialIcons />

      <footer className="mt-12 text-gray-500 text-sm">
        © {new Date().getFullYear()} DesiVichar. All rights reserved © copyright reserved by C & N Creations 2025 - 2026.
      </footer>
    </div>
  );
};

export default ComingSoon;