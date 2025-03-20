// require following EXTERNAL dependencies
const fs = require('fs');
const path = require('path');
const libxmljs = require("libxmljs2");

module.exports = {

  // **Middleware til at tjekke filtypen**
  checkXMLFile(req, res, next) {
    console.log("📂 Filmodtagelse:", req.files);

    if (!req.files || Object.keys(req.files).length === 0) {
      console.log("❌ Ingen fil blev uploadet");
      return res.status(400).send("❌ Ingen fil blev uploadet");
    }

    const uploadedFile = req.files.uploadFile;
    const fileExtension = path.extname(uploadedFile.name).toLowerCase();

    if (fileExtension !== ".xml") {
      console.log("❌ Kun XML-filer er tilladt");
      return res.status(400).send("❌ Kun XML-filer er tilladt");
    }

    // **Gem midlertidigt for validering**
    req.tempFilePath = path.join(
      __dirname,
      "..",
      "data",
      "xml",
      `temp_${uploadedFile.name}`
    );

    uploadedFile.mv(req.tempFilePath, (err) => {
      if (err) {
        console.log("❌ Fejl ved upload af midlertidig fil:", err);
        return res.status(500).send("❌ Fejl ved upload af fil");
      }
      next(); // **Gå videre til næste middleware (validering)**
    });
  },

  // **Middleware til at validere XML-filen**
  validateXMLMiddleware(req, res, next) {
    try {
      const xmlData = fs.readFileSync(req.tempFilePath, "utf8");
      const xsdPath = path.join(__dirname, "..", "data", "schema", "survey.xsd");
      const xsdData = fs.readFileSync(xsdPath, "utf8");

      const xmlDoc = libxmljs.parseXml(xmlData);
      const xsdDoc = libxmljs.parseXml(xsdData);

      const isValid = xmlDoc.validate(xsdDoc);

      if (!isValid) {
        console.log(
          "❌ XML validering fejlede:",
          xmlDoc.validationErrors.map((err) => err.message)
        );
        fs.unlinkSync(req.tempFilePath); // **Slet ugyldig fil**
        return res
          .status(400)
          .json({
            message: "❌ XML validering fejlede",
            errors: xmlDoc.validationErrors.map((err) => err.message),
          });
      }

      console.log("✅ XML-filen er gyldig!");
      next(); // **Gå videre til næste middleware (flytning til permanent mappe)**
    } catch (error) {
      console.error("❌ XML validering fejlede:", error);
      fs.unlinkSync(req.tempFilePath); // **Slet fil, hvis der opstår en fejl**
      return res
        .status(500)
        .json({ message: "❌ Fejl ved behandling af XML." });
    }
  },

  // **Middleware til at flytte den validerede fil**
  saveValidatedFile(req, res) {
    const finalPath = path.join(
      __dirname,
      "..",
      "data",
      "xml",
      path.basename(req.tempFilePath).replace("temp_", "")
    );

    fs.rename(req.tempFilePath, finalPath, (err) => {
      if (err) {
        console.log("❌ Fejl ved flytning af fil:", err);
        return res.status(500).send("❌ Fejl ved lagring af fil");
      }
      console.log(`✅ Filen er blevet uploadet og valideret: ${finalPath}`);
      res.status(200).send("✅ Filen er blevet uploadet og valideret!");
    });
  },

  /*
  // Middleware til filupload af XML filer til mappen /data/xml
  handleFileUpload: (req, res, next) => {
    console.log("Filmodtagelse: ", req.files); // Log det, der bliver sendt fra klienten
    
    if (req.files && Object.keys(req.files).length !== 0) {
      const uploadedFile = req.files.uploadFile;

        // Tjek om filtypen er XML
        const fileExtension = path.extname(uploadedFile.name).toLowerCase();

        if (fileExtension !== '.xml') {
        console.log("❌ Kun XML-filer er tilladt");
        return res.status(400).send("❌ Kun XML-filer er tilladt");
        }

      const uploadPath = path.join(__dirname, '..', 'data', 'xml', uploadedFile.name);
  
      uploadedFile.mv(uploadPath, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send("❌ Fejl ved upload af fil");
        }
        console.log(`✅ Filen ${uploadedFile.name} er blevet uploadet til ${uploadPath}`);
        res.send("✅ Filen er blevet uploadet!");
      });
    } else {
      console.log("❌ Ingen fil blev uploadet");
      res.status(400).send("❌ Ingen fil blev uploadet");
    }
  },*/

  // Middleware til Liste over filer i /data/json
  listFiles: (req, res) => {
    const directoryPath = path.join(__dirname, '../data/json');

    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        return res.status(500).json({ error: "❌ Kunne ikke læse mappen" });
      }
      res.json(files); // Returnerer en liste af filer
    });
  },
  
  // Middleware til download af filer mappen /data/json
  downloadFile: (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, '../data/json', fileName);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).send("❌ Filen blev ikke fundet!");
    }
    
    res.download(filePath, fileName, (err) => {
      if (err) {
        return res.status(500).send("❌ Fejl ved download af fil");
      }
      console.log(`✅ Filen ${fileName} er blevet downloadet`);
    });
  }
};
