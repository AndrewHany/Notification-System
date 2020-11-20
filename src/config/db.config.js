module.exports = {
  HOST: "localhost",
  PORT: "9090",
  USER: "root",
  PASSWORD: "root",
  DB: "notification_system",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};