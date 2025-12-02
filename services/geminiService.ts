import { GoogleGenAI, SchemaType, Type } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // In a real app, handle missing key gracefully
const ai = new GoogleGenAI({ apiKey });

export const generateNotice = async (topic: string, audience: string): Promise<string> => {
  if (!apiKey) return "API Key is missing. Please configure it.";
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a professional and concise school notice about: "${topic}". The target audience is: ${audience}. Keep it under 100 words. Format as plain text suitable for a dashboard notification.`,
    });
    return response.text || "Failed to generate notice.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating content. Please try again.";
  }
};

export const analyzeStudentPerformance = async (studentName: string, dataSummary: string): Promise<string> => {
  if (!apiKey) return "API Key is missing.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze the following student performance data for ${studentName} and provide a brief, encouraging 2-sentence summary for their report card. Data: ${dataSummary}`,
    });
    return response.text || "Analysis failed.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error analyzing data.";
  }
};

export const askAiAssistant = async (query: string, context: string): Promise<string> => {
  if (!apiKey) return "API Key is missing.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an intelligent assistant for a School Management System. 
      Context of current view: ${context}.
      User Query: "${query}".
      Provide a helpful, professional answer.`,
    });
    return response.text || "I couldn't understand that.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI Service is temporarily unavailable.";
  }
};
