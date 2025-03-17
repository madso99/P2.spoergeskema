const models = require('../models/dbhandlers');

module.exports = {
	getContinents: async function (req, res, next) {
		let rows = await models.getAllContinents(req, res, next);
		res.locals.continents = rows;
		next();
	},

	getCountries: async function (req, res, next) {
		let rows = await models.getAllCountries(req, res, next);
		res.locals.countries = rows;
		next();
	},

	getCities: async function (req, res, next) {
		let rows = await models.getAllCities(req, res, next);
		res.locals.cities = rows;
		next();
	},

	getLanguages: async function (req, res, next) {
		let rows = await models.getAllLanguages(req, res, next);
		res.locals.languages = rows;
		next();
	}

}
