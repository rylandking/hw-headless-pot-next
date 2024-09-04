const https = require('https');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { parse } = require('url');

// Utility function to parse cookies
const parseCookies = (cookieString) => {
  return cookieString
    .split(';')
    .map(cookie => cookie.trim())
    .reduce((acc, cookie) => {
      const [key, value] = cookie.split('=');
      acc[key] = value;
      return acc;
    }, {});
};

const generateApigeeToken = async () => {
    const APIGEE_AUTH_URL = 'https://api.ciq3kgmonc-honeywell1-d3-public.model-t.cc.commerce.ondemand.com/authorizationserver/oauth/token';
    const CLIENT_ID = 'asm';
    const CLIENT_SECRET = '1234';
    const response = await fetch(APIGEE_AUTH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'grant_type': 'client_credentials',
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
      })
    });
  
    if (!response.ok) {
      throw new Error('Failed to generate Apigee token: ${response.statusText}');
    }
  
    const data = await response.json();
    return data.access_token;
  };

  const generateBinderToken = async () => {
    const Binder_AUTH_URL = 'https://honeywell.bynder.com/v6/authentication/oauth2/token';
    const CLIENT_ID = 'd6aca289-4ca3-47d0-a5ed-a3e1716b062d';
    const CLIENT_SECRET = '0e07b2ae-0c90-44e9-9e94-69dd43c379a4';
    const response = await fetch(Binder_AUTH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'grant_type': 'client_credentials',
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
      })
    });
  
    if (!response.ok) {
      throw new Error(`Failed to generate Bynder token: ${response.statusText}`);
    }
    const data = await response.json();
    return data.access_token;
  };

export default async function handler(req, res) {
  const { method, headers, url } = req;
  const basePath = '/api/proxy'; // Adjust this based on your setup
  const parsedUrl = parse(url);
  const apiPath = parsedUrl.pathname.replace(basePath, '');
  const queryString = parsedUrl.query ? '?' + parsedUrl.query : '';
  const fullUrl = `${apiPath}${queryString}`;

  const cookies = headers.cookie ? parseCookies(headers.cookie) : {};
  const token = cookies["2391-token"] || "default-token";

  if (apiPath.includes("/pif/")) {
    if (method === 'OPTIONS') {
      // Handle CORS preflight
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.status(200).end();
    } else {
      const targetURL = "https://buildingsbt.stage.honeywell.com" + fullUrl;
      const cookieVal = "2391-token=" + token;
      let requestData = '';

      req.on('data', chunk => {
        requestData += chunk;
      });

      req.on('end', () => {
        const options = {
          method: method,
          headers: {
            'Authorization': "Bearer " + token,
            'Cookie': cookieVal,
            'Content-Type': 'application/json',
          },
        };

        const request = https.request(targetURL, options, (response) => {
          let data = '';

          response.on('data', (chunk) => {
            data += chunk;
          });

          response.on('end', () => {
            const contentType = response.headers['content-type'];

            if (contentType && contentType.includes('application/json')) {
              try {
                const jsonData = JSON.parse(data);
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Content-Type', 'application/json');
                res.status(response.statusCode).json(jsonData);
              } catch (error) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Content-Type', 'application/json');
                res.status(500).json({ message: 'Internal Server Error', error: error.message });
              }
            } else {
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Content-Type', 'text/plain');
              res.status(response.statusCode).send(data);
            }
          });
        });

        request.on('error', (error) => {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Content-Type', 'application/json');
          res.status(500).json({ message: 'Internal Server Error', error: error.message });
        });

        request.write(requestData);
        request.end();
      });
    }
  } else if (apiPath.includes("/productDetails/")) {
    try {
      const apigee_token = await generateApigeeToken();
      const targetURL = `https://api.ciq3kgmonc-honeywell1-d3-public.model-t.cc.commerce.ondemand.com/honeywellwebservices/v2/honeywell${apiPath}${queryString}`;

      const response = await fetch(targetURL, {
        method: req.method,
        headers: {
          'Authorization': `Bearer ${apigee_token}`,
        },
      });

      if (!response.ok) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        res.status(response.status).json({ message: 'Error fetching data', statusText: response.statusText });
        return;
      }

      const data = await response.json();
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(data);

    } catch (error) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', 'application/json');
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  } else if (apiPath.includes("/download/")) {
    try {
      const binder_token = await generateBinderToken();
      const targetURL = `https://honeywell.bynder.com/api/v4/media/DA1CA705-D8BE-434F-9C08F7A226DA6950${apiPath}${queryString}`;

      const response = await fetch(targetURL, {
        method: req.method,
        headers: {
          'Authorization': `Bearer ${binder_token}`,
        },
      });

      if (!response.ok) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        res.status(response.status).json({ message: 'Error fetching data', statusText: response.statusText });
        return;
      }

      const data = await response.json();
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(data);

    } catch (error) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', 'application/json');
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  } else {
    // Forward all other requests to Next.js pages
    nextjsProxy(req, res, (err) => {
      if (err) {
        res.status(500).send('Internal Server Error');
      }
    });
  }
}
