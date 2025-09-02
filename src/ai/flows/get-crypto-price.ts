'use server';
/**
 * @fileOverview A flow for fetching the current price of a cryptocurrency.
 *
 * - getCryptoPrice - A function that fetches the crypto price.
 * - GetCryptoPriceInput - The input type for the getCryptoPrice function.
 * - GetCryptoPriceOutput - The return type for the getCryptoPrice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getCryptoQuoteTool } from '../tools/cmc-tool';

const GetCryptoPriceInputSchema = z.object({
  symbol: z.string().describe('The cryptocurrency symbol (e.g., BTC, ETH).'),
});
export type GetCryptoPriceInput = z.infer<typeof GetCryptoPriceInputSchema>;

const GetCryptoPriceOutputSchema = z.object({
  price: z.number().describe('The current price of the cryptocurrency in USD.'),
});
export type GetCryptoPriceOutput = z.infer<typeof GetCryptoPriceOutputSchema>;

export async function getCryptoPrice(input: GetCryptoPriceInput): Promise<GetCryptoPriceOutput> {
  return getCryptoPriceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getCryptoPricePrompt',
  input: {schema: GetCryptoPriceInputSchema},
  output: {schema: GetCryptoPriceOutputSchema},
  tools: [getCryptoQuoteTool],
  prompt: `You are an expert financial assistant. Use the provided tools to find the current price of the cryptocurrency with the symbol {{symbol}} and return it in the format requested.`,
});

const getCryptoPriceFlow = ai.defineFlow(
  {
    name: 'getCryptoPriceFlow',
    inputSchema: GetCryptoPriceInputSchema,
    outputSchema: GetCryptoPriceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    
    if (!output) {
      throw new Error('The model did not return a price.');
    }
    
    // The model's output from the tool might not be in the exact final format.
    // We can extract the price and ensure it's a number.
    const price = (output as any).price || 0;

    return { price };
  }
);
