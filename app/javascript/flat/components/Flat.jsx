import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './styles/Flat.scss';

const Flat = ({imgUrl, title, onSelect, id, selected}) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [seconds, setSeconds] = useState(0);
  const description = selected ? 'Click me!' : title;
  const classes = selected ? ' selected' : '';
  const showPath = "/flats/" + id;
  const history = useHistory();

  const handleClick = () => {
    return seconds;
    // console.log(seconds);
  }

  return (
    <div className={'flat rounded' + classes} onClick={handleClick}> 
      <div onClick={() => onSelect(id)} >
        <img src={imgUrl} className="flat-image" alt="Flat" />
      </div>
      <div className="flat-title" onClick={() => history.push(showPath)}>
        {title}
      </div>
    </div>
  );
}

export default Flat;
