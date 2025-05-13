import { exampleFunction } from './functions/exampleFunction';
import { ExampleFunctionInput } from './types';

type LambdaEvent = {
  path: string;
  httpMethod: string;
  body: string;
};

async function invokeFunction(functionName: string, input: any): Promise<any> {
  switch (functionName) {
    case 'exampleFunction':
      return exampleFunction(input as ExampleFunctionInput);
    default:
      throw new Error(`Function ${functionName} not found`);
  }
}

export const handler = async (event: LambdaEvent): Promise<any> => {
  try {
    const { path, httpMethod, body } = event;

    if (httpMethod !== 'POST' || !path.startsWith('/invoke/')) {
      return { statusCode: 404, body: JSON.stringify({ error: 'Not found' }) };
    }

    const functionName = path.split('/invoke/')[1];
    const parsed = body ? JSON.parse(body) : {};
    const result = await invokeFunction(functionName, parsed);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error('Error processing request:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
