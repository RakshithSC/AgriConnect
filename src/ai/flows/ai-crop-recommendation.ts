'use server';

/**
 * @fileOverview An AI Crop Recommendation tool.
 *
 * - aiCropRecommendation - A function that recommends crops based on soil type and region.
 * - AICropRecommendationInput - The input type for the aiCropRecommendation function.
 * - AICropRecommendationOutput - The return type for the aiCropRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AICropRecommendationInputSchema = z.object({
  soilType: z.string().describe('The type of soil available for planting.'),
  region: z.string().describe('The geographical region where the farm is located.'),
});
export type AICropRecommendationInput = z.infer<typeof AICropRecommendationInputSchema>;

const AICropRecommendationOutputSchema = z.object({
  crops: z
    .array(z.string())
    .describe('A list of suitable crops recommended for the given soil type and region.'),
});
export type AICropRecommendationOutput = z.infer<typeof AICropRecommendationOutputSchema>;

export async function aiCropRecommendation(input: AICropRecommendationInput): Promise<AICropRecommendationOutput> {
  return aiCropRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiCropRecommendationPrompt',
  input: {schema: AICropRecommendationInputSchema},
  output: {schema: AICropRecommendationOutputSchema},
  prompt: `You are an expert agricultural advisor. Based on the soil type and region provided, recommend suitable crops to plant.

Soil Type: {{{soilType}}}
Region: {{{region}}}

Consider factors such as climate, common regional crops, and soil composition when making your recommendations.
Return only a simple list of crops without extra descriptions.

Suitable Crops:`, 
});

const aiCropRecommendationFlow = ai.defineFlow(
  {
    name: 'aiCropRecommendationFlow',
    inputSchema: AICropRecommendationInputSchema,
    outputSchema: AICropRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
