process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const http = require('http');
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

// Configuration
const NEXTJS_PORT = 3000; // Port where Next.js server is running
const PROXY_PORT = 4000; // Port where proxy server will run

// Create the proxy middleware
const nextjsProxy = createProxyMiddleware({
 // console.log(`Proxy server is running on port ${PROXY_PORT}`);
  target: `http://localhost:${NEXTJS_PORT}`,
  changeOrigin: true,
  ws: true,
});

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


const requestListener = async(req, res) => {
  const { method, headers, url } = req;
  const basePath = '/server1'; // Adjust this based on your setup
  const parsedUrl = parse(url);
  const apiPath = parsedUrl.pathname.replace(basePath, '');
  const queryString = parsedUrl.query ? '?' + parsedUrl.query : '';
  const fullUrl = `${apiPath}${queryString}`;
  //const fullUrl = `${apiPath}${queryString ? '?' + queryString : ''}`;

  // Get cookies from the headers
  const cookies = headers.cookie ? parseCookies(headers.cookie) : {};
  // Access specific cookies
  const token = cookies["2391-token"] || "ewogICJ0eXAiIDogIkpXVCIsCiAgImFsZyIgOiAiUlMyNTYiCn0.ewogICJkb21haW4iIDogIjIzOTEiLAogICJhcHBJZCIgOiAiMjM5IiwKICAiaXNzIiA6ICJidWlsZGluZ3NidC5zdGFnZS5ob25leXdlbGwuY29tIiwKICAianRpIiA6ICI1MDM5ZGM0ZS00NWZkLTQyYjAtYjhkNy1iNThjODcxNzAxYzgiLAogICJzdWIiIDogIjU2NzdlYTc2LWY5YjYtNGIzMS05NGEzLTU5MDI0ZDU1ZDMyYiIsCiAgImlhdCIgOiAxNzI4MDM2NDY3LAogICJleHAiIDogMTcyODAzODI2Nwp9.hWyUUMTxAIW0WyEEgN-ggH6J7fULP5vg16aIQZnbbx5qI4p2ggxdbu9WmQZDzVrF4lYbm1RJ5PxA1mxH1IFQgbWST7GpzpL8L1BbZCYll6L_Xeu-AYugPv4E-3xAZVPekWLqZX_qOK53_DPqCO5gi6tuX89ByHmSi1amLPO-RC-uBy1BP5UFQf1KX6BNw63nzZkwpBLJCSh4R1_o5r6dHZ2nf9zYfayc2rP24D4zG0pZ7lbtSRT1suaachpB6UKbwiujguECOPOspSGWxUfPiPcr-ymJoo89xcl42Fe_yO1LLR6Pd3hIv7i980Kp3Xkw2BocdD1lQeHZSFCA4-MzSA";

  if (apiPath.includes("/pif/")) {
    if (method === 'OPTIONS') {
      // CORS Preflight
      res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      });
      res.end();
    } else {
      const targetURL = "https://buildingsbt.stage.honeywell.com" + fullUrl;
      //const targetURL = `https://buildingsbt.stage.honeywell.com${fullUrl}`;
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
            // Check the content type before parsing
            const contentType = response.headers['content-type'];

            if (contentType && contentType.includes('application/json')) {
              try {
                const jsonData = JSON.parse(data);
                console.log('Response data:', jsonData);

                res.writeHead(response.statusCode, {
                  'Access-Control-Allow-Origin': '*',
                  'Content-Type': 'application/json'
                });
                res.end(JSON.stringify(jsonData));
              } catch (error) {
                console.error('Parsing error:', error);
                res.writeHead(500, {
                  'Access-Control-Allow-Origin': '*',
                  'Content-Type': 'application/json'
                });
                res.end(JSON.stringify({ message: 'Internal Server Error', error: error.message }));
              }
            } else {
              console.error('Unexpected response format:', data);
              res.writeHead(response.statusCode, {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'text/plain'
              });
              res.end(data); // Send the raw response if it's not JSON
            }
          });
        });

        request.on('error', (error) => {
          console.error('Request error:', error);
          res.writeHead(500, {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          });
          res.end(JSON.stringify({ message: 'Internal Server Error', error: error.message }));
        });

        request.write(requestData);
        request.end();
      });
    }
  } 

  else if (apiPath.includes("/productDetails/")) {
    try {
      const httpMethod = req.method;
      // Ensure apigee_token is defined
      const apigee_token = await generateApigeeToken();

      // New API handling logic
     // const targetURL = `https://api.ciq3kgmonc-honeywell1-d3-public.model-t.cc.commerce.ondemand.com/honeywellwebservices/v2/honeywell${apiPath}${queryString ? '?' + queryString : ''}`;
     const targetURL = `https://api.ciq3kgmonc-honeywell1-d3-public.model-t.cc.commerce.ondemand.com/honeywellwebservices/v2/honeywell${apiPath}${queryString ? queryString : ''}`;
      console.log('HTTP Method:', httpMethod);
      console.log('Target URL:', targetURL);
      console.log('Apigee Token:', apigee_token);
      //console.log('Target URL:', targetURL, 'Apigee Token:', apigee_token);

      const response = await fetch(targetURL, {
        method: httpMethod,
        headers: {
          'Authorization': "Bearer " + apigee_token,
        }
      });

     //if (!response.ok) {
       // console.error(`Response not OK. Status: ${response.status}. Text: ${response.statusText}`);
        //throw new Error(`HTTP error! status: ${response.status}`);
      //}
      if (!response.ok) {
        console.error(`Response not OK. Status: ${response.status}. Text: ${response.statusText}`);
        res.writeHead(response.status, {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify({ message: 'Error fetching data', statusText: response.statusText }));
        return;
      }

      const data = await response.json();
      console.log('Response data:', data);

      //return {
        //statusCode: 200,
        //headers: {
          //'Access-Control-Allow-Origin': '*'
        //},
        //body: JSON.stringify(data)
      //};
      res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(data));
  
    
    } catch (error) {
      console.error('Fetch error:', error);
      res.writeHead(500, {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'Internal Server Error', error: error.message }));
      //return {
        //statusCode: 500,
       // headers: {
          //'Access-Control-Allow-Origin': '*'
       // },
        //body: JSON.stringify({ message: 'Internal Server Error', error: error.message })
      //};
    }
  } 
  else if (apiPath.includes("/download/")) {
    const httpMethod = req.method;
    try {
      // Ensure binder_token is defined
      const binder_token = await generateBinderToken();

      // New API handling logic
      const targetURL = `https://honeywell.bynder.com/api/v4/media/DA1CA705-D8BE-434F-9C08F7A226DA6950${apiPath}${queryString ? '?' + queryString : ''}`;

      console.log('Binder Target URL:', targetURL, 'binder_token:', binder_token);

      const response = await fetch(targetURL, {
        method: httpMethod,
        headers: {
          'Authorization': "Bearer " + binder_token,
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(data));
  
    
    } catch (error) {
      console.error('Fetch error:', error);
      res.writeHead(500, {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'Internal Server Error', error: error.message }));
      //return {
        //statusCode: 500,
       // headers: {
          //'Access-Control-Allow-Origin': '*'
       // },
        //body: JSON.stringify({ message: 'Internal Server Error', error: error.message })
      //};
    }
  } 
  
  else {
    // Forward all other requests to the Next.js server
    nextjsProxy(req, res, (err) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      }
    });
  }
};

const server = http.createServer(requestListener);

server.listen(PROXY_PORT, () => {
  console.log(`Proxy server is running on port ${PROXY_PORT}`);

});