import React, { useState } from 'react';
import './AiChat.css';
import axios from 'axios';

function AiChat() {
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
