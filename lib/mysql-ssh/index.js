const { Client } = require('ssh2');
const mysql = require('mysql2/promise');

const { dbServer, tunnelConfig, forwardConfig } = require('../../config');

const tunnel = {
	_conn: null,
	_sql: null,

	connect: function () {
		return new Promise((resolve, reject) => {
			tunnel._conn = new Client();
			tunnel._conn.on('ready', () => {
				tunnel._conn.forwardOut(
					forwardConfig.srcHost,
					forwardConfig.srcPort,
					forwardConfig.dstHost,
					forwardConfig.dstPort,
					(err, stream) => {
						if (err) {
							tunnel.close()
							const msg = err.reason === 'CONNECT_FAILED' ? 'Connection failed.' : err
							return reject(msg)
						}

						tunnel._sql = mysql.createConnection({
							...dbServer,
							stream
						});

						resolve(tunnel._sql);
					}
				)
			}).connect(tunnelConfig);
		});
	},

	close: function () {
		if ('end' in tunnel._sql) {
			tunnel._sql.end();
		}

		if ('end' in tunnel._conn) {
			tunnel._conn.end();
		}
	},
}

module.exports = tunnel;