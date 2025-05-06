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
        <div className="section-title">
          <h2>Sweetspot Landing Page</h2>
          <p>testing3</p>
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