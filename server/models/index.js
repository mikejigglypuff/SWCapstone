const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Users = require('./users')(sequelize, Sequelize);
db.Posts = require('./posts')(sequelize, Sequelize);

//1:N
db.Users.hasMany(db.Posts);

module.exports = db;
