const { Pool } = require('pg')

export const db = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'metepasla',
	password: 'root',
	port: 5432,
})