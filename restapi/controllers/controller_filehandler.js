const fs = require('fs');
const path = require('path');

module.exports = {

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
  },

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
