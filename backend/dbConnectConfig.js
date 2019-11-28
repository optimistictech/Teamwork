import { Pool } from 'pg';
import configJson from './config';

require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const config = configJson[env];

const isProduction = process.env.NODE_ENV === 'production';

const connectionString = `postgresql://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
});

module.exports = pool;
