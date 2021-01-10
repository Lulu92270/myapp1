import React from 'react';

import './styles/Footer.scss';

const Footer = () => {
  return(
    <div className="main-footer">
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>Front End</h1>
            <ul className="list-unstyled">
              <li>React Framework</li>
              <li>Latest Hooks</li>
              <li>No Class Components</li>
            </ul>
          </div>
          <div className="col">
            <h1>Back End</h1>
            <ul className="list-unstyled">
              <li>Ruby on Rails</li>
              <li>MVC Framework</li>
              <li>Webpacker Bundling JavaScript</li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} Lucien Andrieux | All rights reserved | Terms of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
