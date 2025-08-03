import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const InvitePage = () => {
  const { currentUser } = useAuth();
  const [inviteCode, setInviteCode] = useState("");
  const [invitesCount, setInvitesCount] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchCode = async () => {
      if (!currentUser) return;

      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        const code = data.username || currentUser.uid.slice(0, 8); // prefer username
        setInviteCode(code);
        setInvitesCount(data.invites || 0); // ✅ get invites count
      }
    };

    fetchCode();
  }, [currentUser]);

  const inviteLink = `${window.location.origin}/register?ref=${inviteCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded-xl border border-yellow-300 mt-6">
      <h2 className="text-xl font-bold mb-4 text-red-600">🎁 Invite & Earn</h2>

      <p className="text-sm text-gray-700 mb-2">
        ✅ <strong>Total Invites:</strong> {invitesCount}
      </p>

      <p className="mb-3 text-sm text-gray-600">
        Invite friends to DesiVichar and earn <b>50 DesiCoins</b> per user!
      </p>

      <div className="bg-gray-100 p-4 rounded border">
        <p className="text-sm mb-2 text-gray-700 font-medium">Your Invite Link:</p>
        <input
          className="w-full p-2 border rounded text-sm bg-white"
          readOnly
          value={inviteLink}
        />
        <button
          onClick={copyToClipboard}
          className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded font-semibold"
        >
          {copied ? "✅ Copied!" : "📋 Copy Invite Link"}
        </button>
      </div>
    </div>
  );
};

export default InvitePage;