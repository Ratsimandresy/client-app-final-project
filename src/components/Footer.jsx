import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";
import { Icon } from "semantic-ui-react";

const Footer = () => {
  return (
    <div id="main-footer-container">
      <div id="footer-top-part">
        <div className="divfoote">
          <h2 className="h1-footer">CONTACT US</h2>
          <br />
          <ul>
            <li><Icon name="mail outline" />What's Up Paris</li>
            <li>156 rue de La Mare</li>
            <li>85 600 Paris</li>
            <li>+33 1 455 641 36</li>
          </ul>
        </div>
        <div className="divfoote">
          <h2 className="h1-footer">ABOUT</h2>
          <br />
          <ul>
            <li>Join What's Up Paris</li>
            <li>Community</li>
            <li>Security</li>
            <li>Corporate culture</li>
          </ul>
        </div>
        <div className="divfoote">
          <h2 className="h1-footer">HELP RESSOURCE</h2>
          <ul>
            <br />
            <li>FAQ</li>
            <li>Help Center</li>
            <li>Support</li>
            <li>Cookies policy</li>
            <li>Terms of services</li>
          </ul>
        </div>
        <div className="divfoote">
          <div>
            <h2 className="h1-footer">SOCIAL</h2>
          </div>
          <br />
          <div id="social-logo">
            <Icon name="facebook square" />
            <Icon name="instagram" />
            <Icon name="twitter" />
            <Icon name="linkedin" />
          </div>
        </div>
      </div>
      <div id="footer-bottom-part">
        <p>
          © autumn 2020 | <Icon name="heart"/> Rico Laura Laurent <Icon name="heart"/>| 248 Iron hack Cohort | Thankkkkx buddies
        </p>
      </div>
    </div>
  );
};

export default Footer;
