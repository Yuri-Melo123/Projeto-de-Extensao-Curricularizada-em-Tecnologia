const axios = require("axios");

const ACCESS_TOKEN = "SEU_ACCESS_TOKEN_AQUI"; // Substitua pelo seu token de acesso do Instagram Graph API
const INSTAGRAM_ID = "SEU_INSTAGRAM_ID_AQUI"; // Substitua pelo ID do seu perfil do Instagram

exports.getInstagramMetrics = async () => {
  try {
    // Perfil
    const profile = await axios.get(
      `https://graph.facebook.com/v25.0/${INSTAGRAM_ID}`,
      {
        params: {
          fields: "followers_count,media_count",
          access_token: ACCESS_TOKEN,
        },
      }
    );

    // Posts
    const media = await axios.get(
      `https://graph.facebook.com/v25.0/${INSTAGRAM_ID}/media`,
      {
        params: {
          fields:
            "id,caption,like_count,comments_count",
          access_token: ACCESS_TOKEN,
        },
      }
    );

    return {
      followers:
        profile.data.followers_count || 0,

      media_count:
        profile.data.media_count || 0,

      posts: media.data.data.map((post) => ({
        id: post.id,
        caption: post.caption,
        likes: post.like_count || 0,
        comments:
          post.comments_count || 0,
      })),
    };
  } catch (error) {
    console.log(
      "ERRO INSTAGRAM:",
      error.response?.data || error.message
    );

    throw error;
  }
};