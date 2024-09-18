// src/components/TrafficChart.js
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import io from 'socket.io-client';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const socket = io('http://localhost:5001'); // Change to port 5001
  // Replace with your backend URL

const TrafficChart = () => {
  const [trafficData, setTrafficData] = useState({
    labels: [],
    datasets: [{ label: 'Traffic Volume', data: [], borderColor: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.2)', fill: true }],
  });

  useEffect(() => {
    socket.on('traffic-update', (newData) => {
      setTrafficData({
        labels: newData.labels,
        datasets: [{ label: 'Traffic Volume', data: newData.data, borderColor: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.2)', fill: true }],
      });
    });

    return () => socket.off('traffic-update');
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#ffffff',
        },
      },
      y: {
        ticks: {
          color: '#ffffff',
        },
      },
    },
  };

  return <Line data={trafficData} options={options} />;
};

export default TrafficChart;
