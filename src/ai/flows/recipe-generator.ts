'use server';

/**
 * @fileOverview An AI agent to generate step-by-step recipes for menu dishes.
 *
 * - getRecipe - A function that takes a dish name and description and returns a step-by-step recipe.
 * - RecipeInput - The input type for the getRecipe function.
 * - RecipeOutput - The return type for the getRecipe function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecipeInputSchema = z.object({
  dishName: z
    .string()
    .describe('The name of the dish for which to generate a recipe.'),
  dishDescription: z
    .string()
    .describe('The description of the dish.'),
});
export type RecipeInput = z.infer<typeof RecipeInputSchema>;

const RecipeOutputSchema = z.object({
  steps: z
    .array(z.string())
    .describe('An array of strings, where each string is a step in the recipe.'),
  ingredients: z
    .array(z.string())
    .describe('An array of strings, listing the ingredients for the dish.'),
});
export type RecipeOutput = z.infer<typeof RecipeOutputSchema>;

export async function getRecipe(
  input: RecipeInput
): Promise<RecipeOutput> {
  return recipeGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recipeGeneratorPrompt',
  input: {schema: RecipeInputSchema},
  output: {schema: RecipeOutputSchema},
  prompt: `You are a master chef. Provide a step-by-step recipe for the dish described below.

Dish Name: {{{dishName}}}
Dish Description: {{{dishDescription}}}

First, list all the necessary ingredients. Then, provide clear, easy-to-follow steps for preparation and cooking.

Format your output as a JSON object with "ingredients" (an array of strings) and "steps" (an array of strings).`,
});

const recipeGeneratorFlow = ai.defineFlow(
  {
    name: 'recipeGeneratorFlow',
    inputSchema: RecipeInputSchema,
    outputSchema: RecipeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
