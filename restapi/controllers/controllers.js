require ('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const model = require('../models/dbhandlers');

const SU = 0;			// admin

module.exports = {

	handleLogin: async function(req, res, next) {
		let errmsg = 'Error in credentials\n';
		let errmsgt = 'Error in token signing\n';
		try {
			await model.getUser(req, res, next);
			let rc = await bcrypt.compare(req.body.password, res.locals.user.password);
			if (!rc)
				throw new Error(errmsg);

			const payload = { email: res.locals.user.email, profile: res.locals.user.profile };
			const lifetime = { expiresIn: '1h' };
			let token = await jwt.sign(payload, process.env.SECRET, lifetime);
			if (!token)
				throw new Error(errmsgt);
			res.locals.token = token;

			next();
		} catch (err) {
			return res.status(500).json({message: err.message});
		}
	},

	handleRegistration: async function(req, res, next) {
		try {
			let hash = await bcrypt.hash(req.body.password, parseInt(process.env.ROUNDS));
			res.locals.hash = hash;
			await model.insertUser(req, res, next);
			next();
		} catch (err) {
			console.log(err);
			return res.status(500).json({message: err.message});
		}
	},

	isAuth: async function(req, res, next) {
		try {
			let errmsg = 'You must be logged in';
			let token = req.headers.authorization && req.headers.authorization.split(' ')[1];
			if (!token)
				throw new Error(errmsg);
			errmsg = 'Failed to authenticate token';
			let rc = await jwt.verify(token, process.env.SECRET);
			console.log(rc);
			if (!rc)
				throw new Error(errmsg);

			res.locals.authorized = true;
			res.locals.profile = rc.profile;
			next();
		} catch(err) {
			res.status(500).json({message: err.message});
		}
	},

	isAdmin: function(req, res, next) {
		try {
			if (res.locals.authorized && res.locals.profile == SU) 
				next();
			else
				throw new Error('You must be a logged in as admin');
		} catch(err) {
			res.status(500).json({message: err.message});
		}
	},

	toggleAdmin: async function(req, res, next) {
		try {
			req.body.email = req.params.email;
			await model.getUser(req, res, next);
			if (!res.locals.user)
				throw new Error('User not found');
			if (res.locals.user.profile == SU) {
				let count = await model.countAdmins();
				if (count <= 1)
					throw new Error('Cannot remove last admin');
				await model.toggleAdmin(req, res, next);
			} 
			next();
		} catch(err) {
			res.status(500).json({message: err.message});
		}
	}
}