import React, { useEffect, useRef, useState } from 'react';
import StatusModal from './StatusModal';
import io from 'socket.io-client';
//import { fetchBurgers } from '../api/api';
import axios from 'axios';
import ParkingModal from './ParkingModal';

function DashboardPage() {
  const [status, setStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [sensorData, setSensorData] = useState(null);
  const [data, setData] = useState([]);
  const sensorRef = useRef(sensorData);
  const [apiData, setApiData] = useState([]);
  const [selectedEstablishment, setSelectedEstablishment] = useState(null);

  /*useEffect(() => {
    const loadData = async () => {
      try {
        const burgers = await fetchBurgers();
        setData(burgers);
      } catch (err) {
        console.log(err);
      }
    };
    loadData();
    const interval = setInterval(fetchBurgers, 5000); // fetch every 2s

    return () => clearInterval(interval);
  }, []);*/

    useEffect(() => {
    const fetchData = async () => {
      try {
        const burgers = await axios.get('https://67f50ba7913986b16fa2f9ff.mockapi.io/api/v1/burgers');
        setApiData(burgers.data);
      } catch (err) {
        console.error('GET error:', err);
      }
    };

    const getInterval = setInterval(fetchData, 2000);
    return () => clearInterval(getInterval);
  }, []);

  useEffect(() => {
    const updateStatus = async () => {
      try {
        await axios.put('https://67f50ba7913986b16fa2f9ff.mockapi.io/api/v1/burgers/1', {
          status: Number(sensorRef.current),
        });
      } catch (error) {
        console.error('Failed to update status:', error);
      }
    };

    const interval = setInterval(updateStatus, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Connect to the Node.js server
    const socket = io('http://localhost:5000');

    // Listen for the 'arduino-data' event from the server
    socket.on('arduino-data', (data) => {
      setSensorData(data);
      sensorRef.current = data;
    });

    // Clean up when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <section id="features">
      <div className="container">
        <div className="section-title">
          <h2>Available Establishments</h2>
        </div>
        <br />

        {/*}
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

        */}

        <br />
        <div className="features-grid">
              {apiData.map((apiData) => (
                <div key={apiData.id} className="feature-card">
                  <div className='feature-card-content'>
                    <img src={apiData.avatar} alt={apiData.name} />
                    <h3>{apiData.name}</h3>
                    <p>{apiData.description}</p>
                    <p>{apiData.spots} Parking Spots</p>
                    <p>Parking Fee: <span className="price">₱{apiData.price}</span></p>
                  </div>
                  <button className="btn" onClick={() => setSelectedEstablishment(apiData)}>View Parking</button>
                </div>
              ))}
            </div>

      </div>
      <StatusModal
        status={status}
        message={statusMessage}
        onClose={() => setStatus(null)}
      />
      {selectedEstablishment && (
    <ParkingModal
      establishment={selectedEstablishment}
      onClose={() => setSelectedEstablishment(null)}
    />
  )}
    </section>
  );
}

export default DashboardPage;