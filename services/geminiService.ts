
import { GoogleGenAI, Type } from "@google/genai";
import { AlternativeResponse } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      title: {
        type: Type.STRING,
        description: "A short, one-line title or claim summarizing the alternative answer.",
      },
      answer: {
        type: Type.STRING,
        description: "A concise, standalone paragraph explaining the full alternative answer.",
      },
      probability: {
        type: Type.NUMBER,
        description: "An estimated internal probability score for this reasoning path, between 0 and 1.",
      },
      reasoningTrace: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
        },
        description: "An array of 2-5 bullet points representing the key premises or reasoning steps.",
      },
    },
    required: ["title", "answer", "probability", "reasoningTrace"],
  },
};

export const generateVSMResponse = async (query: string): Promise<AlternativeResponse[]> => {
  const prompt = `
    You are an AI model with a feature called Verbalized Sampling Mode (VSM).
    When a user asks a question, instead of giving one answer, you must provide 3-5 distinct, plausible alternative responses.
    For the following user query, please generate a VSM response.

    User Query: "${query}"

    Your output MUST be a valid JSON array. Each object in the array represents one alternative and MUST strictly follow the provided JSON schema.
    The reasoningTrace should contain between 2 and 5 key premises or steps.
    Ensure the probabilities across all alternatives are varied and reflect a plausible distribution of internal confidence, but they do not need to sum to 1.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8,
      },
    });

    const jsonText = response.text.trim();
    // It's good practice to validate the parsed object, but the schema should ensure correctness.
    const parsedResponse = JSON.parse(jsonText) as AlternativeResponse[];
    return parsedResponse;
  } catch (error) {
    console.error("Error generating VSM response:", error);
    // You might want to throw a more user-friendly error message here
    throw new Error("Failed to get a valid response from the AI. The model may have returned an unexpected format.");
  }
};
