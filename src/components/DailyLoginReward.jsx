import { useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import dayjs from "dayjs";

function DailyLoginReward() {
  const [user] = useAuthState(auth);

  useEffect(() => {
    const checkLoginReward = async () => {
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        const today = dayjs().format("YYYY-MM-DD");
        const lastLogin = data.lastLoginDate || "";
        let loginStreak = data.loginStreak || 0;
        let desicoins = data.desicoins || 0;

        if (lastLogin === today) return;

        const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");

        // Streak update
        if (lastLogin === yesterday) {
          loginStreak += 1;
        } else {
          loginStreak = 1;
        }

        desicoins += 5; // Base login reward

        // Bonus streak rewards
        if (loginStreak === 7) desicoins += 10;
        if (loginStreak === 14) desicoins += 25;
        if (loginStreak === 30) desicoins += 50;
        if (loginStreak === 60) desicoins += 120;
        if (loginStreak === 120) desicoins += 350;
        if (loginStreak === 350) desicoins += 1000;

        await updateDoc(userRef, {
          desicoins,
          loginStreak,
          lastLoginDate: today,
        });
      }
    };

    checkLoginReward();
  }, [user]);

  return null;
}

export default DailyLoginReward;