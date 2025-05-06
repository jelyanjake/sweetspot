import { useState } from 'react';
import StatusModal from './StatusModal';
import { sendSMS } from './sms';
//import bg from '../assets/bg.jpg';

function HomePage() {
  const [status, setStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [idNum, setIdNum] = useState('');

  return (
    <section id="featureshome">
      <div className="container">
        <div className="section-titlehome">
          <h3>Welcome to</h3>
          <h2>SweetSpot</h2>
          <p>A smart parking system designed to improve parking efficiency.<br />It integrates with a mobile application, providing drivers with a visual guide to their assigned parking space.<br />This feature significantly reduces the time drivers spend searching for parking, offering a convenient and time-saving solution.</p>
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

export default HomePage;