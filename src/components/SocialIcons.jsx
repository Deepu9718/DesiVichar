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
  FaLinkedinIn,
  FaTelegramPlane,
  FaSnapchatGhost,
  } from "react-icons/fa";

const socialLinks = [
  { icon: <FaFacebookF />, url: "https://facebook.com", label: "Facebook" },
  { icon: <FaTwitter />, url: "https://twitter.com", label: "Twitter" },
  { icon: <FaYoutube />, url: "https://youtube.com", label: "YouTube" },
  { icon: <FaPinterestP />, url: "https://pinterest.com", label: "Pinterest" },
  { icon: <FaRedditAlien />, url: "https://reddit.com", label: "Reddit" },
  { icon: <FaInstagram />, url: "https://instagram.com", label: "Instagram" },
  { icon: <FaDiscord />, url: "https://discord.com", label: "Discord" },
  { icon: <FaWhatsapp />, url: "https://wa.me", label: "WhatsApp" },
  { icon: <FaLinkedinIn />, url: "https://linkedin.com", label: "LinkedIn" },
  { icon: <FaTelegramPlane />, url: "https://t.me/yourgroup", label: "Telegram Group" },
  { icon: <FaTelegramPlane />, url: "https://t.me/yourchannel", label: "Telegram Channel" },
  { icon: <FaSnapchatGhost />, url: "https://snapchat.com", label: "Snapchat" },
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