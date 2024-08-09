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
  target: `http://localhost:${NEXTJS_PORT}`,
  changeOrigin: true,
  ws: true,
});

const requestListener = (req, res) => {
  const { method, headers, url } = req;
  const basePath = '/server1'; // Adjust this based on your setup
  const parsedUrl = parse(url);
  const apiPath = parsedUrl.pathname.replace(basePath, '');
  const queryString = parsedUrl.query ? '?' + parsedUrl.query : '';
  const fullUrl = `${apiPath}${queryString}`;

  // Get cookies from the headers
  const cookies = headers.cookie ? parseCookies(headers.cookie) : {};
  // Access specific cookies
  const token = cookies["2391-token"] || "ewogICJ0eXAiIDogIkpXVCIsCiAgImFsZyIgOiAiUlMyNTYiCn0.ewogICJkb21haW4iIDogIjIzOTEiLAogICJhcHBJZCIgOiAiMjM5IiwKICAiaXNzIiA6ICJidWlsZGluZ3NidC5zdGFnZS5ob25leXdlbGwuY29tIiwKICAianRpIiA6ICIxM2JlMzczYS1jYmYzLTQ2OGMtYjg4Yi00MDk5NzNmMDk1ZmEiLAogICJzdWIiIDogImUwNDk0MWVkLTRmYWYtNGIyMC04NDM3LWQxYTU0MzJlODczNyIsCiAgImlhdCIgOiAxNzIzMTE2ODM0LAogICJleHAiIDogMTcyMzExODYzNAp9.i0oiE9o73jyyWCbIfrvQ0PYjx1Bl7kRk6Fxry_BMlcyKj72Zai4i-0wRPr1pTC-il-bAKilWAJZ9pit6aZ4tXylXQlzbQzSCh3kqeSWBpqB61YwZoA9MuGpvrVdxbUz1KONgo4kVyBUMeeo4HVMrU4Yt4XnHsNH37nOFYzyqXAdFyJkO2Bx7sFpe0cQgb2mTYOSW-2APziqnQXbzNVRLQ4kFjuZaRfm5Gc6rRYpg8fitq0q1np3z5jzu9givn10rMLS9OSNy51krK6lxLEOSypmDWUoQB5EtgLBYOjyD8WTOn1hVZxTNWhde7gtiXkahAUK40EXF6F5eU8kXblAMLw";

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
  } else {
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
