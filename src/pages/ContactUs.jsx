import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const form = useRef();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_9e0iezd",  // 🔁 Replace with your EmailJS service ID
        "template_0quhbwb", // 🔁 Replace with your EmailJS template ID
        form.current,
        "BS3ykBrwFq7hUApub"  // 🔁 Replace with your EmailJS public key
      )
      .then(
        () => {
          setSent(true);
          setLoading(false);
          form.current.reset();
        },
        (error) => {
          console.error("FAILED...", error);
          setLoading(false);
          alert("Message bhejne me problem aayi, please dobara try karein.");
        }
      );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 text-center mb-6">
          📩 Contact Us
        </h1>

        <p className="text-lg text-center mb-8">
          Agar aapko koi issue hai ya aap hume apna feedback dena chahte hain, toh neeche form bhar ke bhejein.
        </p>

        <form ref={form} onSubmit={sendEmail} className="space-y-6">
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
            className="w-full p-3 rounded bg-gray-800 border border-gray-600"
          />
          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
            className="w-full p-3 rounded bg-gray-800 border border-gray-600"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            required
            rows="5"
            className="w-full p-3 rounded bg-gray-800 border border-gray-600"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {sent && (
          <p className="text-green-400 text-center mt-6">
            ✅ Message bhej diya gaya hai. Jaldi hi reply diya jaega!
          </p>
        )}
      </div>
    </div>
  );
};

export default ContactUs;
