  // -------------------------------
  // Import Node Modules
  // -------------------------------
  require("dotenv").config();
  const cors = require("cors");
  const bodyParser = require("body-parser");
  const express = require('express');

  // ------------------------------
  // Create express app
  // ------------------------------
  const app = express();
  // ------------------------------
  // Load the middlewares
  // ------------------------------
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  // ....


  app.post("/update", function(req, res) {
    console.log(req.body);
    return res.send('success');
});


  app.listen(process.env.PORT || 5000);
  console.log("Listening on localhost:3120");