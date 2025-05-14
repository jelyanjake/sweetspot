import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './test.css';

function TestPage() {
  // State management
  const [currentStatus, setCurrentStatus] = useState(null);
  const [sensorValue, setSensorValue] = useState(null);
  const [socket, setSocket] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const sensorRef = useRef(null);

  // Centralized status updater
  const updateSystemStatus = async (newStatus, source = 'local') => {
    setIsUpdating(true);
    try {
      // Update local state
      setCurrentStatus(newStatus);
      
      // Send to Arduino if changing from local
      if (source === 'local' && socket) {
        const command = newStatus === 'reserved' ? 'r' : 'a';
        socket.emit('arduino-command', command);
        console.log(`Sent "${command}" to Arduino`);
      }

      // Update API
      await axios.put(`https://67f50ba7913986b16fa2f9ff.mockapi.io/api/v1/burgers/4`, {
        parking: [
          { id: "1", spotstatus: newStatus === 'reserved' ? "reserved" : String(sensorRef.current || 50) },
          { id: "2", spotstatus: "disabled" },
          { id: "3", spotstatus: "disabled" }
        ],
        status: newStatus === 'reserved' ? 0 : Number(sensorRef.current || 50)
      });

      console.log(`Status updated to ${newStatus} from ${source}`);
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  // API sync with Arduino command sending
  useEffect(() => {
    const fetchAndSync = async () => {
      try {
        const response = await axios.get('https://67f50ba7913986b16fa2f9ff.mockapi.io/api/v1/burgers');
        const testEstablishment = response.data.find(item => item.id === "4");
        
        if (testEstablishment) {
          const apiStatus = testEstablishment.parking[0].spotstatus === "reserved" 
            ? 'reserved' 
            : testEstablishment.status < 30 ? 'occupied' : 'available';
          
          // If API says reserved but we don't, sync both ways
          if (apiStatus === 'reserved' && currentStatus !== 'reserved') {
            await updateSystemStatus('reserved', 'api');
            if (socket) socket.emit('arduino-command', 'r');
          } 
          // Normal status update if different
          else if (apiStatus !== currentStatus) {
            await updateSystemStatus(apiStatus, 'api');
          }
        }
      } catch (error) {
        console.error('API sync error:', error);
      }
    };

    const interval = setInterval(fetchAndSync, 2000);
    return () => clearInterval(interval);
  }, [currentStatus, socket]);

  // Socket.io connection
  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('arduino-data', (data) => {
      const numericValue = Number(data);
      if (!isNaN(numericValue)) {
        sensorRef.current = numericValue;
        setSensorValue(numericValue);
        
        // Auto-update only if not reserved
        if (currentStatus !== 'reserved') {
          const newStatus = numericValue < 30 ? 'occupied' : 'available';
          if (newStatus !== currentStatus) {
            updateSystemStatus(newStatus, 'sensor');
          }
        }
      }
    });

    return () => newSocket.disconnect();
  }, [currentStatus]);

  // Button handlers
  const handleReserve = () => updateSystemStatus('reserved');
  const handleAvailable = () => updateSystemStatus('available');

  // UI styling
  const cardStyle = {
    backgroundColor: 
      currentStatus === 'reserved' ? '#f7c353' :
      currentStatus === 'occupied' ? '#ff6b6b' : '#51cf66',
    color: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.5s ease',
    margin: '20px 0',
    maxWidth: '300px'
  };

  return (
    <section id="features">
      <div className="container">
        <div style={cardStyle}>
          <h3>Parking Spot Status</h3>
          {currentStatus ? (
            <>
              <p>Status: {currentStatus.toUpperCase()}</p>
              <p>Sensor: {sensorValue || 'N/A'}</p>
              <p>Last updated: {new Date().toLocaleTimeString()}</p>
            </>
          ) : (
            <p>Initializing system...</p>
          )}
        </div>

        <div className="button-group">
          <button 
            onClick={handleReserve}
            disabled={isUpdating || currentStatus === 'reserved'}
            className="resbtn"
          >
            {isUpdating ? 'Processing...' : 'RESERVE SPOT'}
          </button>
          <button 
            onClick={handleAvailable}
            disabled={isUpdating || currentStatus !== 'reserved'}
            className="avbtn"
          >
            {isUpdating ? 'Processing...' : 'MAKE AVAILABLE'}
          </button>
        </div>
      </div>
    </section>
  );
}

export default TestPage;