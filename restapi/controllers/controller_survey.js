// require following EXTERNAL dependencies
const fs = require("fs");
const path = require("path");

// require following INTERNAL dependencies
const utilityGenerateUUID = require("../utility/generateUUID");

module.exports = {

  // Middleware til at generere session ID
  generateSessionId: (req, res, next) => {
    if (!req.session.løbeId) {
      req.session.løbeId = utilityGenerateUUID.generateUUID() // Opret et unikt ID
      console.log(`🆕 Ny session oprettet: ${req.session.løbeId}`);
    } else {
      console.log(`✅ Eksisterende session fundet: ${req.session.løbeId}`);
    }
    next();
  },

  // Middleware til at gemme besvarelser fra spørgeskema i mappen /data/json
  saveUserResponse: async function (req, res, next) {
    try {
      if (!req.session.løbeId) {
        return res.status(400).json({ success: false, message: "Session ID mangler." });
      }

      const løbeId = req.session.løbeId;
      const responsesDir = path.join(__dirname, "../data/json");
      const userFile = path.join(responsesDir, `${løbeId}.json`);
      let userData = { løbeId, responses: [] };

      if (fs.existsSync(userFile)) {
        try {
          const fileContent = await fs.readFile(userFile, "utf8");
          userData = JSON.parse(fileContent);
        } catch (error) {
          console.error(`❌ Fejl ved læsning af JSON-fil:`, error);
          return next(error);
        }
      }

      const newResponse = req.body;
      if (!newResponse || Object.keys(newResponse).length === 0) {
        return res.status(400).json({ success: false, message: "Ugyldig responsdata." });
      }

      userData.responses.push(newResponse);

      await fs.writeFile(userFile, JSON.stringify(userData, null, 2));
      console.log(`💾 Respons gemt for session: ${løbeId}`);
      next();
    } catch (error) {
      console.error(`❌ Fejl ved skrivning af JSON-fil:`, error);
      next(error);
    }
  }
};

/*
Til at forstå hvad vi angiver som argumenter til linje 50.

Når vi bruger JSON.stringify(), har vi mulighed for at angive tre argumenter:

JSON.stringify(value, replacer, space);

value = (userData)   → Det objekt, vi vil konvertere til JSON.
replacer = (null)    → En funktion eller en array, der kan ændre, hvilke properties der inkluderes i JSON-outputtet (vi sætter den til null, hvilket betyder, at alle properties inkluderes).
space = (2)          → Antallet af mellemrum, der bruges til indrykning, for at gøre JSON mere læsbart.

*/