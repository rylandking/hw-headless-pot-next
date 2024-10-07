process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
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

// Function to generate Apigee token
const generateApigeeToken = async () => {
  const APIGEE_AUTH_URL = 'https://api.ciq3kgmonc-honeywell1-d3-public.model-t.cc.commerce.ondemand.com/authorizationserver/oauth/token';
  const CLIENT_ID = 'asm';
  const CLIENT_SECRET = '1234';
  
  const response = await fetch(APIGEE_AUTH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      'grant_type': 'client_credentials',
      'client_id': CLIENT_ID,
      'client_secret': CLIENT_SECRET
    })
  });

  if (!response.ok) throw new Error('Failed to generate Apigee token');

  const data = await response.json();
  return data.access_token;
};

// Function to generate Binder token
const generateBinderToken = async () => {
  const Binder_AUTH_URL = 'https://honeywell.bynder.com/v6/authentication/oauth2/token';
  const CLIENT_ID = 'd6aca289-4ca3-47d0-a5ed-a3e1716b062d';
  const CLIENT_SECRET = '0e07b2ae-0c90-44e9-9e94-69dd43c379a4';

  const response = await fetch(Binder_AUTH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      'grant_type': 'client_credentials',
      'client_id': CLIENT_ID,
      'client_secret': CLIENT_SECRET
    })
  });

  if (!response.ok) throw new Error(`Failed to generate Bynder token: ${response.statusText}`);

  const data = await response.json();
  return data.access_token;
};

// Serverless function handler for proxy
export default async function handler(req, res) {
  const { method, headers, url } = req;
  const basePath = '/api/proxy'; // Adjust this path according to your Vercel route
  const parsedUrl = parse(url);
  const apiPath = parsedUrl.pathname.replace(basePath, '');
  const queryString = parsedUrl.query ? '?' + parsedUrl.query : '';
  const fullUrl = `${apiPath}${queryString}`;

  const cookies = headers.cookie ? parseCookies(headers.cookie) : {};
  //const token = cookies["2391-token"] || "ewogICJ0eXAiIDogIkpXVCIsCiAgImFsZyIgOiAiUlMyNTYiCn0.ewogICJkb21haW4iIDogIjc4MSIsCiAgImFwcElkIiA6ICI3OCIsCiAgImlzcyIgOiAiYnVpbGRpbmdzLmhvbmV5d2VsbC5jb20iLAogICJqdGkiIDogIjFkM2QxZTg3LTg4Y2MtNGFmMC1hZjBhLTI2MGM3MGYzNjQ3ZCIsCiAgInN1YiIgOiAiZWNmYzcyMTgtNWVmMi00YTgzLTkyYTUtN2MyOGEwODQwZDdkIiwKICAiaWF0IiA6IDE3MjgyODc0NDAsCiAgImV4cCIgOiAxNzI4Mjg5MjQwCn0.m6wmSpGC79rrBTcGnSDUd_7QwPmYSQoWxyIYKsgi5Ojd8n2vioCAV0sVBC8oNuo9FIzy21LYJxhzy_4PvAL2Iod159X3tvD1LBoI8abWloJRgnjTOwd9i8MwX3ThadEYsmW2AmfiMfd08Uu1Y21xyt5ARlp1w00ayswLfw41CIgXKC4NaFjzsYiDZcSo4eP9SNAymwUOwY3-FOUMatdMQzEcbWxNQ3KUNGFGb9D8iOz8cCJ8qfLjzcVhrUhbssfJO80rWWzxMi25aa_U58zj1ohIvixGz6y2CaZ6AuxH4XA2kXPfYsJZXs1u10DhdoOmDpnqujbs5lOFPcJVMDJrWA";
  const token = cookies["781-token"] || "ewogICJ0eXAiIDogIkpXVCIsCiAgImFsZyIgOiAiUlMyNTYiCn0.ewogICJkb21haW4iIDogIjc4MSIsCiAgImFwcElkIiA6ICI3OCIsCiAgImlzcyIgOiAiYnVpbGRpbmdzLmhvbmV5d2VsbC5jb20iLAogICJqdGkiIDogIjFkM2QxZTg3LTg4Y2MtNGFmMC1hZjBhLTI2MGM3MGYzNjQ3ZCIsCiAgInN1YiIgOiAiZWNmYzcyMTgtNWVmMi00YTgzLTkyYTUtN2MyOGEwODQwZDdkIiwKICAiaWF0IiA6IDE3MjgyODc0NDAsCiAgImV4cCIgOiAxNzI4Mjg5MjQwCn0.m6wmSpGC79rrBTcGnSDUd_7QwPmYSQoWxyIYKsgi5Ojd8n2vioCAV0sVBC8oNuo9FIzy21LYJxhzy_4PvAL2Iod159X3tvD1LBoI8abWloJRgnjTOwd9i8MwX3ThadEYsmW2AmfiMfd08Uu1Y21xyt5ARlp1w00ayswLfw41CIgXKC4NaFjzsYiDZcSo4eP9SNAymwUOwY3-FOUMatdMQzEcbWxNQ3KUNGFGb9D8iOz8cCJ8qfLjzcVhrUhbssfJO80rWWzxMi25aa_U58zj1ohIvixGz6y2CaZ6AuxH4XA2kXPfYsJZXs1u10DhdoOmDpnqujbs5lOFPcJVMDJrWA";
  try {
    if (apiPath.includes("/pif/")) {
      //const targetURL = `https://buildingsbt.stage.honeywell.com${fullUrl}`;
      //const cookieVal = `2391-token=${token}`;
      const targetURL = `https://buildings.honeywell.com${fullUrl}`;
      const cookieVal = `781-token=${token}`;

      let requestData = '';
      req.on('data', chunk => { requestData += chunk; });

      req.on('end', async () => {
        const options = {
          method,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Cookie': cookieVal,
            'Content-Type': 'application/json',
          }
        };

        const request = https.request(targetURL, options, (response) => {
          let data = '';

          response.on('data', (chunk) => { data += chunk; });
          response.on('end', () => {
            res.status(response.statusCode).json(JSON.parse(data));
          });
        });

        request.on('error', (error) => {
          console.error('Request error:', error);
          res.status(500).json({ message: 'Internal Server Error', error: error.message });
        });

        request.write(requestData);
        request.end();
      });
    } else if (apiPath.includes("/productDetails/")) {
      const apigee_token = await generateApigeeToken();
      const targetURL = `https://api.ciq3kgmonc-honeywell1-d3-public.model-t.cc.commerce.ondemand.com/honeywellwebservices/v2/honeywell${apiPath}${queryString}`;

      const response = await fetch(targetURL, {
        method,
        headers: { 'Authorization': `Bearer ${apigee_token}` }
      });

      const data = await response.json();
      res.status(200).json(data);

    } else if (apiPath.includes("/download/")) {
      const binder_token = await generateBinderToken();
      const targetURL = `https://honeywell.bynder.com/api/v4/media/DA1CA705-D8BE-434F-9C08F7A226DA6950${apiPath}${queryString}`;

      const response = await fetch(targetURL, {
        method,
        headers: { 'Authorization': `Bearer ${binder_token}` }
      });

      const data = await response.json();
      res.status(200).json(data);

    } else {
      res.status(404).json({ message: 'Endpoint not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
