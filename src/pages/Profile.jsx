import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { followUser, unfollowUser } from "../utils/userActions";

function Profile() {
  const { id: userId } = useParams();
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [relationship, setRelationship] = useState({ isFollowing: false });
  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const isOwnProfile = user?.uid === userId;

  const fetchRelationship = (data) => {
    const uid = user?.uid;
    setRelationship({
      isFollowing: data.followers?.includes(uid),
    });
  };

  const getBadgeSymbol = (badges) => {
    switch (badges) {
      case "Badge 1": return "👋 Welcome";
      case "Badge 2": return "📅 Regular";
      case "Badge 3": return "🌟 Dream";
      case "Badge 4": return "💎 Valuable";
      case "Badge 5": return "🎖️ Digital";
      case "Badge 6": return "🎭 Desi Kalakaar";
      case "Influencer": return "🚀 Influencer";
      default: return "🥉 No Badge";
    }
  };

  const fetchUserAndPosts = async () => {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = userSnap.data();
      setUserData(data);
      fetchRelationship(data);

      // Followers List
      const validFollowers = (data.followers || []).filter(Boolean);
      const followersData = await Promise.all(
        validFollowers.map(async (uid) => {
          try {
            const snap = await getDoc(doc(db, "users", uid));
            return { id: uid, ...snap.data() };
          } catch {
            return null;
          }
        })
      );
      setFollowersList(followersData.filter(Boolean));

      // Following List
      const validFollowing = (data.following || []).filter(Boolean);
      const followingData = await Promise.all(
        validFollowing.map(async (uid) => {
          try {
            const snap = await getDoc(doc(db, "users", uid));
            return { id: uid, ...snap.data() };
          } catch {
            return null;
          }
        })
      );
      setFollowingList(followingData.filter(Boolean));
    }

    // Fetch Posts
    const postsRef = collection(db, "posts");
    const q = query(postsRef, where("userId", "==", userId));
    const querySnap = await getDocs(q);
    const posts = querySnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUserPosts(posts.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)));
  };

  useEffect(() => {
    if (userId) fetchUserAndPosts();
  }, [userId, user]);

  const handleAction = async (action) => {
    if (!user?.uid || !userId) return;
    if (action === "follow") await followUser(user.uid, userId);
    if (action === "unfollow") await unfollowUser(user.uid, userId);

    await fetchUserAndPosts(); // refresh everything
  };

  if (!userData) return <div className="text-center mt-10">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-red-100">
      <div className="max-w-3xl mx-auto mt-10 p-4">
        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow p-4 mb-6 text-center">
          <img
            src={userData.profilePic || "/default-profile.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full mx-auto border mb-2"
          />
          <h2 className="text-xl font-bold text-red-600 flex items-center justify-center gap-2">
            {userData.fullName || "No Name"}
            {userData.yellowTick && <span className="animate-pulse">🔱</span>}
          </h2>
          <p className="text-sm text-gray-600">@{userData.username}</p>
          <p className="text-sm text-gray-500">{userData.email}</p>
          {userData.gender && <p className="text-sm text-gray-500 capitalize">Gender: {userData.gender}</p>}
          {userData.dob && <p className="text-sm text-gray-500">🎂 D.O.B: {userData.dob}</p>}
          {userData.unlockedBadges && <p className="text-sm text-blue-700 mt-2">🎖️ {getBadgeSymbol(userData.unlockedBadges)}</p>}

          {/* Follow Counts */}
          <div className="mt-2">
            <p>👥 Followers: {userData.followers?.length || 0}</p>
            <p>➡️ Following: {userData.following?.length || 0}</p>
          </div>

          {/* Follow/Unfollow Button */}
          {!isOwnProfile ? (
            <div className="flex justify-center gap-3 mt-4">
              {relationship.isFollowing ? (
                <button onClick={() => handleAction("unfollow")} className="bg-red-500 text-white px-4 py-2 rounded">
                  Unfollow
                </button>
              ) : (
                <button onClick={() => handleAction("follow")} className="bg-green-500 text-white px-4 py-2 rounded">
                  Follow
                </button>
              )}
            </div>
          ) : (
            <Link to="/edit-profile">
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Edit Profile</button>
            </Link>
          )}

          {/* Followers & Following List View */}
          {isOwnProfile && (
            <div className="mt-3 text-sm space-x-4">
              <button onClick={() => setShowFollowers(true)} className="text-blue-600 underline">View Followers</button>
              <button onClick={() => setShowFollowing(true)} className="text-purple-600 underline">View Following</button>
            </div>
          )}
        </div>

        {/* Followers List Modal */}
        {showFollowers && (
          <div className="bg-white p-4 rounded shadow mb-4">
            <h3 className="font-semibold text-blue-700 mb-2">Followers</h3>
            {followersList.length === 0 ? (
              <p className="text-sm text-gray-500">No followers yet.</p>
            ) : (
              <ul className="space-y-2">
                {followersList.map((f) => (
                  <li key={f.id} className="flex items-center gap-3">
                    <img src={f.profilePic || "/default-profile.png"} className="w-8 h-8 rounded-full" alt="" />
                    <span>{f.fullName || f.username}</span>
                  </li>
                ))}
              </ul>
            )}
            <button onClick={() => setShowFollowers(false)} className="text-sm text-red-500 underline mt-2">Close</button>
          </div>
        )}

        {/* Following List Modal */}
        {showFollowing && (
          <div className="bg-white p-4 rounded shadow mb-4">
            <h3 className="font-semibold text-purple-700 mb-2">Following</h3>
            {followingList.length === 0 ? (
              <p className="text-sm text-gray-500">Not following anyone.</p>
            ) : (
              <ul className="space-y-2">
                {followingList.map((f) => (
                  <li key={f.id} className="flex items-center gap-3">
                    <img src={f.profilePic || "/default-profile.png"} className="w-8 h-8 rounded-full" alt="" />
                    <span>{f.fullName || f.username}</span>
                  </li>
                ))}
              </ul>
            )}
            <button onClick={() => setShowFollowing(false)} className="text-sm text-red-500 underline mt-2">Close</button>
          </div>
        )}

        {/* Posts Section */}
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-lg font-bold mb-4 text-red-600">User Posts</h3>
          {userPosts.length === 0 ? (
            <p className="text-gray-500 text-center">No posts yet.</p>
          ) : (
            <div className="space-y-4">
              {userPosts.map((post) => (
                <div key={post.id} className="border-t pt-3">
                  <p className="text-gray-800 whitespace-pre-wrap">{post.text}</p>
                  {post.images?.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {post.images.map((img, idx) => (
                        <img key={idx} src={img} alt="user post" className="rounded" />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
