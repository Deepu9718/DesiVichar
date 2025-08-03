import React from "react";

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-yellow-400 mb-10">
          ⚠️ Disclaimer
        </h1>

        <p className="text-lg leading-relaxed mb-6">
          DesiVichar ek open platform hai jahan users apne vichar, quotes, stories, aur images share karte hain. Hum har user ko apne content ka malik maante hain. Is platform par upload kiya gaya har content sirf aur sirf us user ki responsibility hoti hai.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          DesiVichar team har content ka manual review nahi karti, isliye agar kisi bhi post se aapko apatti ho ya copyright violation ka issue ho, to aap hume turant contact karein. Hum jaise hi issue verify karenge, us content ko turant hata denge.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          Is platform par diye gaye kisi bhi suggestion, vichar ya post ko aap apni soch aur discretion se follow karein. DesiVichar kisi bhi tarah se kisi user ke action ke liye zimmedar nahi hoga.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          Hum apne users se bhi ummeed rakhte hain ki ve original content hi upload karein. Kisi bhi copied ya non-original content ko platform se turant hata diya jaayega, aur agar zarurat padi to user account bhi suspend kiya ja sakta hai.
        </p>

        <p className="text-lg font-semibold mt-12 text-right">
          🤝 Thank you for being a responsible part of DesiVichar community.
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;
