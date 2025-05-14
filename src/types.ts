import { z } from 'zod';

export const ExampleFunctionInput = z
  .object({
    text: z.string().describe('The text to process'),
  })
  .describe('The input for the example function');

export type ExampleFunctionInput = z.infer<typeof ExampleFunctionInput>;

export const ExampleFunctionOutput = z.object({
  original: z.string(),
  processed: z.string(),
  timestamp: z.string(),
});

export type ExampleFunctionOutput = z.infer<typeof ExampleFunctionOutput>;
