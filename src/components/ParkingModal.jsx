import { useState,useEffect } from 'react';
import './dashboard.css'; // We'll add styles here
import axios from 'axios';
import './test.css';

const ParkingModal = ({ establishment, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [parkingSpots, setParkingSpots] = useState(establishment.parking || []);
  const [apiData, setApiData] = useState([]);

const handleReserve = async () => {

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
          { id: "1", spotstatus: "reserved" }, // Set to reserved
          { id: "2", spotstatus: "disabled" },
          { id: "3", spotstatus: "disabled" }
        ],
        status: 0, // You can set this to whatever makes sense for reserved status
        isActive: true
      };

      // Update the first parking spot's status to "reserve"
      const updatedParking = testEstablishment.parking.map((spot, index) => 
        index === 0 ? { ...spot, spotstatus: "reserved" } : spot
      );

      await axios.put(
        `https://67f50ba7913986b16fa2f9ff.mockapi.io/api/v1/burgers/4`,
        {
          ...testEstablishment,
          parking: updatedParking,
          status: 0 // Optional: set a special status code for reserved spots
        }
      );

      console.log('Spot reserved successfully');
      // Refresh the data to see the changes
      const response = await axios.get('https://67f50ba7913986b16fa2f9ff.mockapi.io/api/v1/burgers');
      setApiData(response.data);
    } catch (error) {
      console.error('Error reserving spot:', error);
    }
  };

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
    if (spot.spotstatus === "reserved") return "#f7c353";
    return spot.spotstatus < 30 ? "#ff6b6b" : "#51cf66";
  };

  const disbtn1 = (spot) => {
    if (spot.spotstatus === "disabled") return "not-allowed";
  }

  const disbtn2 = (spot) => {
    if (spot.spotstatus === "disabled") return "#aaaaaa";
  }

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
                        : parkingSpots[0].spotstatus === "reserved"
                        ? "Reserved"
                        : spot.spotstatus < 30 
                          ? "Occupied" 
                          : "Vacant"}
                    </p>
                    <br />
                    <br />
                    <button className="resbtn" onClick={handleReserve} style={{ cursor: disbtn1(spot),backgroundColor: disbtn2(spot)}}>Reserve</button>
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
                      : parkingSpots[0].spotstatus === "reserved"
                      ? "Reserved"
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