export const extractHashtagsFromPosts = async () => {
  const postsSnapshot = await getDocs(collection(db, "posts"));
  const hashtagMap = {};

  postsSnapshot.forEach((doc) => {
    const text = doc.data().text || "";
    const matches = text.match(/#[\w]+/g) || [];
    matches.forEach((tag) => {
      const tagLower = tag.toLowerCase();
      hashtagMap[tagLower] = (hashtagMap[tagLower] || 0) + 1;
    });
  });

  // Sort hashtags by usage count
  const sorted = Object.entries(hashtagMap)
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }));

  return sorted.slice(0, 10); // Top 10 trending
};
