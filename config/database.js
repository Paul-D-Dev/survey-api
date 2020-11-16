module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        // client: 'sqlite',
        // filename: env('DATABASE_FILENAME', '.tmp/data.db'),
        client: 'mysql',
        host: "${process.env.HOST}",
        port: "${process.env.PORT}",
        database: "${process.env.DATABASE}",
        username: "${process.env.USERNAME}",
        password: "${process.env.PASSWORD}",
        ssl: { rejectUnauthorized: false }
      },
      options: {
        useNullAsDefault: true,
      },
    },
  },
});
