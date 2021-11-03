require('dotenv').config();
const mysqlssh = require('./lib/mysql-ssh');

mysqlssh.connect()
	.then(async (client) => {
		const sql = `SELECT * FROM users WHERE id = ? LIMIT 5`;
		const [res] = await client.query(sql, [7]);

		console.log(res);
	})
	.catch((err) => console.log(err))
	.then(() => mysqlssh.close());