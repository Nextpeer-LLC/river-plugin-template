import { ExampleFunctionInput, ExampleFunctionOutput } from '../types';

export async function exampleFunction(input: ExampleFunctionInput): Promise<ExampleFunctionOutput> {
  return {
    original: input.input,
    processed: input.input.toUpperCase(),
    timestamp: new Date().toISOString(),
  };
}
