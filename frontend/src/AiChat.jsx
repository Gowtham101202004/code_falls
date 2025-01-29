import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './AiChat.css';

function AiChat() {
  const [prompt, setPrompt] = useState(''); // User's input message
  const [response, setResponse] = useState(''); // AI's response
  const [loading, setLoading] = useState(false); // Loading state for the AI response
  const [error, setError] = useState(''); // Error message state

  // Create a new instance of GoogleGenerativeAI with your API key
  const genAI = new GoogleGenerativeAI('AIzaSyAgbU0vD_q2t6AsRX0U-D_wXKafT3rXlpQ');
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  // Handle user input and AI response generation
  const handleSubmit = async () => {
    if (!prompt.trim()) return; // Ensure prompt is not empty
  
    setLoading(true);
    setError(''); // Clear any previous errors
  
    try {
      // Generate the AI response using an available method
      const aiResponse = await model.generate({
        prompt: prompt,
        maxTokens: 150, // Limit the length of the response
      });
  
      // Set the AI response to the state
      setResponse(aiResponse.text);
    } catch (error) {
      console.error('Error generating AI response:', error);
      setError('Sorry, something went wrong. Please try again later.');
    }
  
    setLoading(false); // End loading state
  };
  

  return (
    <div className="ai-chat-container">
      <div className="ai-chat-popup">
        <div className="ai-chat-header">
          <span>AI Chat</span>
        </div>
        <div className="ai-chat-content">
          {/* Display the error, loading state, or AI response */}
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : (
            <p>{response || 'How can I assist you today?'}</p>
          )}
        </div>
        <div className="ai-chat-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AiChat;
