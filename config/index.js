const dbServer = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
}

const tunnelConfig = {
	host: process.env.SSH_HOST,
	port: 22,
	username: process.env.SSH_USER,
	privateKey: require('fs').readFileSync('./keys/id_rsa'),
}

const forwardConfig = {
	srcHost: '127.0.0.1',
	srcPort: 3306,
	dstHost: dbServer.host,
	dstPort: dbServer.port,
};

module.exports = { dbServer, tunnelConfig, forwardConfig }