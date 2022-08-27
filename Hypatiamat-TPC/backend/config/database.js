module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "mysql",
        host: env("DATABASE_HOST", "host.docker.internal"),
        port: env.int("DATABASE_PORT", 3306),
        database: env("DATABASE_NAME", "hypati67_tpc"),
        username: env("DATABASE_USERNAME", "root"),
        password: env("DATABASE_PASSWORD", ""),
        ssl: env.bool("DATABASE_SSL", false),
      },
      options: {},
    },
    aplicacoes: {
      connector: "bookshelf",
      settings: {
        client: "mysql",
        host: env("DATABASE_HOST", "host.docker.internal"),
        port: env.int("DATABASE_PORT", 3306),
        database: env("DATABASE_NAME", "hypati67_aplicacoes"),
        username: env("DATABASE_USERNAME", "root"),
        password: env("DATABASE_PASSWORD", ""),
        ssl: env.bool("DATABASE_SSL", false),
      },
      options: {},
    },
    conhecimento: {
      connector: "bookshelf",
      settings: {
        client: "mysql",
        host: env("DATABASE_HOST", "host.docker.internal"),
        port: env.int("DATABASE_PORT", 3306),
        database: env("DATABASE_NAME", "hypati67_testeconhecimentos"),
        username: env("DATABASE_USERNAME", "root"),
        password: env("DATABASE_PASSWORD", ""),
        ssl: env.bool("DATABASE_SSL", false),
      },
      options: {},
    },
  },
});
