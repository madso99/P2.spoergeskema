const model = require('../models/dbhandlers');
const ctrlSecurity = require('../controllers/controller_security');

const SU = 0; // Admin-rolle

module.exports = {

  // Middleware til at sikre, at brugeren er admin
  isAdmin: function(req, res, next) {
    try {
      if (res.locals.authorized && res.locals.profile === SU) {
        next();
      } else {
        throw new Error('You must be logged in as admin');
      }
    } catch (err) {
      res.status(403).json({ message: err.message });
    }
  },

  handleRegistration: async function(req, res, next) {
    try {
      await ctrlSecurity.hashPassword(req, res, next); // Hasher passwordet
      await model.insertUser(req, res, next); // Indsætter brugeren i databasen
      next();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  },

  // Middleware til admin-login
  handleLogin: async function(req, res, next) {
    try {
      await model.getUser(req, res, next);
      await ctrlSecurity.validatePassword(req, res, next); // Tjekker password
      await ctrlSecurity.generateToken(req, res, next); // Opretter JWT-token

      res.json({ token: res.locals.token });
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  },

  // Middleware til at oprette en ny admin
  createAdmin: async function(req, res, next) {
    try {
      await ctrlSecurity.hashPassword(req, res, next); // Hasher passwordet
      res.locals.profile = SU; // Sætter brugerens rolle til admin
      await model.insertUser(req, res, next); // Opretter admin i databasen

      res.json({ message: 'Admin created successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
