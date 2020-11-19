const Sequelize = require('sequelize');

<<<<<<< HEAD:database/index.js
const sequelize = new Sequelize("b7ntfkr2a8u3hwajcm3s", "uvullsjgrdrwg4q3", "lCrNLDAxMglq1SQrckm1", {
    host:"b7ntfkr2a8u3hwajcm3s-mysql.services.clever-cloud.com",
=======
const sequelize = new Sequelize(process.env.MYSQL_ADDON_DB, process.env.MYSQL_ADDON_USER, process.env.MYSQL_ADDON_PASSWORD, {
    host: process.env.MYSQL_ADDON_HOST,
>>>>>>> a3f32e795272f26fe28de29b8240189a3b49b463:backend/database/index.js
    dialect: 'mysql',
    logging: false,
});

sequelize
.authenticate()
.then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

    sequelize.sync();

    module.exports = sequelize;