import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-yellow-100 to-pink-100 text-center p-6">
      <div className="bg-red-500 text-white p-6 rounded-xl shadow-md max-w-xl w-full">
        <h1 className="text-3xl font-bold mb-4 flex justify-center items-center">
          <Rocket className="w-8 h-8 mr-2" /> Join Now
        </h1>
        <p className="text-lg mb-4">Apna asli content share karo aur kamao respect & popularity!</p>
        <Link to="/register" className="inline-block bg-white text-red-500 font-bold py-2 px-6 rounded-full shadow hover:bg-red-100 transition">
          Start Your Journey 🚀
        </Link>
      </div>
    </div>
  );
}
