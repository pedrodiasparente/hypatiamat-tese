module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 3052),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "99e959f2a09c429c160a3eeab7dcb29e"),
    },
  },
});
