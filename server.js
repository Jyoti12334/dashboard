// backend/server.js
const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

app.use(cors());

// Simulated traffic data
let trafficVolume = [];
let totalAttacks = 0;
let maxTrafficVolume = 0;
let avgTrafficVolume = 0;

// Simulate real-time traffic data
setInterval(() => {
  const currentTraffic = Math.floor(Math.random() * 1000);
  trafficVolume.push(currentTraffic);

  if (trafficVolume.length > 20) trafficVolume.shift(); // Keep last 20 entries

  // Calculate metrics
  maxTrafficVolume = Math.max(...trafficVolume);
  avgTrafficVolume = trafficVolume.reduce((a, b) => a + b, 0) / trafficVolume.length;
  totalAttacks++;

  const labels = Array.from({ length: trafficVolume.length }, (_, i) => `12:${i * 5}`);
  io.emit('traffic-update', { labels, data: trafficVolume });
  io.emit('metrics-update', {
    totalAttacks,
    maxTrafficVolume,
    avgTrafficVolume,
  });
}, 5000); // Update every 5 seconds

// Simulate alerts
setInterval(() => {
  if (Math.random() > 0.8) {
    io.emit('alert', { message: 'DDoS Attack Detected!', type: 'error' });
  }
}, 10000); // Random alert every 10 seconds

const PORT = 5001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
