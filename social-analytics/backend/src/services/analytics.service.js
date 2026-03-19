exports.getInstagramMetrics = async () => {
  return {
    followers: 1200,
    engagement: 8.5,
    posts: [
      { id: 1, likes: 120, comments: 20 },
      { id: 2, likes: 300, comments: 50 },
    ],
  };
};

exports.getFacebookMetrics = async () => {
  return {
    followers: 900,
    engagement: 6.2,
    posts: [
      { id: 1, likes: 80, comments: 10 },
      { id: 2, likes: 150, comments: 25 },
    ],
  };
};