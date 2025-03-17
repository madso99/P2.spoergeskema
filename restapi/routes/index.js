const express = require('express');
const router = express.Router();

const conw = require('../controllers/controllersworld');
const con = require('../controllers/controllers');

const TITLE = 'Rest API Pattern Project';

/* API endpoints */

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
        title: TITLE,
        subtitle: 'Front Page'
    });
});

/* GET continents */
router.get('/continents', conw.getContinents, function (req, res) {
	// variables from middleware
	res.json({continents: res.locals.continents});
});

/* GET countries */
router.get('/countries', conw.getCountries, function (req, res) {
	// variables from middleware
	res.json({countries: res.locals.countries});
});

/* GET cities */
router.get('/cities', conw.getCities, function (req, res) {
	// variables from middleware
	res.json({cities: res.locals.cities});
});

/* GET languages */
router.get('/languages', conw.getLanguages, function (req, res) {
	// variables from middleware
	res.json({languages: res.locals.languages});
});

module.exports = router;
