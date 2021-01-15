import React from "react";
import './styles/Header.scss';
import { useHistory } from 'react-router-dom';
import './styles/Button.scss';

const Header = ({triggerSearch}) => {
  const history = useHistory();

  return (
    <nav>
      <div className="header">
        <input 
          className="form-control search"
          type="text"
          placeholder="Search"
          aria-label="Search"
          onChange={(event) => {triggerSearch(event.target.value)}}/>
          <button 
            type="button" 
            className="button"
            onClick={() => history.push("/flats/new")}
            >CREATE
          </button>
      </div>
    </nav>
  );
}

export default Header;
