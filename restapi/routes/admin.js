// require following EXTERNAL dependencies
const express = require('express');
const router = express.Router();

// require following INTERNAL dependencies
const ctrlAdmin = require('../controllers/controller_admin');
const controllerFileHandler = require('../controllers/controller_filehandler');

// HTTP POST request
router.post('/register', ctrlAdmin.handleRegistration, (req, res, next) => {
	res.status(201).json({message: 'Registration succesfull'});
});

router.post('/register', (req, res, next) => {
	res.json({login: 'failed, please try again'});
});

// 💥 Kan være her at fejlen ligger i forhold til at vi bliver ved med at være på endpoint /login når admin er logget ind og ikke på /dashboard.
router.post('/login', ctrlAdmin.handleLogin, (req, res, next) => {
	res.locals.email = req.body.email;
	res.render('admin_page', {
		title: res.locals.email,
		token: res.locals.token,
		msg: 'Login successful'
	});
});

router.post('/upload', controllerFileHandler.handleFileUpload);

// HTTP GET request
router.get('/register', (req, res, next) => {
	res.render('register', {
		title: 'Please Register',
		subtitle: 'Follow the embedded cues'
	});
});

router.get('/login', (req, res, next) => {
  res.render('login', {
	  title: 'Please Login'
  });
});

router.get('/list-files', controllerFileHandler.listFiles);
router.get('/download/:fileName', controllerFileHandler.downloadFile);

module.exports = router;
