import { useNavigate } from 'react-router-dom';
import './home.css'

function HomePage() {
  const navigate = useNavigate();

  const homebtn = () => {
    navigate('/dashboard');
  }

  return (
    <section id="featureshome">
      <div className="container">
        <div className="section-titlehome">
          <br />
          <br />
          <br />
          <br />
          <h2>SweetSpot</h2>
          <br />
          <p><i>The solution to improve parking efficiency.</i></p>
        </div>
        <br />
        <br />
        <button className='homebtn' onClick={homebtn}>Get Started</button>
      </div>
    </section>
  );
}

export default HomePage;