'use server';

/**
 * @fileOverview An AI agent to provide wine pairing suggestions for menu dishes.
 *
 * - getWinePairingSuggestions - A function that takes a dish description and optional user preferences, and returns wine pairing suggestions.
 * - WinePairingInput - The input type for the getWinePairingSuggestions function.
 * - WinePairingOutput - The return type for the getWinePairingSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WinePairingInputSchema = z.object({
  dishDescription: z
    .string()
    .describe('The description of the dish for which to suggest wine pairings.'),
  userPreferences: z
    .string()
    .optional()
    .describe('Optional: The user\'s wine preferences (e.g., \'I prefer dry wines\').'),
});
export type WinePairingInput = z.infer<typeof WinePairingInputSchema>;

const WinePairingOutputSchema = z.object({
  wineSuggestions: z
    .array(z.string())
    .describe('An array of wine suggestions that pair well with the dish.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the wine suggestions, explaining why they complement the dish.'),
});
export type WinePairingOutput = z.infer<typeof WinePairingOutputSchema>;

export async function getWinePairingSuggestions(
  input: WinePairingInput
): Promise<WinePairingOutput> {
  return winePairingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'winePairingPrompt',
  input: {schema: WinePairingInputSchema},
  output: {schema: WinePairingOutputSchema},
  prompt: `You are a sommelier. Provide wine pairing suggestions for the dish described below.

Dish Description: {{{dishDescription}}}

{{#if userPreferences}}
User Preferences: {{{userPreferences}}}
{{/if}}

Consider the flavors, ingredients, and preparation methods of the dish. Explain your reasoning for each suggestion.

Format your output as a JSON object with \"wineSuggestions\" (an array of wine names) and \"reasoning\" (a string explaining the pairings).`,
});

const winePairingFlow = ai.defineFlow(
  {
    name: 'winePairingFlow',
    inputSchema: WinePairingInputSchema,
    outputSchema: WinePairingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
