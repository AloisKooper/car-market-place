import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

// Initialize the client if the key is available
if (process.env.API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
}

export const generateCarAdvice = async (userQuery: string, history: string[]): Promise<string> => {
  if (!ai) {
    return "I'm sorry, my AI connection (API Key) is not configured correctly at the moment.";
  }

  try {
    const modelId = 'gemini-2.5-flash';
    
    // Construct a context-aware prompt
    const systemInstruction = `
      You are "AutoMate", a friendly and highly knowledgeable sales and sourcing assistant for Marie Yashe Auto.
      Marie Yashe Auto is a marketplace importing vehicles and parts from China and Germany to Namibia.
      
      Your Role:
      1. Help users find specific cars or parts in our inventory or from our suppliers.
      2. Explain the import process (sourcing, shipping, customs).
      3. Provide details on vehicles (specs, features) based on general automotive knowledge.
      4. If a user asks for a specific part we don't list, offer to "source it from our global network".
      
      Strict Boundaries:
      1. You are NOT a mechanic. Do not diagnose engine noises or mechanical failures.
      2. If a user asks about a mechanical problem, politely suggest they see a local mechanic, but offer to sell them the replacement parts they might need.
      3. Focus on SALES, STOCK, and SOURCING.
      
      Tone:
      Professional, helpful, efficient, and enthusiastic about cars.
      Format your responses with bullet points if listing items.
    `;

    // Simple history context construction
    const context = history.length > 0 ? `Previous conversation context:\n${history.join('\n')}\n` : '';
    const fullPrompt = `${context}User's current question: ${userQuery}`;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: fullPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I'm checking our inventory, but I couldn't generate a response right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I seem to have stalled. Please try asking me again in a moment.";
  }
};