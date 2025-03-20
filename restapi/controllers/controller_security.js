// require following EXTERNAL dependencies
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
  // Middleware til at hashe passwords
  hashPassword: async function(req, res, next) {
    try {
      res.locals.hash = await bcrypt.hash(req.body.password, parseInt(process.env.ROUNDS));
      console.log('✅ hashPassword middleware blev udført!');
      next();
    } catch (err) {
      return res.status(500).json({ message: 'Error hashing password' });
    }
  },

  // Middleware til at validere password ved login
  validatePassword: async function(req, res, next) {
    try {
      let match = await bcrypt.compare(req.body.password, res.locals.user.password);
      if (!match) throw new Error('Invalid credentials');
      console.log('✅ validatePassword middleware blev udført!');
      next();
    } catch (err) {
      return res.status(401).json({ message: err.message });
    }
  },

  // Middleware til at oprette et JWT-token
  generateToken: async function(req, res, next) {
    try {
      const payload = { email: res.locals.user.email, profile: res.locals.user.profile };
      res.locals.token = await jwt.sign(payload, process.env.SECRET, { expiresIn: '10m' });
      console.log('✅ generateToken middleware blev udført!');
      console.log('🔑 Genereret token:', res.locals.token);
      //next();
    } catch (err) {
      return res.status(500).json({ message: 'Error generating token' });
    }
  },

  // Middleware til at validere JWT-token
  validateToken: async function(req, res, next) {
    try {
      let token = req.headers.authorization && req.headers.authorization.split(' ')[1];
      if (!token) throw new Error('You must be logged in');

      let decoded = await jwt.verify(token, process.env.SECRET);
      if (!decoded) throw new Error('Failed to authenticate token');

      const now = Math.floor(Date.now() / 1000);
      const remainingTime = decoded.exp - now;

      if (remainingTime <= 0) {
        throw new Error('Token is expired');
      }

      console.log(`🔒 Token er gyldigt. Der er ${remainingTime} sekunder tilbage før udløb.`);

      res.locals.authorized = true;
      res.locals.profile = decoded.profile;
      console.log('✅ validateToken middleware blev udført!');
      next();
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }
};
