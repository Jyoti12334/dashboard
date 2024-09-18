import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

// Establish socket connection to the backend server
const socket = io('http://localhost:5001'); // Replace with your backend URL

const Summary = () => {
    // Set initial state for summary data
    const [summaryData, setSummaryData] = useState({
        totalAttacks: 0,
        maxTrafficVolume: 0,
        averageTrafficVolume: 0,
    });

    useEffect(() => {
        // Listen for the 'summaryData' event from the backend
        socket.on('summaryData', (data) => {
            setSummaryData({
                totalAttacks: data.totalAttacks,
                maxTrafficVolume: data.maxTrafficVolume,
                averageTrafficVolume: data.averageTrafficVolume,
            });
        });

        // Cleanup the socket listener when the component unmounts
        return () => socket.off('summaryData');
    }, []);

    return (
        <div className="summary-container text-white bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Summary</h2>
            <p>Total Attacks: {summaryData.totalAttacks}</p>
            <p>Max Traffic Volume: {summaryData.maxTrafficVolume}</p>
            <p>Average Traffic Volume: {summaryData.averageTrafficVolume.toFixed(2)}</p>
        </div>
    );
};

export default Summary;
