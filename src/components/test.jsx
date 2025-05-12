import { useEffect, useRef, useState } from 'react';
import StatusModal from './StatusModal';
import io from 'socket.io-client';
import axios from 'axios';

function TestPage() {
  const [status, setStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [sensorData, setSensorData] = useState(null);
  const sensorRef = useRef(sensorData);
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://67f50ba7913986b16fa2f9ff.mockapi.io/api/v1/burgers');
        setApiData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Update parking spot status with sensor data
    useEffect(() => {
    const updateParkingStatus = async () => {
      if (!sensorRef.current) return;

      try {
        // Find the test establishment (id:4)
        const testEstablishment = apiData.find(item => item.id === "4") || {
          id: "4",
          name: "Test Establishment",
          avatar: "https://www.wpkube.com/wp-content/uploads/2021/06/debug-mode-wp-1280x720.png",
          description: "For Testing and Debugging",
          price: "0",
          spots: "3",
          parking: [
            { id: "1", spotstatus: Number(sensorRef.current) },
            { id: "2", spotstatus: "disabled" },
            { id: "3", spotstatus: "disabled" }
          ],
          status: Number(sensorRef.current),
          isActive: true
        };

        // Update the first parking spot's status
        const updatedParking = testEstablishment.parking.map((spot, index) => 
          index === 0 ? { ...spot, spotstatus: String(sensorRef.current) } : spot
        );

        await axios.put(
          `https://67f50ba7913986b16fa2f9ff.mockapi.io/api/v1/burgers/4`,
          {
            ...testEstablishment,
            parking: updatedParking,
            status: Number(sensorRef.current)
          }
        );
      } catch (error) {
        console.error('Error updating parking status:', error);
      }
    };

    const interval = setInterval(updateParkingStatus, 2000);
    return () => clearInterval(interval);
  }, [apiData]); // Only recreate when apiData changes

  // Socket.io connection for Arduino data
  useEffect(() => {
    const socket = io('http://localhost:5000');
    socket.on('arduino-data', (data) => {
      setSensorData(data);
      sensorRef.current = data;
    });
    return () => socket.disconnect();
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
        <p>hardwares</p>
        <div style={cardStyle}>
          <h3>Local Arduino Status</h3>
          {sensorData !== null ? (
            <>
              <p>Data: {sensorData}cm</p>
              <p>Status: {sensorData < 30 ? 'Occupied' : 'Vacant'}</p>
              <p>Jelyan's Arduino</p>
            </>
          ) : (
            <p>Waiting for data from Arduino...</p>
          )}
        </div>

        <br />

      </div>
      <StatusModal
        status={status}
        message={statusMessage}
        onClose={() => setStatus(null)}
      />
    </section>
  );
}

export default TestPage;