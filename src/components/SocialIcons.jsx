import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaPinterestP,
  FaRedditAlien,
  FaInstagram,
  FaDiscord,
  FaWhatsapp,
  FaTelegramPlane,
  FaSnapchatGhost,
  } from "react-icons/fa";

const socialLinks = [
  { icon: <FaFacebookF />, url: "https://www.facebook.com/cnncreations", label: "Facebook" },
  { icon: <FaTwitter />, url: "https://twitter.com/cnncreations", label: "Twitter" },
  { icon: <FaYoutube />, url: "https://youtube.com/@cnncreations", label: "YouTube" },
  { icon: <FaPinterestP />, url: "https://pinterest.com/cnncreations", label: "Pinterest" },
  { icon: <FaRedditAlien />, url: "https://reddit.comuser/ShortImagination9212", label: "Reddit" },
  { icon: <FaInstagram />, url: "https://instagram.com/cnncreations", label: "Instagram" },
  { icon: <FaDiscord />, url: "https://discord.gg/xc985xTd", label: "Discord" },
  { icon: <FaWhatsapp />, url: "https://chat.whatsapp.com/DJbW2994MtP0I5BwUst6pj?mode=ac_t", label: "WhatsApp" },
  { icon: <FaTelegramPlane />, url: "https://t.me/+z-JcfL1zDdVhNmFl", label: "Telegram Group" },
  { icon: <FaTelegramPlane />, url: "https://t.me/cnncreations", label: "Telegram Channel" },
  { icon: <FaSnapchatGhost />, url: "https://snapchat.com/add/cnncreations", label: "Snapchat" },
  ];

const SocialIcons = () => {
  return (
    <div className="fixed top- right- z-50 flex flex-wrap gap-3 bg-white/80 px-4 py-2 rounded-xl shadow-lg">
      {socialLinks.map((link, i) => (
        <a
          key={i}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl text-gray-700 hover:text-red-600"
          title={link.label}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;