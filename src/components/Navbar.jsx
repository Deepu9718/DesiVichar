import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function Navbar() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/"); // Redirect to Home after logout
  };

  return (
    <nav className="bg-white shadow p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-red-600">DesiVichar</Link>
        <div className="flex flex-wrap gap-4 text-sm sm:text-base">
          {!user ? (
            <>
              <Link to="/" className="hover:text-red-600">Home</Link>
              <Link to="/login" className="hover:text-red-600">Login</Link>
              <Link to="/register" className="hover:text-red-600">Register</Link>
            </>
          ) : (
            <>
              <Link to="/feed" className="hover:text-red-600 hover:underline">Feed</Link>
              <Link to="/submitvichar" className="hover:text-red-600">Submit Vichar</Link>
              <Link to="/submit-daily-vichar" className="hover:text-red-600">Daily Theme</Link>
              <Link to="/daily-vichar" className="hover:text-red-600 hover:underline">Theme Vichar</Link>
              <Link to="/vicharbattle" className="hover:text-red-600 hover:underline">🆚 Vichar Battle</Link>
              <Link to={`/profile/${user.uid}`} className="hover:text-red-600">Profile</Link>
              <li>
              <Link to="/invitepage" className="hover:text-red-600 hover:underline">Invite & Earn</Link>
              <Link to="/lucky-spin" className="text-sm hover:text-yellow-600">🎡 Lucky Spin</Link>
              </li>
              {user && (
              <Link to="/wallet" className="text-yellow-600 font-semibold hover:underline">
              💰 Wallet
              </Link>
              )}
              <button
                onClick={handleLogout}
                className="hover:text-red-600 text-left"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;