// pages/api/proxyRequest.js

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

const requestListener = async(req, res) => {
    const { method, headers, url } = req;
    const basePath = 'api/proxyRequest'; // Adjust this based on your setup
    const parsedUrl = parse(url);
    const apiPath = parsedUrl.pathname.replace(basePath, '');
    const queryString = parsedUrl.query ? '?' + parsedUrl.query : '';
    const fullUrl = `${apiPath}${queryString}`;
    //const fullUrl = `${apiPath}${queryString ? '?' + queryString : ''}`;
  
    // Get cookies from the headers
    const cookies = headers.cookie ? parseCookies(headers.cookie) : {};
    // Access specific cookies
    const token = cookies["2391-token"] || "ewogICJ0eXAiIDogIkpXVCIsCiAgImFsZyIgOiAiUlMyNTYiCn0.ewogICJkb21haW4iIDogIjIzOTEiLAogICJhcHBJZCIgOiAiMjM5IiwKICAiaXNzIiA6ICJidWlsZGluZ3NidC5zdGFnZS5ob25leXdlbGwuY29tIiwKICAianRpIiA6ICJkM2EzZGM0My00OWQ2LTRkNTAtYWYwZS1mNDE0YWUxMTZjYjYiLAogICJzdWIiIDogIjRhMDY5NTZmLTFlMTItNDQ1ZS1hYTA3LWU1OGZiODI0OWFhNyIsCiAgImlhdCIgOiAxNzI1MzUzOTQ2LAogICJleHAiIDogMTcyNTM1NTc0Ngp9.Licz3me3NQRIb2w6GeS4cD_k9vB7SQ3LM1ToNvHTeu8leVy0IXlvV9t5WAye8EdsQQak8Il4gv2Dlkjvf9EW0qP--vhjjCtY2cpkXjhzgaShRfwd3jzzxfmsgpGjOPbNK3YzRvueHI3jbdA-X3jteZYEtxeRCXl0luGZoRygT1VRb8c1jJ7C6_jFDk0HQGZX2fXvCemMMxL0wKhj82Mmk93lZJOUcpAnXZIl9Myu6vPYCZv_tQQIaBUE1sIYZ9qOZ64DVhY96QoKEbBJYaSDSAvKAbM6j7NTL1X9zljtg6UdtDbykfTRruSEsij_Xnzow_JMfln_QInNjvEPo5VcRw";
  
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
    } }