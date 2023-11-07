const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect
});

sequelize.authenticate()
    .then(() => {
        console.log("RDS 연결 완료");
    })
    .catch((e) => {
        console.error(e);
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Users = require('./users')(sequelize, Sequelize);
db.Posts = require('./posts')(sequelize, Sequelize);
db.Comments = require('./comments')(sequelize, Sequelize);
db.UserDiary = require('./userDiary')(sequelize, Sequelize);
db.Admins = require('./admin')(sequelize, Sequelize);

//1:N
db.Users.hasMany(db.Posts);
db.Users.hasMany(db.UserDiary);
db.Users.hasMany(db.Comments);
db.Posts.hasMany(db.Comments);

module.exports = db;
