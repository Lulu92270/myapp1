import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './styles/Flat.scss';

const Flat = ({imgUrl, title, onSelect, id, selected}) => {
  useEffect(() => {
    const interval = setInterval(() => {
      boolean = !boolean;
      setSecond(boolean ? 'Click me!' : title);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  let boolean = true;
  const [second, setSecond] = useState(title);
  const classes = selected ? ' selected' : '';
  const showPath = "/flats/" + id;
  const history = useHistory();

  return (
    <div className={'flat rounded' + classes} > 
      <div onClick={() => onSelect(id)} >
        <img src={imgUrl} className="flat-image" alt="Flat" />
      </div>
      <div className="flat-title" onClick={() => history.push(showPath)}>
        {selected ? second : title}
      </div>
    </div>
  );
}

export default Flat;
