import React, { useEffect, useState } from 'react';
import StatusModal from './StatusModal';
import io from 'socket.io-client';

function DashboardPage() {
  const [status, setStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [sensorData, setSensorData] = useState(null);

  useEffect(() => {
    // Connect to the Node.js server
    const socket = io('http://localhost:5000');

    // Listen for the 'arduino-data' event from the server
    socket.on('arduino-data', (data) => {
      setSensorData(data);
    });

    // Clean up when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  const cardStyle = {
    backgroundColor: sensorData < 30 ? '#ff6b6b' : '#51cf66', // red : green
    color: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
    margin: '20px 0',
    maxWidth: '300px'
  };

  return (
    <section id="features">
      <div className="container">
        <div className="section-title">
          <h2>South Town Centre | Basement</h2>
        </div>
        
        <div style={cardStyle}>
          <h3>Spot #1 Status</h3>
          {sensorData !== null ? (
            <>
              <p>temp data: {sensorData}</p>
              <p>Status: {sensorData < 30 ? 'Occupied' : 'Vacant'}</p>
            </>
          ) : (
            <p>Waiting for data from Arduino...</p>
          )}
        </div>

      </div>
      <StatusModal
        status={status}
        message={statusMessage}
        onClose={() => setStatus(null)}
      />
    </section>
  );
}

export default DashboardPage;