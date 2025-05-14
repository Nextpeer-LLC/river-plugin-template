import http from 'http';
import { handler } from './index';

const PORT = 3000;

// Define the expected request body type
interface RequestBody {
  functionName: string;
  input: any;
}

const server = http.createServer((req, res) => {
  // Only allow POST method
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  // Verify content type is JSON
  const contentType = req.headers['content-type'] || '';
  if (!contentType.includes('application/json')) {
    res.writeHead(415, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        error: 'Unsupported Media Type',
        message: 'Content-Type must be application/json',
      })
    );
    return;
  }

  // Collect chunks in an array for proper binary handling
  const chunks: Buffer[] = [];

  req.on('data', (chunk) => {
    chunks.push(Buffer.from(chunk));
  });

  req.on('end', async () => {
    try {
      // Convert complete body to string
      const body = Buffer.concat(chunks).toString('utf8');

      // Parse JSON body
      let parsedBody: Partial<RequestBody> = {};
      try {
        parsedBody = body ? JSON.parse(body) : {};
      } catch (e) {
        console.warn('Failed to parse request body as JSON:', body);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
        return;
      }

      // Extract functionName and input from the body
      const { functionName, input } = parsedBody;

      if (!functionName) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Missing functionName in request body' }));
        return;
      }

      console.log(`[DEV] Invoking function: ${functionName}`);
      console.log('[DEV] Input:', JSON.stringify(input, null, 2));

      // Create event object for the handler
      const event = { functionName, input: input || {} };
      const result = await handler(event);

      // Send response with proper content type
      res.writeHead(result.statusCode, { 'Content-Type': 'application/json' });

      // Send the data field as the response body
      res.end(JSON.stringify(result.data));

      console.log(`[DEV] Response (${result.statusCode}):`, JSON.stringify(result.data, null, 2));
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
  console.log(`🚀 Dev server running at http://localhost:${PORT}`);
  console.log('Send POST requests to http://localhost:3000 with JSON body:');
  console.log('  { "functionName": "exampleFunction", "input": { your data } }');

  // Show example curl command
  console.log('\nExample curl command:');
  console.log('curl -X POST http://localhost:3000 \\');
  console.log('  -H "Content-Type: application/json" \\');
  console.log('  -d \'{"functionName": "exampleFunction", "input": {"text": "hello world"}}\'');
});
