require("dotenv").config();

const Sequelize = require("sequelize");

const db = new Sequelize(process.env.DATABASE_URL || `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
  logging: false,
  ssl: process.env.DB_ENABLE_SSL,
  dialectOptions: process.env.DB_ENABLE_SSL==='true' ? {
    ssl: {
        require: true,
        rejectUnauthorized: false
    } 
  } : {} 
});

module.exports = db;