import { useState } from 'react';
import axios from 'axios';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' };
      setMessages([...messages, userMessage]);

      console.log('Sending message to Rasa:', input);

      // Send message to Rasa
      try {
        const response = await axios.post('http://localhost:5008/webhooks/rest/webhook', { message: input });
        console.log('Response from Rasa:', response.data);
        const botMessages = response.data.map((res: { text: string }) => ({ text: res.text, sender: 'bot' }));
        setMessages([...messages, userMessage, ...botMessages]);
      } catch (error) {
        console.error('Error sending message:', error);
      }

      setInput('');
    }
  };

  return (
    <div>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Type a message..." 
          className="input"
        />
        <button type="submit" className="button">Send</button>
      </form>

      <style jsx>{`
        .chat-window {
          border: 1px solid #ccc;
          padding: 10px;
          height: 300px;
          overflow-y: scroll;
        }
        .message {
          margin: 5px 0;
        }
        .message.user {
          text-align: right;
        }
        .message.bot {
          text-align: left;
        }
        form {
          display: flex;
          margin-top: 10px;
        }
        .input {
          flex: 1;
          padding: 10px;
        }
        .button {
          padding: 10px;
        }
      `}</style>
    </div>
  );
};

export default Chat;
