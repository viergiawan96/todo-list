const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.MYSQL_DBNAME,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.activity = require("./activity.model.js")(sequelize, Sequelize);
db.todo = require("./todo.model")(sequelize, Sequelize);

module.exports = db;
