'use server';
/**
 * @fileOverview Fraud detection AI agent.
 *
 * - detectFraud - A function that handles the fraud detection process.
 * - DetectFraudInput - The input type for the detectFraud function.
 * - DetectFraudOutput - The return type for the detectFraud function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectFraudInputSchema = z.object({
  userId: z.string().describe('The ID of the user.'),
  transactionAmount: z.number().describe('The amount of the transaction.'),
  averageTransactionAmount: z
    .number()
    .describe('The users average transaction amount.'),
});
export type DetectFraudInput = z.infer<typeof DetectFraudInputSchema>;

const DetectFraudOutputSchema = z.object({
  isFraud: z
    .boolean()
    .describe(
      'Whether the transaction is likely to be fraudulent based on the amount compared to the average.'
    ),
  confirmationRequired: z
    .boolean()
    .describe(
      'Whether additional confirmation is required from the user via SMS.'
    ),
  reason: z
    .string()
    .describe('The reason for flagging the transaction as potentially fraudulent.'),
});
export type DetectFraudOutput = z.infer<typeof DetectFraudOutputSchema>;

export async function detectFraud(input: DetectFraudInput): Promise<DetectFraudOutput> {
  return detectFraudFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectFraudPrompt',
  input: {schema: DetectFraudInputSchema},
  output: {schema: DetectFraudOutputSchema},
  prompt: `You are an expert fraud detection system.

You will analyze a transaction amount compared to a user's average transaction amount and determine if the transaction is potentially fraudulent.

Consider a transaction to be fraudulent if the transaction amount is more than 5 times the average transaction amount.

User ID: {{{userId}}}
Transaction Amount: {{{transactionAmount}}}
Average Transaction Amount: {{{averageTransactionAmount}}}

Based on this information, determine if the transaction is fraudulent and if additional confirmation is required from the user via SMS. Provide a reason for your determination.

Follow the schema descriptions closely when generating the output.`,
});

const detectFraudFlow = ai.defineFlow(
  {
    name: 'detectFraudFlow',
    inputSchema: DetectFraudInputSchema,
    outputSchema: DetectFraudOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
