const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("formulario_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
  dialectOptions: {
    charset: "utf8mb4",
  },
  define: {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  },
});

module.exports = sequelize;