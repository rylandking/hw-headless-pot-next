const express = require('express');
const next = require('next');
const cookieParser = require("cookie-parser");
const request = require('request');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require("path");

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.set('port', process.env.PORT || 7000);

  server.use(bodyParser.json());
  server.use(cookieParser());

  // Register static files and folders
  server.use(express.static(path.join(__dirname, "/www")));
  server.use(express.static(path.resolve(__dirname, "./client/build")));

  const myLimit = process.argv[2] || '100kb';
  console.log('Using limit: ', myLimit);
  server.use(bodyParser.json({ limit: myLimit }));

  server.use(cors({ origin: true, credentials: true }));

  let savedFavSoldResult = {
    "honId": "",
    "language": {
      "isoCode": "",
      "name": ""
    },
    "soldToAccounts": [
      {
        "addressLine1": "PO BOX 50",
        "city": "TROY GROVE",
        "country": "united states",
        "currencyList": {
          "country": {
            "name": "united states",
            "isoCode": "US"
          },
          "currency_Info": [
            {
              "name": "USD",
              "isoCode": "USD"
            }
          ]
        },
        "distributionChannel": "10",
        "division": "10",
        "erpId": "BRV900",
        "id": "a1I1P000008dymjUAA",
        "isDeactivated": "",
        "isDefault": true,
        "isDelete": "",
        "isSelected": "Y",
        "name": "Technisand Inc",
        "postalCode": "61372",
        "salesArea": "US HPS Sales Org-10-10",
        "salesOrg": "1109",
        "siebelRowId": "1-HSIFJR",
        "soldToNumber": "0000289116",
        "soldToToolAccess": [""],
        "type": "SAP Sold To",
        "Region": "AMER",
        "AccountId": "0011a00000gQKaPAAW",
        "AccountSite": "Troy Grove"
      },
      {
        "addressLine1": "Darlington Road",
        "city": "Northallerton",
        "country": "united kingdom",
        "currencyList": {
          "country": {
            "name": "united kingdom",
            "isoCode": "GB"
          },
          "currency_Info": [
            {
              "name": "GBP",
              "isoCode": "GBP"
            }
          ]
        },
        "distributionChannel": "10",
        "division": "10",
        "erpId": "BRV900",
        "id": "a1I1P000008dyqfUAA",
        "isDeactivated": "",
        "isDefault": false,
        "isDelete": "",
        "isSelected": "Y",
        "name": "Micronized Food Products",
        "postalCode": "DL6 2NW",
        "salesArea": "UK HPS Sales Org-10-10",
        "salesOrg": "2593",
        "siebelRowId": "1-22C83-2029",
        "soldToNumber": "0000002846",
        "soldToToolAccess": [""],
        "type": "SAP Sold To",
        "Region": "EMEA",
        "AccountId": "0011a00000gQJZwAAO",
        "AccountSite": "Northallerton"
      },
      {
        "addressLine1": "Tern Valley Business Park",
        "city": "Market Drayton",
        "country": "united kingdom",
        "currencyList": {
          "country": {
            "name": "united kingdom",
            "isoCode": "GB"
          },
          "currency_Info": [
            {
              "name": "GBP",
              "isoCode": "GBP"
            }
          ]
        },
        "distributionChannel": "10",
        "division": "10",
        "erpId": "BRV900",
        "id": "a1I1P000008dzMTUAY",
        "isDeactivated": "",
        "isDefault": false,
        "isDelete": "",
        "isSelected": "Y",
        "name": "TM UK Production Ltd",
        "postalCode": "TF9 3SQ",
        "salesArea": "UK HPS Sales Org-10-10",
        "salesOrg": "2593",
        "siebelRowId": "1-22C83-2171",
        "soldToNumber": "0000002709",
        "soldToToolAccess": [""],
        "type": "SAP Sold To",
        "Region": "EMEA",
        "AccountId": "0011a00000h2HEFAA2",
        "AccountSite": "Market Drayton"
      },
      {
        "addressLine1": "Wensleydale Creamery",
        "city": "North Yorkshire",
        "country": "united kingdom",
        "currencyList": {
          "country": {
            "name": "united kingdom",
            "isoCode": "GB"
          },
          "currency_Info": [
            {
              "name": "GBP",
              "isoCode": "GBP"
            }
          ]
        },
        "distributionChannel": "10",
        "division": "10",
        "erpId": "BRV900",
        "id": "a1I1P000009DvfwUAC",
        "isDeactivated": "",
        "isDefault": false,
        "isDelete": "",
        "isSelected": "Y",
        "name": "Wensleydale Dairy Products Ltd",
        "postalCode": "DL8 3RN",
        "salesArea": "UK HPS Sales Org-10-10",
        "salesOrg": "2593",
        "siebelRowId": "1-22C83-389",
        "soldToNumber": "0000004063",
        "soldToToolAccess": [""],
        "type": "SAP Sold To",
        "Region": "EMEA",
        "AccountId": "0011a00000gQKU3AAO",
        "AccountSite": "Kirkby Malzeard"
      }
    ],
    "status": "",
    "userRole": "",
    "userType": ""
  };

  server.get('/api/test', (req, res) => {
    res.json({
      message: "ok"
    });
  });

  server.all('/pif/api/*', function (req, res, next) {

    if (req.method === 'OPTIONS') {
      // CORS Preflight
      //res.send();
    }
    /* else if(req.url=="/pif/api/soldto/favorite/v1/user?appId=231"){
         res.send(savedFavSoldResult);
     }*/
    else {

      res.json({
        message: "ok"
      });

      const token = req.cookies["2391-token"] || "ewogICJ0eXAiIDogIkpXVCIsCiAgImFsZyIgOiAiUlMyNTYiCn0.ewogICJkb21haW4iIDogIjIzOTEiLAogICJhcHBJZCIgOiAiMjM5IiwKICAiaXNzIiA6ICJidWlsZGluZ3NidC5zdGFnZS5ob25leXdlbGwuY29tIiwKICAianRpIiA6ICIxZjUyNDY1NC04MTBhLTQ3MDQtOWMzYy1kMzU4OTMxOWVkYmUiLAogICJzdWIiIDogImRjMDcyMGNjLTZiN2ItNGZhYi1hOTAxLWY0MWRiNGJiZWYwYiIsCiAgImlhdCIgOiAxNzIzMTAzOTk3LAogICJleHAiIDogMTcyMzEwNTc5Nwp9.PqofR0n9DS4cC5hNxeHyb2948-yQm663Urj3NziqMtIFtkO-Y0bIHG8GFlQMt7DFIPcEReqKY0qJh_Aw7GNQDmfqVN-Zl5g2tAJFzBhvEz31TM0n06J8lOeieyJ0PVPTF6A7XC9QIFgcHVaIoLFcchC0ZLEzkhtHPmektZCGQITWVUQgxtfRk2mShV8slynpTKEUgqznGrvF7WBShrmZBLFjg13clEiSFtS3OhVd1vnETTY0eLTF-tgTxvlIBkJM1vbvsDsu9WaAyyoIvf0atny0ykR3trDT0K3Iq-2eQYqhTgiffosJ3-NKqZaSRlCOgDn5zydFq4pE2JZAALYkIw";
      const cookieVal = "2391-token=" + token;

      request(
        {
          url: "https://buildingsbt.stage.honeywell.com" + req.url,
          method: req.method,
          json: req.body,
          headers: {
            'Authorization': "Bearer " + token,
            'Cookie': cookieVal,
          },

        },
        function (error, response, body) {
          if (error) {
            console.error('error: ' + response.statusCode);
          }
          console.log(req.url, "->");
          console.log(body);
        }
      ).pipe(res);
    }
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(server.get('port'), (err) => {
    if (err) throw err;
    console.log('Proxy server listening on port ' + server.get('port'));
  });
});
