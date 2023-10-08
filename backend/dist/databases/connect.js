"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const { Pool } = require('pg');
exports.db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'metepasla',
    password: 'root',
    port: 5432,
});
