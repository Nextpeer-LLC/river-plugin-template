import { ExampleFunctionInput, ExampleFunctionOutput } from '../types';

/**
 * Example function that converts text to uppercase
 * @param input - The input text to convert
 * @returns The original text and the processed text
 */
export async function exampleFunction(input: ExampleFunctionInput): Promise<ExampleFunctionOutput> {
  return {
    original: input.text,
    processed: input.text.toUpperCase(),
    timestamp: new Date().toISOString(),
  };
}
