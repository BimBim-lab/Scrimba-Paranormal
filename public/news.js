import { API_BASE } from './config.js';

const eventSource = new EventSource(`${API_BASE}/news`)

const liveContainer = document.getElementById("live-container")


// Handle live price updates 
eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data)
  const story = data.story
  liveContainer.textContent = story
}

// Handle connection loss
eventSource.onerror = () => {
  console.log("Connection lost. Attempting to reconnect...")
}

