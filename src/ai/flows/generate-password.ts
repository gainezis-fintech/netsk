'use server';
/**
 * @fileOverview A memorable password generation AI agent.
 *
 * - generateMemorablePassword - A function that handles password generation.
 * - GeneratePasswordOutput - The return type for the generateMemorablePassword function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePasswordOutputSchema = z.object({
  password: z.string().describe('A strong, memorable password of at least 16 characters, containing a mix of words, numbers, and a special character.'),
});
export type GeneratePasswordOutput = z.infer<typeof GeneratePasswordOutputSchema>;

export async function generateMemorablePassword(): Promise<GeneratePasswordOutput> {
  return generatePasswordFlow();
}

const prompt = ai.definePrompt({
  name: 'generatePasswordPrompt',
  output: {schema: GeneratePasswordOutputSchema},
  prompt: `You are a security expert. Generate a single, strong, and memorable password.
  
The password must be at least 16 characters long.
It should be a passphrase-style password, combining 3-4 unrelated English words.
It must include at least one number and at least one special character (e.g., !, @, #, $).
Capitalize at least one of the words.

Example format: Correct-Horse-Battery-Staple!7

Generate a new, unique password following these rules.`,
});

const generatePasswordFlow = ai.defineFlow(
  {
    name: 'generatePasswordFlow',
    outputSchema: GeneratePasswordOutputSchema,
  },
  async () => {
    const {output} = await prompt({});
    return output!;
  }
);
