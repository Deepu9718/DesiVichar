import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-pink-200 p-6 text-center">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
        स्वागत है DesiVichar में!
      </h1>

      <p className="text-lg md:text-xl text-gray-800 max-w-2xl mb-6">
        Ek aisa platform jahan aap apne <strong>vichar, tasveerein, videos</strong> duniya se
        baant sakte hain. Fame aur respect yahan har likhne waale ka haq hai!
      </p>

      <p className="text-md md:text-lg italic text-gray-700 mb-10">
        "DesiVichar bana hai un logo ke liye, jinko duniya ne kabhi suna hi nahi —
        ab aapko sunne waale bhi milenge, aur izzat bhi."
        <br />
        — <strong>Founder: Deepanshu</strong>
      </p>

      <Link
        to="/register"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition duration-300 text-lg font-semibold flex items-center gap-2"
      >
        🚀 Join Now
      </Link>
    </div>
  );
}

export default Home;
