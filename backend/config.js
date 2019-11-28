require('dotenv').config();

export default {
  development: {
    username: 'postgres',
    password: 'easefuture',
    database: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
  },
  test: {
    username: 'postgres',
    password: 'root',
    database: 'root',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
  },
  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
};
