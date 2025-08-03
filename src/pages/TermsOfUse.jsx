import React from "react";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-black to-gray-900 text-white py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-green-400 mb-10">
          📜 Terms of Use
        </h1>

        <p className="text-lg leading-relaxed mb-6">
          DesiVichar ek open digital platform hai jo users ko apna original content share karne ka mauka deta hai. Platform ka istemal karte hue, aap yeh maan rahe hain ki aap hamare terms se sehmat hain.
        </p>

        <ul className="list-disc pl-6 space-y-4 mb-6">
          <li>
            Aap sirf wahi content post karenge jo aapne khud likha ya banaya ho. Copied content allowed nahi hai.
          </li>
          <li>
            Kisi bhi tarah ka hate speech, offensive language, ya religion/caste based content platform par ban hai.
          </li>
          <li>
            Aap apne login credentials ko kisi ke sath share nahi karenge. Account security ki zimmedari aapki hai.
          </li>
          <li>
            Agar koi user galat ya fake content upload karta hai, to platform uska account suspend karne ka haq rakhta hai.
          </li>
          <li>
            DesiVichar apne features aur policies ko kabhi bhi update kar sakta hai. Updated terms site pe notify kiye jaayenge.
          </li>
        </ul>

        <p className="text-lg leading-relaxed mb-6">
          Aap hamare platform ka use kisi bhi illegal purpose ke liye nahi kar sakte. Platform ka misuse legal action tak le jaa sakta hai.
        </p>

        <p className="text-lg font-semibold mt-12 text-right">
          🙏 Dhanyawaad DesiVichar ka upyog karne ke liye.
        </p>
      </div>
    </div>
  );
};

export default TermsOfUse;
