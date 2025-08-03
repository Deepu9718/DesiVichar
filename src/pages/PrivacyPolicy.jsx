import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-black to-gray-800 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-yellow-400 mb-10">
          🔒 Privacy Policy
        </h1>

        <p className="text-lg mb-6 leading-relaxed">
          DesiVichar aapki privacy ka poori tarah samman karta hai. Jab aap hamare platform ka upyog karte hain, hum kuch basic information collect karte hain jaise ki aapka naam, username, profile image, email, aur kabhi-kabhi aapka IP address.
        </p>

        <ul className="list-disc pl-6 space-y-4 mb-6">
          <li>
            Hum aapke data ka misuse nahi karte. Yeh data sirf platform ke experience ko behtar banane ke liye use hota hai.
          </li>
          <li>
            Kisi bhi user ka personal data kisi third-party ke sath bina permission ke share nahi kiya jaata.
          </li>
          <li>
            Hum aapko kabhi spam messages nahi bhejte. Sirf zaroori platform notifications ya reward info hi bheji jaati hai.
          </li>
          <li>
            Agar aap chahein to apna account delete ya data export ka request de sakte hain.
          </li>
        </ul>

        <p className="text-lg leading-relaxed mb-6">
          DesiVichar ek safe aur positive jagah hai jahan users apna content bina kisi dar ke upload kar sakein. Aapka trust hi hamara asli reward hai.
        </p>

        <p className="text-lg font-semibold mt-12 text-right">
          💖 Aapka privacy, hamari zimmedari.  
          <br />
          - Team DesiVichar
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
