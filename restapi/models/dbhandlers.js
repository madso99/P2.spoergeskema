// require following EXTERNAL dependencies
const path = require('path');
const sqlite3 = require("better-sqlite3");

// Start db connection
const connect = async function () {
	try {
		const db = await new sqlite3(path.resolve('db/sampleAPI.db'), {fileMustExist: true});
		return db;
	} catch (err) {
		console.error(err);
	}
};

module.exports = {

	insertUser: async function (req, res, next) {
		try {
			let db = await connect();
			console.log("✅ Databaseforbindelse oprettet");

			let sql = 'insert into user (email, password, bio) values(?, ?, ?)';
			let query = db.prepare(sql);
			console.log("📨 Data modtaget:", req.body.email, res.locals.hash, req.body.bio);

			let row = await query.run(req.body.email, res.locals.hash, req.body.bio);
			console.log("✅ Bruger gemt i databasen:", row);

			res.locals.user = row
		} catch (err) {
			console.error("❌ Fejl i insertUser:", err.message);
			res.status(400).json(err.message);
		}
	},

	getUser: async function (req, res, next) {
		try {
			let db = await connect();
			let sql = 'select * from user where email = ?';
			let query = db.prepare(sql);
			let row = await query.get(req.body.email);
			res.locals.user = row;
		} catch (err) {
			res.status(400).json(err.message);
		}
	}
}