// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Alert from './Alert';
import AttackMap from './AttackMap';
import Summary from './Summary';
import TrafficChart from './TrafficChart';

const socket = io('http://localhost:5000');  // Replace with your backend URL

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalAttacks: 0,
    maxTrafficVolume: 0,
    avgTrafficVolume: 0,
  });
  const [alert, setAlert] = useState({ message: '', type: '' });

  useEffect(() => {
    socket.on('metrics-update', (data) => {
      setMetrics(data);
    });

    socket.on('alert', (alertData) => {
      setAlert({ message: alertData.message, type: alertData.type });
    });

    return () => {
      socket.off('metrics-update');
      socket.off('alert');
    };
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">DDoS Detection Dashboard</h1>
        {alert.message && <Alert message={alert.message} type={alert.type} />}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Summary metrics={metrics} />
          <div className="bg-gray-800 p-6 rounded-lg shadow-md col-span-2">
            <TrafficChart />
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md col-span-2">
            <AttackMap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
