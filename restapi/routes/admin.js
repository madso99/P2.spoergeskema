// require following EXTERNAL dependencies
const express = require('express');
const router = express.Router();

// require following INTERNAL dependencies
const ctrlAdmin = require('../controllers/controller_admin');
const ctrlFileHandler = require('../controllers/controller_filehandler');
const ctrlSecurity = require('../controllers/controller_security'); 

// HTTP POST request
router.post('/register', ctrlAdmin.handleRegistration, (req, res, next) => {
	res.status(201).json({message: 'Registration succesfull'});
});

router.post('/register', (req, res, next) => {
	res.json({login: 'failed, please try again'});
});

router.post('/login', ctrlAdmin.handleLogin, (req, res, next) => {
	req.session.email = req.body.email;
	req.session.token = res.locals.token;
  
	res.redirect('/admin/dashboard');
});

router.post(
	"/upload",
	ctrlFileHandler.checkXMLFile,
	ctrlFileHandler.validateXMLMiddleware,
	ctrlFileHandler.saveValidatedFile
  );

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

router.get('/dashboard', (req, res, next) => {
	if (!req.session.email) {
		return res.redirect('/admin/login');
	}
	
	res.render('admin_dashboard', {
		title: req.session.email,
		token: req.session.token,
		msg: 'Login successful'
	});
});

router.get('/list-files', ctrlFileHandler.listFiles);
router.get('/download/:fileName', ctrlFileHandler.downloadFile);

module.exports = router;
