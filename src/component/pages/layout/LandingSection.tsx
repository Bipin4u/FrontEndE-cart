import { useContext } from 'react'
import {AuthContext} from '../../context/AuthContext'
import "../css/landingSection.css";
import "bootstrap/dist/css/bootstrap.min.css";

const LandingSection = () => {
    const { user } = useContext(AuthContext);
    console.log(user)
    return (
      <section className="SectionContainer">
        <div className="landing_section">
          <p>Welcome to </p>
          <p>Bipin's Demo Project</p>
          <p>
            Experience Superior Craftsmanship and Stylish Designs at Your Home.<br/> Our Passion, Your Comfort
          </p>
          <div className="Watchvedio">
            {/* <a href="https://www.youtube.com/watch?v=LXb3EKWsInQ">
              <span>Watch Video</span>
            </a> */}
          </div>
        </div>
      </section>
    );
  }

export default LandingSection







