"use server";
/**
 * @fileOverview A Genkit tool for fetching cryptocurrency quotes from CoinMarketCap.
 * 
 * - getCryptoQuoteTool - The Genkit tool definition.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const cmcApiKey = process.env.CMC_API_KEY;

if (!cmcApiKey) {
    if (process.env.NODE_ENV !== 'production') {
        console.warn("CoinMarketCap API key not found in .env file. The crypto price tool will be disabled.");
    } else {
        throw new Error("CoinMarketCap API key is not configured.");
    }
}

const getCryptoQuoteSchema = z.object({
  symbol: z.string().describe('The cryptocurrency symbol, e.g., "BTC" or "ETH"'),
});

const getCryptoQuoteOutputSchema = z.object({
  price: z.number().describe("The latest price of the cryptocurrency in USD."),
});

export const getCryptoQuoteTool = ai.defineTool(
    {
        name: 'getCryptoQuote',
        description: 'Get the latest market quote for a cryptocurrency.',
        inputSchema: getCryptoQuoteSchema,
        outputSchema: getCryptoQuoteOutputSchema,
    },
    async (input) => {
        if (!cmcApiKey) {
            throw new Error("CoinMarketCap API key is not configured.");
        }

        const url = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=${input.symbol.toUpperCase()}`;

        try {
            const response = await fetch(url, {
                headers: {
                    'X-CMC_PRO_API_KEY': cmcApiKey,
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("CoinMarketCap API Error:", errorData);
                throw new Error(`CoinMarketCap API error: ${errorData.status.error_message}`);
            }

            const data = await response.json();
            const quote = data.data[input.symbol.toUpperCase()][0].quote.USD;

            return { price: quote.price };
        } catch (error) {
            console.error("Error fetching data from CoinMarketCap:", error);
            throw new Error("Failed to fetch cryptocurrency price.");
        }
    }
);
