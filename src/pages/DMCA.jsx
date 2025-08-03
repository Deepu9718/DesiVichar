import React from "react";

const DMCA = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-yellow-400">DMCA Policy</h1>
        <p className="text-lg">
          DesiVichar respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act (DMCA), we will respond promptly to claims of copyright infringement on our platform.
        </p>

        <h2 className="text-2xl font-semibold text-red-400">1. Filing a DMCA Takedown Notice</h2>
        <p>
          If you believe that your copyrighted work has been used in a way that constitutes copyright infringement, please provide us with the following:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Your full name and contact information (email, phone, address).</li>
          <li>A clear description of the copyrighted work you believe has been infringed.</li>
          <li>The URL or location where the infringing content appears on DesiVichar.</li>
          <li>A statement that you have a good faith belief that the use is unauthorized.</li>
          <li>A statement, under penalty of perjury, that the information in your notice is accurate.</li>
          <li>Your electronic or physical signature.</li>
        </ul>
        <p className="mt-4">
          Send your complaint to:{" "}
          <span className="font-semibold text-yellow-300">
            deepu97181992@gmail.com
          </span>
        </p>

        <h2 className="text-2xl font-semibold text-red-400">2. Counter-Notification</h2>
        <p>
          If you believe your content was removed in error, you may submit a counter-notification including:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Your contact information (email, phone, address).</li>
          <li>Identification of the content that was removed.</li>
          <li>A statement under penalty of perjury that you believe the removal was in error.</li>
          <li>Consent to the jurisdiction of Indian courts.</li>
          <li>Your electronic or physical signature.</li>
        </ul>
        <p className="mt-4">
          Send counter-notice to:{" "}
          <span className="font-semibold text-yellow-300">
            deepu97181992@gmail.com
          </span>
        </p>

        <h2 className="text-2xl font-semibold text-red-400">3. Repeat Infringers</h2>
        <p>
          We reserve the right to terminate accounts of users who are repeat copyright infringers.
        </p>
      </div>
    </div>
  );
};

export default DMCA;
