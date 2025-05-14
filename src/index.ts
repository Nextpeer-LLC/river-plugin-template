import { exampleFunction } from './functions/exampleFunction';
import { ExampleFunctionInput } from './types';

// Support both API Gateway and direct Lambda URL invocations
type Event = {
  functionName: string;
  input: any;
};

async function invokeFunction(functionName: string, input: any): Promise<any> {
  switch (functionName) {
    case 'exampleFunction':
      return exampleFunction(input as ExampleFunctionInput);
    default:
      throw new Error(`Function ${functionName} not found`);
  }
}

export const handler = async (event: Event): Promise<{ statusCode: number; data: any }> => {
  try {
    if (!event.functionName || !event.input) {
      return {
        statusCode: 400,
        data: { error: 'Invalid request', event },
      };
    }
    const data = await invokeFunction(event.functionName, event.input);

    return {
      statusCode: 200,
      data,
    };
  } catch (error) {
    console.error('Error processing request:', error);
    return {
      statusCode: 500,
      data: { error: 'Internal server error' },
    };
  }
};
