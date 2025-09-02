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
  prompt: `What is the current price of {{symbol}} in USD? Provide only the numerical value.`,
});

const getCryptoPriceFlow = ai.defineFlow(
  {
    name: 'getCryptoPriceFlow',
    inputSchema: GetCryptoPriceInputSchema,
    outputSchema: GetCryptoPriceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
