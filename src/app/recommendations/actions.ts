"use server";

import { aiCropRecommendation, AICropRecommendationInput } from "@/ai/flows/ai-crop-recommendation";
import { z } from "zod";

const formSchema = z.object({
  soilType: z.string().min(3, "Soil type must be at least 3 characters long."),
  region: z.string().min(3, "Region must be at least 3 characters long."),
});

type State = {
  success: boolean;
  data?: { crops: string[] } | null;
  error?: string | null;
};

export async function getCropRecommendation(values: AICropRecommendationInput): Promise<State> {
  const validatedFields = formSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid input. Please check your fields and try again.",
    };
  }

  try {
    const result = await aiCropRecommendation(validatedFields.data);
    if (result && result.crops) {
      return { success: true, data: result };
    } else {
      return { success: false, error: "The AI could not generate a recommendation. Please try again." };
    }
  } catch (error) {
    console.error("AI Crop Recommendation Error:", error);
    return {
      success: false,
      error: "An unexpected error occurred while communicating with the AI. Please try again later.",
    };
  }
}
