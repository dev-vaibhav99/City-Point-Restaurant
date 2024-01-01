const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
  production: {
    username: process.env.DB_USER || "u904598717_hotel_mgmt",
    password: process.env.DB_PASSWORD || "Hotel#Mgmt@123",
    database: process.env.DB_NAME || "u904598717_hotel_mgmt",
    host: process.env.DB_HOST || "srv944.hstgr.io",
    dialect: process.env.DB_DIALECT || "mysql",
  },
};
