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
          <h3 style='color:red' >Welcome to</h3>
          <h2>SweetSpot</h2>
          <p>A smart parking system designed to improve parking efficiency.</p>
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