import { describe, it, expect } from 'vitest';
import { exampleFunction } from '../functions/exampleFunction';

describe('exampleFunction', () => {
  it('should convert input string to uppercase', async () => {
    const input = { text: 'hello world' };
    const result = await exampleFunction(input);

    expect(result.original).toBe('hello world');
    expect(result.processed).toBe('HELLO WORLD');
    expect(result.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  });
});
