import React, { useState } from 'react';
import './AiChat.css';
import axios from 'axios';

function AiChat() {
<<<<<<< HEAD
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState('');

  const genAI = new GoogleGenerativeAI('AIzaSyAgbU0vD_q2t6AsRX0U-D_wXKafT3rXlpQ');
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
  
    setLoading(true);
    setError(''); 
  
    try {
      const aiResponse = await model.generate({
        prompt: prompt,
        maxTokens: 150, 
      });
  
      setResponse(aiResponse.text);
    } catch (error) {
      console.error('Error generating AI response:', error);
      setError('Sorry, something went wrong. Please try again later.');
    }
  
    setLoading(false); 
  };
=======
  const [prompt, setPrompt] = useState(''); 
  const [response, setResponse] = useState(''); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState('');
  const serverPort=import.meta.env.VITE_SERVER_PORT;


  const handleSubmit=async()=>{
    setLoading(true);
    setError('');
    try {
      const res=await axios.post(`${serverPort}api/AI/ai-response`,{prompt:prompt});

       setResponse(res.data);
      setLoading(false);
      } catch (error) {
        console.log(error)
        setError(error.message);
        }
    }

>>>>>>> 199b7313173dc62b0321b2e3e20e4a577081880a

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
