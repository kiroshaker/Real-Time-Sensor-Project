import './App.css';
import React, { useState, useEffect } from 'react';
import { getAllMessages, getLatestMessage, getKRecentMessages } from './services/api';

function App() {
  const [messages, setMessages] = useState([]);
  const [mode, setMode] = useState("all"); 
  const [kValue, setKValue] = useState(5);

  // This effect only runs once on mount to set maxK
  useEffect(() => {
    async function fetchMessages() {
      try {
        if(mode === "all") {
          const res = await getAllMessages();
          setMessages(res);
        } else if(mode === "latest") {
          const res = await getLatestMessage();
          setMessages([res]);
        } else if (mode === "k") {
          const res = await getKRecentMessages(kValue);
          setMessages(res);
        }

      } catch(err) {
        console.error("Failed to fetch messages: ", err);
      }
    }

    fetchMessages();
  }, [mode, kValue]);

  return (
    <div className="dashboard-container">
      <h1> Real-Time Sensor Dashboard</h1>

      <div className="button-group">
        <button disabled={mode === "all"} onClick={() => setMode("all")}>All Entries</button>
        <button disabled={mode === "latest"} onClick={() => setMode("latest")}>Latest Entry</button>
        <button disabled={mode === "k"} onClick={() => setMode("k")}>Enter Entry Count</button>

      </div>

      {mode === "k" && (
        <div className="enter-k"> 
          <label>Choose # of Entries: </label>
          <input
            type="number"
            value={ kValue }
            onChange={(e) => setKValue(Number(e.target.value))}
            min="1"
          />
        </div>
      )}
      <ul className='message-list'>
        {messages.map((msg, index) => (
          <li key={index} className='message-item'>
              Temperature: {msg.temperature}°F | Humidity: {msg.humidity}% | Time: {new Date(msg.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
