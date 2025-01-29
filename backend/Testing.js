import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize with your API key (remember to keep this secure - environment variables are best!)
const genAI = new GoogleGenerativeAI("AIzaSyBKYYBMD8eJ6DVMkKqVHozZAIeSwxzfYv4"); // Replace with your actual key

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });  // Or "gemini-pro" if needed

const prompt = "Explain how AI works";

async function generateExplanation() {
  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }], // Correct structure for the prompt
    });

    // Access the generated text correctly
    if (result.response && result.response.candidates && result.response.candidates.length > 0) {
        const generatedText = result.response.candidates[0].content.parts[0].text;
        console.log(generatedText);
    } else {
      console.error("Unexpected response structure:", result); // Handle unexpected responses
    }

  } catch (error) {
    console.error("Error generating content:", error);
  }
}

generateExplanation();