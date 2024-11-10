const { DataSource } = require('typeorm');
const dotenv = require('dotenv');
dotenv.config();

const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.SQL_HOST,
    port: parseInt(process.env.SQL_PORT, 10) || 3306,
    username: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    entities: [__dirname + '/models/*.js'], 
    synchronize: true,
});

module.exports = { AppDataSource };
