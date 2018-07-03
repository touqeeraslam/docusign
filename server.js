  // -------------------------------
  // Import Node Modules
  // -------------------------------
  require("dotenv").config();
  const cors = require("cors");
  const bodyParser = require("body-parser");
  const express = require('express');
  var parseString = require('xml2js').parseString;

  // ------------------------------
  // Create express app
  // ------------------------------
  const app = express();
  // --------------------
  const xmlparser = require('express-xml-bodyparser');
  
  // Load the middlewares
  // ------------------------------
  app.use(xmlparser());


  app.use(cors());
  // app.use(bodyParser.json());
  app.use(bodyParser.text());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  // ....


  app.post("/update", function(req, res) {
    // console.log(req.body.docusignenvelopeinformation);
    // console.log(req.body.docusignenvelopeinformation.documentpdfs);
    console.log("this is the required console : ",req.body.docusignenvelopeinformation.documentpdfs.documentpdf);
   
    return res.send('success');
});


  app.listen(process.env.PORT || 5000);
  console.log("Listening on localhost:5000");