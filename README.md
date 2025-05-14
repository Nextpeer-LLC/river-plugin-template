# River Plugin Template Basic

A basic template for creating River platform plugins. This template demonstrates the core functionality required for a River plugin, including function definition, local development, and AWS Lambda compatibility.

## Features

- Example function that converts text to uppercase
- Local development server
- AWS Lambda-compatible handler
- Input/output validation using Zod
- Unit tests with Vitest

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run tests:
```bash
npm test
```

3. Start local development server:
```bash
npm run dev
```

## Testing the Example Function

With the dev server running, you can test the example function using curl:

```bash
curl -X POST http://localhost:3000/invoke/exampleFunction \
  -H "Content-Type: application/json" \
  -d '{"input": "hello world"}'
```

## Plugin Configuration

The plugin configuration is defined in `plugin.config.json`. This includes:
- Function definitions
- Input/output schemas
- Pricing information

## Development

- Source code is in TypeScript under the `src/` directory
- Functions are defined in `src/functions/`
- Tests are in `src/__tests__/`
- Local development server uses native Node.js http module

