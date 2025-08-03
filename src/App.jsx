import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import SubmitVichar from "./pages/SubmitVichar";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Badges from "./pages/Badges";
import FAQ from "./pages/FAQ";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DailyLoginReward from "./components/DailyLoginReward";
import Wallet from "./pages/Wallet";
import InvitePage from "./pages/InvitePage";
import SubmitDailyVichar from "./pages/SubmitDailyVichar";
import DailyVichar from "./pages/DailyVichar";
import SubmitDailyTopic from "./pages/SubmitDailyTopic";
import VicharBattle from "./pages/VicharBattle";
import FooterLinks from "./components/FooterLinks";
import BrandingFooter from "./components/BrandingFooter";
import About from "./pages/About";
import FoundersMessage from "./pages/FoundersMessage";
import Disclaimer from "./pages/Disclaimer";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ContactUs from "./pages/ContactUs";
import DMCA from "./pages/DMCA";
import Roadmap from "./pages/Roadmap";
import LuckySpin from "./pages/LuckySpin";
import { checkAndUpdateBadges } from "./utils/badgeLogic";
import { initializeUserFieldsIfMissing } from "./utils/initUserFields";
import SocialIcons from "./components/SocialIcons";


function App() {

  const [user] = useAuthState(auth);  // ✅ Yeh yahan hona chahiye

  useEffect(() => {
  const initialize = async () => {
    if (user) {
      await initializeUserFieldsIfMissing(user.uid);   // ✅ Step 1: Add missing fields
      await checkAndUpdateBadges(user.uid);            // ✅ Step 2: Update badges
    }
  };
  initialize();
}, [user]);

  return (
    <>
      {/* ✅ Navbar will always be visible */}
      <Navbar />
      <DailyLoginReward />
      <SocialIcons />
      <Routes>
        {/* 🔴 Logged out routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🟢 Logged in routes */}
        <Route path="/feed" element={<Feed />} />
        <Route path="/submitvichar" element={<SubmitVichar />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/badges" element={<Badges />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/invitepage" element={<InvitePage />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/submit-daily-vichar" element={<SubmitDailyVichar />} />
        <Route path="/daily-vichar" element={<DailyVichar />} />
        <Route path="/submit-topic" element={<SubmitDailyTopic />} />
        <Route path="/vicharbattle" element={<VicharBattle />} />
        <Route path="/about" element={<About />} />
        <Route path="/founder-message" element={<FoundersMessage />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/dmca" element={<DMCA />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/lucky-spin" element={<LuckySpin />} />

        </Routes>
  
       {/* ✅ Add Both Footers */}
       <FooterLinks />
       <BrandingFooter />
       </>
  );
}

export default App;
