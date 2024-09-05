export default () => ({
  port: process.env.PORT,
  jwt_secret: process.env.JWT_SECRET,
  database: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  redis: { host: process.env.REDIS_HOST, port: process.env.REDIS_PORT },
});
