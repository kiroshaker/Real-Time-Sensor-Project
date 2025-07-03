import './App.css';
import React, { useState, useEffect } from 'react';
import { getLatestMessage, getMessagesSince } from './services/api';
import SensorChart from './components/SensorChart'

function App() {
  const [messages, setMessages] = useState([]);
  const [mode, setMode] = useState("Last 10 minutes"); 
  const [selectedMinutes, setSelectedMinutes] = useState(10);
  const timeOptions = [
  { label: "Last 10 minutes", value: 10 },
  { label: "Last 30 minutes", value: 30 },
  { label: "Last hour", value: 60 },
  { label: "Last 6 hours", value: 360 },
  { label: "Last 24 hours", value: 1440 },
  { label: "Last week", value: 10080 }
  ];
  function handleTimeChange(e) {
  const minutes = Number(e.target.value);
  setSelectedMinutes(minutes);
  setMode("time-range");  // Optional if you’re using a mode switch
  }

  useEffect(() => {
    async function fetchTimeRangeData() {
    const since = new Date(Date.now() - selectedMinutes * 60 * 1000).toISOString();
    const data = await getMessagesSince(since); 
    setMessages(data);
  }

  if (mode === "time-range") {
    fetchTimeRangeData();
  }
  }, [mode, selectedMinutes]);

  return (
    <div className="dashboard-container">
      <h1> Real-Time Sensor Dashboard</h1>

      <div className="button-group">
        <select value={selectedMinutes} onChange={handleTimeChange}>
        {timeOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>
        {opt.label}
        </option>
        ))}
        </select>
      </div>
      <ul className='message-list'>
        {messages.map((msg, index) => (
          <li key={index} className='message-item'>
              Temperature: {msg.temperature}°F | Humidity: {msg.humidity}% | Time: {new Intl.DateTimeFormat('en-US', { 
                                                                                      year: 'numeric',
                                                                                      month: 'short',
                                                                                      day: 'numeric',
                                                                                      hour: 'numeric',
                                                                                      minute: '2-digit',
                                                                                      hour12: true
                                                                                      }).format(new Date(msg.timestamp))
                                                                                  }
          </li>
        ))}
      </ul>
      <div className='sensor-chart'>
        <SensorChart messages={messages} />
      </div>
    </div>
  );
}

export default App;
