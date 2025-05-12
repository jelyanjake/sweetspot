import { useState,useEffect } from 'react';
import './dashboard.css'; // We'll add styles here
import axios from 'axios';

const ParkingModal = ({ establishment, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [parkingSpots, setParkingSpots] = useState(establishment.parking || []);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : parkingSpots.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev < parkingSpots.length - 1 ? prev + 1 : 0));
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://67f50ba7913986b16fa2f9ff.mockapi.io/api/v1/burgers/${establishment.id}`);
        setParkingSpots(response.data.parking || []);
      } catch (error) {
        console.error('Error fetching parking data:', error);
      }
    };

    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, [establishment.id]);

  const getSpotStatusColor = (spot) => {
    if (spot.spotstatus === "disabled") return "gray";
    return spot.spotstatus < 30 ? "#ff6b6b" : "#51cf66";
  };

  const isTestEstablishment = establishment.name === "Test Establishment";

  return (
    <div className="modal-overlay">
      <div className="parking-modal">
        <h3>{establishment.name} Parking Spots</h3>
        <button className="close-btn" onClick={onClose}>x</button>
        
        <div className={`spots-grid ${isTestEstablishment ? 'grid-view' : ''}`}>
          {parkingSpots.length > 0 ? (
            isTestEstablishment ? (
              // Display all spots in grid for Test Establishment
              parkingSpots.map((spot, index) => (
                spot.picture ? (
                  <div key={index} className="spot-image">
                    <img 
                      src={spot.picture} 
                      alt={`Parking Spot ${spot.id}`} 
                    />
                  </div>
                ) : (
                  <div 
                    key={index}
                    className="spot-status-card"
                    style={{ backgroundColor: getSpotStatusColor(spot) }}
                  >
                    <h4>Spot {spot.id}</h4>
                    <p>
                      {spot.spotstatus === "disabled" 
                        ? "Disabled" 
                        : spot.spotstatus < 30 
                          ? "Occupied" 
                          : "Vacant"}
                    </p>
                  </div>
                )
              ))
            ) : (
              // Original single spot view for other establishments
              parkingSpots[0].picture ? (
                <center>
                <div className="spot-image">
                  <img 
                    src={parkingSpots[0].picture} 
                    alt={`Parking Spot ${parkingSpots[0].id}`} 
                  />
                </div>
                </center>
              ) : (
                <div 
                  className="spot-status-card"
                  style={{ backgroundColor: getSpotStatusColor(parkingSpots[0]) }}
                >
                  <h4>Spot {parkingSpots[0].id}</h4>
                  <p>
                    {parkingSpots[0].spotstatus === "disabled" 
                      ? "Disabled" 
                      : parkingSpots[0].spotstatus < 30 
                        ? "Occupied" 
                        : "Vacant"}
                  </p>
                </div>
              )
            )
          ) : (
            <p>No parking spots available</p>
          )}
        </div>

        {/* Only show navigation for non-Test establishments */}
        {!isTestEstablishment && parkingSpots.length > 1 && (
          <div className="navigation-buttons">
            <button onClick={handlePrev}>Previous</button>
            <span>Spot {currentIndex + 1} of {parkingSpots.length}</span>
            <button onClick={handleNext}>Next</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParkingModal;