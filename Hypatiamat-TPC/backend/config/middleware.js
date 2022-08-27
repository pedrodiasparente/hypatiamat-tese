module.exports = {
  load: {
    before: ["responseTime", "logger", "cors", "responses"],
    order: [],
    after: ["parser", "router"],
  },
  settings: {
    cors: {
      enabled: true,
      origin: ["*"],
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
      headers: [
        "Accept",
        "Authorization",
        "Cache-Control",
        "Content-Type",
        "DNT",
        "If-Modified-Since",
        "Keep-Alive",
        "Origin",
        "User-Agent",
        "X-Requested-With",
        "Content-Length",
      ],
    },
  },
};
