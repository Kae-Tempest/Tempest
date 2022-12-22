const { createPool } = require('mariadb');
const db = createPool({
	host: '127.0.0.1',
	user: 'root',
	password: 'root',
	database: 'metepasla',
	supportBigNumbers: true,
	bigNumberStrings: true,
});

db.getConnection()
	.then((conn) => {
		console.log('Connected');
	})
	.catch((err) => {
		console.log('Error at Connection', err);
	});

module.exports = {
	db,
};
