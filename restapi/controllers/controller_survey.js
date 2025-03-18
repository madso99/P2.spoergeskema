const fs = require("fs");
const path = require("path");

// Funktion til at generere en UUID v4 uden ekstra npm-pakker
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Sti til hvor JSON-filerne skal gemmes
const responsesDir = path.join(__dirname, "../data/json");
if (!fs.existsSync(responsesDir)) {
  fs.mkdirSync(responsesDir, { recursive: true });
}

// Middleware til at generere session ID
const generateSessionId = (req, res, next) => {
  if (!req.session.løbeId) {
    req.session.løbeId = generateUUID(); // Opret et unikt ID
    console.log(`🆕 Ny session oprettet: ${req.session.løbeId}`);
  } else {
    console.log(`✅ Eksisterende session fundet: ${req.session.løbeId}`);
  }
  next();
};

// Funktion til at gemme brugerens respons
const saveUserResponse = (req, res) => {
  if (!req.session.løbeId) {
    return res
      .status(400)
      .json({ success: false, message: "Session ID mangler." });
  }

  const løbeId = req.session.løbeId;
  const userFile = path.join(responsesDir, `${løbeId}.json`);

  let userData = { løbeId, responses: [] };

  // Hvis filen allerede eksisterer, hent eksisterende data
  if (fs.existsSync(userFile)) {
    try {
      userData = JSON.parse(fs.readFileSync(userFile, "utf8"));
    } catch (error) {
      console.error(
        `❌ Fejl ved læsning af JSON-fil for session ${løbeId}:`,
        error
      );
      return res
        .status(500)
        .json({ success: false, message: "Fejl ved læsning af brugerdata." });
    }
  }

  // Tilføj det nye svar
  const newResponse = req.body;
  if (!newResponse || Object.keys(newResponse).length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Ugyldig responsdata." });
  }
  userData.responses.push(newResponse);

  try {
    fs.writeFileSync(userFile, JSON.stringify(userData, null, 2));
    console.log(`💾 Respons gemt for session: ${løbeId}`);
    res.json({ success: true, message: "Response saved successfully." });
  } catch (error) {
    console.error(
      `❌ Fejl ved skrivning af JSON-fil for session ${løbeId}:`,
      error
    );
    res
      .status(500)
      .json({ success: false, message: "Fejl ved lagring af brugerdata." });
  }
};

module.exports = { generateSessionId, saveUserResponse };
