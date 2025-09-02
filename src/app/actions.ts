"use server";

import { detectFraud, DetectFraudInput, DetectFraudOutput } from "@/ai/flows/fraud-detection";
import { generateMemorablePassword } from "@/ai/flows/generate-password";

type FraudResult = DetectFraudOutput & { error?: string };

export async function checkForFraud(input: DetectFraudInput): Promise<FraudResult | { error: string }> {
  try {
    const result = await detectFraud(input);
    return result;
  } catch (error) {
    console.error("Error in fraud detection flow:", error);
    // In a real app, you might want to log this error more robustly
    return { error: "Failed to analyze transaction due to an internal error." };
  }
}

export async function generatePassword(): Promise<{ password?: string; error?: string }> {
  try {
    const result = await generateMemorablePassword();
    return { password: result.password };
  } catch (error) {
    console.error("Error in password generation flow:", error);
    return { error: "Failed to generate a password due to an internal error." };
  }
}
