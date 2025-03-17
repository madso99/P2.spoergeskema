const express = require('express');
const router = express.Router();

const con = require('../controllers/controller_admin');

/* GET user register ie send form */
router.get('/register', function(req, res, next) {
  	res.render('register', {
	  	title: 'Please Register',
	  	subtitle: 'Follow the embedded cues'
  	});
});

router.post('/register', function(req, res, next) {
	// variables from middleware
	res.json({login: 'failed, please try again'});
});

router.get('/login', function(req, res, next) {
	res.render('login', {
		title: 'Please Login'
	});
});



module.exports = router;
