const express = require('express');
const router = express.Router();

const ctrlAdmin = require('../controllers/controller_admin');
const controllerFileHandler = require('../controllers/controller_filehandler');

const TITLE = 'Admin';

/* GET user register ie send form */
router.get('/register', function(req, res, next) {
  	res.render('register', {
	  	title: 'Please Register',
	  	subtitle: 'Follow the embedded cues'
  	});
});

router.post('/register', ctrlAdmin.handleRegistration, function(req, res, next) {
	res.status(201).json({message: 'Registration succesfull'});
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

router.post('/login', ctrlAdmin.handleLogin, function(req, res, next) {
	res.locals.email = req.body.email;
	res.render('admin_page', {
		title: res.locals.email,
		token: res.locals.token,
		msg: 'Login successful'
	});
});

router.post('/upload', controllerFileHandler.handleFileUpload);

// Route til at hente alle filer i /data/json
router.get('/list-files', controllerFileHandler.listFiles);
router.get('/download/:fileName', controllerFileHandler.downloadFile);

module.exports = router;
