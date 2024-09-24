// eslint-disable-next-line import/no-anonymous-default-export
export default {
  api: {
    base_url: process.env.API_URL,
  },
  nextAuth: {
    secret: process.env.NEXTAUTH_SECRET,
  },
};
