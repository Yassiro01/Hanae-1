import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY not found in environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateLoveNote = async (): Promise<string> => {
  const ai = getAiClient();
  if (!ai) {
    return "Even without AI, I love you more than words can say! ❤️";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Write a very short, cute, and witty romantic poem (max 4 lines) about saying 'Yes' to a marriage proposal. Make it sweet and funny.",
    });
    
    return response.text || "Roses are red, violets are blue, I'm so happy I have you! ❤️";
  } catch (error) {
    console.error("Error generating love note:", error);
    return "Roses are red, violets are blue, the AI crashed but I still love you! ❤️";
  }
};