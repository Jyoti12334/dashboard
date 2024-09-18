// src/components/Alert.js
import React, { useEffect, useState } from 'react';

const Alert = ({ message, type }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 5000); // Hide after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!visible) return null;

  const alertStyles = {
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-500 text-gray-800',
    error: 'bg-red-500 text-white',
  };

  return (
    <div className={`p-4 mb-4 rounded ${alertStyles[type]}`}>
      {message}
    </div>
  );
};

export default Alert;
