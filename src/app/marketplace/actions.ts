
"use server";

import { z } from "zod";
import { admin, adminDb } from "@/lib/firebase-admin";
import { headers } from "next/headers";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const cropListingSchema = z.object({
  name: z.string().min(2, "Crop name must be at least 2 characters long."),
  price: z.coerce.number().positive("Price must be a positive number."),
  unit: z.string().min(1, "Please specify a unit (e.g., kg, lb, bunch)."),
  image: z.string().url("Please enter a valid image URL."),
});

type State = {
  success: boolean;
  error?: string | null;
};

async function getAuthenticatedUser() {
  const idToken = headers().get('Authorization')?.split('Bearer ')[1];
  if (!idToken) {
    return null;
  }
  try {
    // Ensure admin app is initialized before using auth
    if (!admin.apps.length) {
      console.error("Firebase Admin SDK not initialized. Missing service account?");
      return null;
    }
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    console.error("Error verifying auth token:", error);
    return null;
  }
}

export async function addCropListing(values: z.infer<typeof cropListingSchema>): Promise<State> {
  // Ensure adminDb is initialized before proceeding
  if (!adminDb) {
    return {
      success: false,
      error: "The server is not configured correctly. Please check server logs and ensure FIREBASE_SERVICE_ACCOUNT is set.",
    };
  }

  const user = await getAuthenticatedUser();

  if (!user) {
    return {
      success: false,
      error: "Authentication failed. You must be logged in to list a crop.",
    };
  }

  const validatedFields = cropListingSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid data provided.",
    };
  }

  try {
    const docRef = await adminDb.collection("crops").add({
      ...validatedFields.data,
      farmerId: user.uid,
      // Firestore admin SDK uses its own Timestamp
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error adding crop listing to Firestore:", error);
    return {
      success: false,
      error: "An unexpected error occurred while saving the crop. Please try again.",
    };
  }
}
