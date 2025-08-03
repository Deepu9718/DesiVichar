import React from "react";
import { Link } from "react-router-dom";

const FAQ = () => {
  const faqs = [
    {
      question: "1. DesiVichar kya hai aur ye itna alag kyun hai?",
      answer:
        "DesiVichar ek aisa platform hai jo un logon ke liye banaya gaya hai jinke paas talent hai lekin platform nahi. Yahan aap text, image, ya video ke zariye apne vichar share kar sakte hain. Ye platform earning + popularity dono ka combo deta hai. Har user ko yahan pe full freedom milti hai — bina kisi limitation ke. Yeh ek sapne ko haqeeqat me badalne wala social space hai.",
    },
    {
      question: "2. DesiCoins kya hai aur inka kya use hai?",
      answer:
        "DesiCoins ek virtual currency hai jo platform pe reward ke roop me milti hai — jaise invite karne, daily login, badge earn karne, ya Vichar Battle jeetne par. Future me DesiCoins ko real money me convert karne ka system bhi laaya jaega. Jaise hi final value fix hoti hai (₹1 = ? coins), platform pe public announcement hoga. Tab tak ye leaderboard, badge aur reward purposes ke liye use hongi.",
    },
    {
      question: "3. Yellow Tick kya hai aur kaun paata hai?",
      answer:
        "Yellow Tick ek verified user badge hai. Ye manually admin dwara diya jaata hai un users ko jo ya to pehle 10 verified hain ya jinhe platform pe extraordinary engagement ya contribution mila hai. Isse ek trusted aur popular user ka status milta hai. Red Tick system ko ab hata diya gaya hai. Sirf Yellow Tick hi final verified badge hoga DesiVichar pe.",
    },
    {
      question: "4. Daily Vichar kya hota hai aur uska topic kaun deta hai?",
      answer:
        "Daily Vichar ek special section hai jisme har din ek naya topic diya jaata hai. Sirf usi topic par likhe gaye vichar is section me allow hote hain. Topic admin manually set karta hai. Har din 3 best vicharon ko select kiya jaata hai aur unhe DesiCoins reward milta hai. Yeh platform ka unique reward system hai jahan talent ko daily recognize kiya jaata hai.",
    },
    {
      question: "5. Vichar Battle kya hai aur kaise participate karein?",
      answer:
        "Vichar Battle ek exciting contest hai jisme 2 users ke vicharon ka mukabla hota hai ek topic par. Platform ya admin ek battle start karta hai, aur users vote karte hain. Jis user ka vichar zyada votes le, usse 50 DesiCoins ka reward milta hai. Ye ek entertainment + talent platform ka powerful combination hai. Yeh feature V2 me aayega (coming soon).",
    },
    {
      question: "6. Friends aur Followers ka system alag kaise hai?",
      answer:
        "DesiVichar me aap kisi ko follow kar sakte hain, lekin agar aap message bhejna chahte hain to aap dono ko friend hona padega. Aap friend request bhej sakte hain, accept/decline kar sakte hain. Friends ke beech hi private messages possible hain. Yeh safety + privacy dono ko dhyan me rakh kar banaya gaya system hai.",
    },
    {
      question: "7. Main apna Vichar kaise submit kar sakta hoon?",
      answer:
        "Aap 'Submit Your Vichar' ya 'Submit Daily Vichar' section me jaakar apna text likh sakte hain. Aap image bhi add kar sakte hain (optional). Har vichar ka ek timestamp hota hai aur wo aapke profile me bhi show hota hai. Platform automatically us vichar ko Desi Feed me daal deta hai sab logon ke liye.",
    },
    {
      question: "8. Invite karne ka kya benefit milta hai?",
      answer:
        "Aap jitne logon ko DesiVichar pe invite karte hain, har successful registration par aapko 50 DesiCoins milte hain. Yahi nahi, agar wo user badges earn karta hai ya platform pe active rehta hai to aapke coins aur badges bhi boost hote hain. Invite-to-Earn system yahan ka ek major reward system hai.",
    },
    {
      question: "9. Lucky Spin kya hai aur wo kab use kar sakte hain?",
      answer:
        "Lucky Spin ek fun-based reward system hai jisme har user har 24 hours me 10 baar participate kar sakta hai. Isme aapko randomly 10, 20, 50 ya 100 DesiCoins mil sakte hain. Kabhi-kabhi 'Bonus Badge' bhi mil sakta hai. Lucky Spin sirf logged-in users ke liye available hai aur ye automatically timer reset karta hai.",
    },
    {
      question: "10. Badges ka kya role hai?",
      answer:
        "Badges ek user ke performance, participation aur achievement ko dikhate hain. Har badge aapko extra DesiCoins reward deta hai. Jaise Invite Badge, Daily Login Badge, Post Upload Badge, Engagement Badge etc. Jaise-jaise aap platform pe grow karte ho, badges bhi unlock hote hain. Har badge ek distinct icon aur coin value ke sath aata hai.",
    },
    {
      question: "11. Mera profile kaise verify hoga (Yellow Tick ke liye)?",
      answer:
        "Aapka profile tab verify hoga jab aap consistent engagement dikhate ho — jaise achhi posts, invite karna, badges earn karna aur DesiVichar me active hona. Initial 10 users manually verified honge. Baad me ek request system bhi aayega jisme aap apply kar sakte hain verification ke liye.",
    },
    {
      question: "12. Agar mujhe koi issue ho to main kahan contact karun?",
      answer:
        "Agar aapko koi issue, bug, ya suggestion dena ho to aap humein 'Contact Us' page ke zariye message bhej sakte hain. Aapka response seedha team tak jaega. Hum 24-48 hours ke andar reply karte hain. Aapka har feedback humein aur behtar banata hai.",
    },
  ];

  return (
    <div className="min-h-screen bg-yellow-50 py-10 px-6">
      <h1 className="text-3xl text-center font-bold text-red-700 mb-8">❓ Frequently Asked Questions (FAQ)</h1>
      <div className="max-w-4xl mx-auto space-y-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white shadow-md p-4 rounded-xl border-l-4 border-yellow-500">
            <h2 className="font-semibold text-lg text-red-600">{faq.question}</h2>
            <p className="text-gray-700 mt-2 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-10 text-blue-600 font-medium">
        Aur bhi kuch puchhna ho? <Link to="/contact-us" className="underline hover:text-blue-800">Click Here</Link>
      </div>
    </div>
  );
};

export default FAQ;
