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
  /*
  handleLogin: async function(req, res, next) {
    try {
      await model.getUser(req, res, next);
      await ctrlSecurity.validatePassword(req, res, next); // Tjekker password
      await ctrlSecurity.generateToken(req, res, next); // Opretter JWT-token
  
      // Sørg for at sende svar kun én gang
      if (!res.headersSent) {
        // Send JSON-svar hvis det er API-login
        res.json({ token: res.locals.token, msg: 'Login successful' });
      }
    } catch (err) {
      // Hvis fejl opstår, send fejlsvar kun én gang
      if (!res.headersSent) {
        res.status(401).json({ message: err.message });
      }
    }
  },
  */
  handleLogin: async (req, res, next) => {
    try {
      console.log('Handle login started');
      
      // Først validerer vi brugeren
      await model.getUser(req, res, next);
      
      // Dernæst validere passwordet
      await ctrlSecurity.validatePassword(req, res, next); // Hvis passwordet er forkert, stopper vi her.
  
      // Generer tokenet
      await ctrlSecurity.generateToken(req, res, next); // Tokenet gemmes i res.locals
  
      // Send succesrespons
      if (!res.headersSent) {
        console.log('Sending response: Success');
        return res.json({ token: res.locals.token, msg: 'Login successful' });
      }
    } catch (err) {
      console.log('Error occurred: ', err.message);
      
      // Tjek om headers er blevet sendt
      if (!res.headersSent) {
        console.log('Sending error response');
        return res.status(401).json({ message: err.message });
      } else {
        console.log('Response already sent, skipping error handling');
      }
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
