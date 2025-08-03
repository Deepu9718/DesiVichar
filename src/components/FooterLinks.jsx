import React from "react";
import { Link } from "react-router-dom";

const FooterLinks = () => {
  return (
    <div className="bg-gray-200 text-center text-sm py-3 shadow-inner">
      <div className="flex flex-wrap justify-center gap-4">
        <Link to="/about" className="hover:underline">About Us</Link>
        <Link to="/contact" className="hover:underline">Contact Us</Link>
        <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
        <Link to="/disclaimer" className="hover:underline">Disclaimer</Link>
        <Link to="/terms" className="hover:underline">Terms of Use</Link>
        <Link to="/dmca" className="hover:underline">DMCA</Link>
        <Link to="/badges" classname="hover:underline">Badges & Rewards</Link>
        <Link to="/founder-message" className="hover:text-red-500">Founder's Message</Link>
        <Link to="/faq" className="hover:underline">FAQ</Link>
        <Link to="/roadmap" className="hover:underline">Roadmap</Link>
      </div>
    </div>
  );
};

export default FooterLinks;
