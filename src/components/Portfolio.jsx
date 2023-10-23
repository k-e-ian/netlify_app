import React from "react";
import profilePhoto from "../assets/ian.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faTwitter,
  faDiscord,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Portfolio() {
  return (
    <div className="portfolio-card">
      <img className="card-image" src={profilePhoto} alt="Avatar" />
      <div className="card-details">
        <h2 className="card-name">Ian Edwin Kitembe</h2>
        <p className="card-occupation">Software Engineer</p>
        <hr />
        <p className="card-about">
          Emerging technologies are my passion. I'm looking for companies who
          see major inefficiencies in our world and aim to use tech to fix them.
        </p>
        <hr />
        <div className="card-contact">
          <span className="card-email">Email: ianedwin@outlook.com</span>
          <br />
          <span className="card-phone">Phone: +254 741 448 692</span>
          <hr />
          <div className="social-icons">
            <a
              href="https://github.com/k-e-ian"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a
              href="https://twitter.com/_i_k_e"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              href="https://www.linkedin.com/in/ian-kitembe-372195192"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a
              href="https://discord.com/invite/FJ98XegM"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faDiscord} />
            </a>
            <a href="mailto:ianedwin@outlook.com" target="_blank">
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
