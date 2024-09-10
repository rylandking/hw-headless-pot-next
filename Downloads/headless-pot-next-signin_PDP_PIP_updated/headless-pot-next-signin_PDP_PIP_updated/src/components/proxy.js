const http = require('http');
const https = require('https');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { parse } = require('url');

const parseCookies = (cookieString) => {
  console.log('Parsing cookies:', cookieString);
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
  console.log('Requesting Apigee token...');

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
    console.error('Failed to generate Apigee token:', response.statusText);
    throw new Error('Failed to generate Apigee token: ' + response.statusText);
  }

  const data = await response.json();
  console.log('Apigee token generated successfully');
  return data.access_token;
};

const generateBinderToken = async () => {
  const Binder_AUTH_URL = 'https://honeywell.bynder.com/v6/authentication/oauth2/token';
  const CLIENT_ID = 'd6aca289-4ca3-47d0-a5ed-a3e1716b062d';
  const CLIENT_SECRET = '0e07b2ae-0c90-44e9-9e94-69dd43c379a4';
  console.log('Requesting Bynder token...');

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
    console.error('Failed to generate Bynder token:', response.statusText);
    throw new Error('Failed to generate Bynder token: ' + response.statusText);
  }

  const data = await response.json();
  console.log('Bynder token generated successfully');
  return data.access_token;
};

export default async function handler(req, res) {
    console.log('Proxy handler invoked:', req.url);
  const { method, headers, url } = req;
  console.log('Received request:', method, url);

  const basePath = '/api/proxy';
  const parsedUrl = parse(url);
  const apiPath = parsedUrl.pathname.replace(basePath, '');
  const queryString = parsedUrl.query ? '?' + parsedUrl.query : '';
  const fullUrl = `${apiPath}${queryString}`;
 
  console.log('API Path:', apiPath);
  console.log('Full URL:', fullUrl);

  const cookies = headers.cookie ? parseCookies(headers.cookie) : {};
  const token = cookies["2391-token"] || "ewogICJ0eXAiIDogIkpXVCIsCiAgImFsZyIgOiAiUlMyNTYiCn0.ewogICJkb21haW4iIDogIjIzOTEiLAogICJhcHBJZCIgOiAiMjM5IiwKICAiaXNzIiA6ICJidWlsZGluZ3NidC5zdGFnZS5ob25leXdlbGwuY29tIiwKICAianRpIiA6ICI3NjEzYzFhNC0zZGJhLTQ3YjgtODIwYy1hYWE2N2IwZGRlMDEiLAogICJzdWIiIDogIjNmODc5YzIyLTM3YTktNDYyMy1iNTI2LTNiZWUxNjk3MjhhNiIsCiAgImlhdCIgOiAxNzI1NTA2NDk1LAogICJleHAiIDogMTcyNTUwODI5NQp9.OgsMNjfX-49PeOmySuoUHOW9nsfw0umBUEhZzgmzY4U_FgRJK4tVc6rq6DUNM0fw1L0LawbAM0Y3VIxdF9mDWDRGOB5vPuDouIEyEdfYfQ9oRanSCzyqNyRLKU-wtIUB_xqcZ0NrHsOU_JncpPF71jpoO0N0jfPfmrS35ehN0Xhkc9XtBSc1MHt5IIH_Jyw6l-7U4S5Zmd7Pe0olAcnv4t8I-1_wc4WChIa855aVXIP88xZN6fJfN5t90TTMjqhlam6nhDQZiKr0A2oGbz6kL_neFfWEU9Zs9E0qCDxBrraW8XTpOPU_giF9w7viAIjThKxvwekhaxVfFVoZswZQ1g";
  console.log('Using SSO token:', token);

  if (apiPath.includes("/pif/")) {
    console.log('Handling PIF request');
    if (method === 'OPTIONS') {
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
        console.log('Forwarding request to:', targetURL);

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
            console.log('Received response from target:', contentType);

            if (contentType && contentType.includes('application/json')) {
              try {
                const jsonData = JSON.parse(data);
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Content-Type', 'application/json');
                res.status(response.statusCode).json(jsonData);
              } catch (error) {
                console.error('Error parsing JSON:', error.message);
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
          console.error('Error in proxy request:', error.message);
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
      console.log('Handling productDetails request');
      const apigee_token = await generateApigeeToken();
      const targetURL = `https://api.ciq3kgmonc-honeywell1-d3-public.model-t.cc.commerce.ondemand.com/honeywellwebservices/v2/honeywell${apiPath}${queryString}`;
      
      console.log('Forwarding request to:', targetURL);

      const response = await fetch(targetURL, {
        method: req.method,
        headers: {
          'Authorization': `Bearer ${apigee_token}`,
        },
      });

      if (!response.ok) {
        console.error('Error fetching data:', response.statusText);
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
      console.error('Error in productDetails handler:', error.message);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', 'application/json');
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  } else if (apiPath.includes("/download/")) {
    try {
      console.log('Handling download request');
      const binder_token = await generateBinderToken();
      const targetURL = `https://honeywell.bynder.com/api/v4/media/DA1CA705-D8BE-434F-9C08F7A226DA6950${apiPath}${queryString}`;
      
      console.log('Forwarding request to:', targetURL);

      const response = await fetch(targetURL, {
        method: req.method,
        headers: {
          'Authorization': `Bearer ${binder_token}`,
        },
      });

      if (!response.ok) {
        console.error('Error fetching data:', response.statusText);
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
      console.error('Error in download handler:', error.message);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', 'application/json');
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  } else {
    // For any other routes, let Next.js handle it normally
    console.log('No matching route in proxy, continuing to Next.js');
    res.status(404).json({ message: 'Not Found' });
  }
}
