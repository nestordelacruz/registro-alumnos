const dbConfig = require("../db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  port: 5433,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.sequelize.sync({ force: false, alter: true })
db.alumnos = require("./alumnos.model.js")(sequelize, Sequelize);
db.extraidos = require("./extraidos.model.js")(sequelize, Sequelize);
db.test = require("./test.model.js")(sequelize, Sequelize);

module.exports = db;