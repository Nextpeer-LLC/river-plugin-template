import http from 'http';
import { handler } from './index';

const PORT = 3000;

const server = http.createServer((req, res) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      const event = {
        path: req.url || '',
        httpMethod: req.method || '',
        body,
      };

      const result = await handler(event);
      res.writeHead(result.statusCode, { 'Content-Type': 'application/json' });
      res.end(result.body);
    } catch (error) {
      console.error('Server error:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal server error' }));
    }
  });

  req.on('error', (error) => {
    console.error('Request error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Request error' }));
  });
});

server.listen(PORT, () => {
  console.log(`Dev server running at http://localhost:${PORT}`);
});
