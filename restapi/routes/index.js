const express = require('express');
const router = express.Router();

const con = require('../controllers/controller_admin');

const TITLE = 'PROJEKT 2 - MEB';

/* API endpoints */

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
        title: TITLE,
        subtitle: 'Front Page'
    });
});

/*
SKABELON:

router.get('/continents', conw.getContinents, function (req, res) {
	// variables from middleware
	res.json({continents: res.locals.continents});
});
*/

module.exports = router;
