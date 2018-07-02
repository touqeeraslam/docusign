  // -------------------------------
  // Import Node Modules
  // -------------------------------
  require("dotenv").config();
  const cors = require("cors");
  const bodyParser = require("body-parser");
  var request = require('request');
  const express = require('express');
  // const docusign = require('docusign-esign');
  const Pusher = require("pusher");
  var pusher = new Pusher({
    appId: '241386',
    key: '459c625dee4661edf11e',
    secret: '515ff550a65864b08548',
    encrypted: true
   });
  

  var baseUrl, fileKey, accountId,envelopeId;
  var headers = {
    'X-DocuSign-Authentication': JSON.stringify({
      'Username': process.env.DOCUSIGN_USERNAME,
      'Password': process.env.DOCUSIGN_PASSWORD,
      'IntegratorKey': process.env.DOCUSIGN_INTEGRATION_KEY
    })
  };

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
    console.log(req);
});

  // -------------------------------
  // Create app routes
  // -------------------------------
  app.post("/sign", function (req, res) {

    var data = req.body;
    console.log('sending on data', data);
    request({
      method: 'GET',
      url: process.env.DOCUSIGN_LOGIN,
      headers: headers
    }, function (err, r, loginBody) {
      if (err) {
        console.log("err",err);

      } else {
        loginBody = JSON.parse(loginBody);
        console.log('got docusign login response', loginBody);
        baseUrl = loginBody['loginAccounts'][0]['baseUrl'];
        accountId = loginBody['loginAccounts'][0]['accountId'];
        // fileKey = data.filename;
        request({

          url: baseUrl + '/envelopes',
          method: 'POST',
          json: true,
          headers: headers,
          body: {


            "status": "sent",
            "emailBlurb": "Please sign the document.",
            "emailSubject": "Please sign your agreement",
            "templateId": "e290d8f9-9172-4982-99be-e5d270b7a944",
            "templateRoles": [{
                "clientUserId": "touqeeeraslam@gmail.com",
                "name": "Touqeer  Aslam",
                "email": "touqeeraslamkhan@gmail.com",
                "roleName": "Signer",
                "tabs": {
                  "textTabs": [{
                      "tabLabel": "address",
                      "value": "ADDRESS "
                    },
                    {
                      "tabLabel": "multi_address",
                      "value": "ADDRESSES"
                    }
                  ]
                }
              },

            ]


          },
        }, function (err, resp, bodys) {
          if (err) {
            return fail(res, err);
          } else {
            console.log('got response', bodys);

            envelopeId = bodys.envelopeId
            uri = bodys.uri;
            request({

              url: baseUrl + uri + '/views/recipient',
              method: 'POST',
              json: true,
              headers: headers,
              body: {

                "clientUserId": "touqeeeraslam@gmail.com",
                "userName": "Touqeer  Aslam",
                "email": "touqeeraslamkhan@gmail.com",
                "recipientId": "1",
                "authenticationMethod": "email",
                "returnUrl": "http://localhost:4200"
              },
            }, function (err, resp, bodys) {
              if (err) {
                console.log("err", err)
              } else {
                bodys.envelopeId = envelopeId;
                console.log('got recepient', bodys);

               return  res.send(bodys)

              }
            });
          }
        });
      }
    });

  });

  app.listen("3120");
  console.log("Listening on localhost:3120");