require('dotenv').config();

const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '123',
    database: 'atendimento',
    port: '5432'
})

module.exports = pool;