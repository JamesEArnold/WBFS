import http from 'http';
import httpProxy from 'http-proxy';
import auth from 'basic-auth';

// Create a proxy server with custom application logic
const proxy = httpProxy.createProxyServer({changeOrigin: true, autoRewrite: true, hostRewrite: true, followRedirects: true});


const server = http.createServer(function(req, res) {

  // load from ENVs
  const origin = process.env.ORIGIN;
  const password = process.env.PASSWORD;
  const username = process.env.USERNAME;

  
  
  console.log('ORIGIN:', process.env.ORIGIN);
  console.log('PASSWORD')
  
  const credentials = auth(req);
  console.log('WERE AUTHED');
  if (!credentials || !isAuthed(credentials, username, password)) {
    console.log('WERE DENIED');

    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="example"');
    res.end('Access denied.');
  } else {
    // do nothing
    // res.end('Access granted')
  }


  proxy.on('proxyRes', function(proxyRes, req, res) {
    // console.log('Raw [target] response', JSON.stringify(proxyRes.headers, true, 2));
    
    proxyRes.headers['x-proxy'] = "simple-basic-http-auth-proxy-vercel";
    
    // console.log('Updated [proxy] response', JSON.stringify(proxyRes.headers, true, 2));
    
  });
  proxy.web(req, res, { target: `${origin}` });
  
});

// const port = process.env.AWS_LAMBDA_RUNTIME_API.split(':')[1];
console.log('connections: ', server.connections());
if (server.connections() === 0) {
  console.log(`simple-basic-http-auth-proxy for Vercel started on port ${3000}`);
  try {
    server.listen(3000);
  } catch (error) {
    console.log(JSON.stringify(error));
  }
}


const isAuthed = function (credentials, username, password) {
    return credentials.name === username && credentials.pass === password;
}
