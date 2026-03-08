import React, { useState } from 'react';
import './ChatBot.css'; // Make sure this file exists

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! Ask me anything about our listings.' }
  ]);
  const [input, setInput] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    const botMessage = {
      sender: 'bot',
      text: getAIResponse(input)
    };

    setMessages(prev => [...prev, botMessage]);
    setInput('');
  };

  const getAIResponse = (question) => {
    if (question.toLowerCase().includes('listing')) {
      return 'You can view our current listings on the homepage or ask about a specific address.';
    } else {
      return "I'm only able to answer questions about properties listed by our client.";
    }
  };

  return (
    <div className="chatbot-container">
      <button
        onClick={toggleChat}
        className={isOpen ? 'chatbot-toggle-close' : 'chatbot-toggle-open'}
      >
        {isOpen ? 'Close Chat' : 'Lets Connect!'}
      </button>

      {isOpen && (
        <div className="chatbox">
          <div className="chatbox-header">Ask About Listings</div>
          <div className="chatbox-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chatbox-message ${msg.sender === 'user' ? 'user' : 'bot'}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbox-input-section">
            <input
              type="text"
              placeholder="Type a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="chatbox-input"
            />
            <button onClick={handleSend} className="chatbox-send">Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
