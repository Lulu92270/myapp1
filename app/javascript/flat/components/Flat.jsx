import React from 'react';
import { useHistory } from 'react-router-dom';

import './styles/Flat.scss';

const Flat = ({imgUrl, title, price, onClick, id, selected}) => {
  const classes = selected ? ' selected' : '';
  const showPath = "/flats/" + id;
  const history = useHistory();
  
  return (
    <div className={'flat-content' + classes}> 
      <div onClick={() => onClick(id)} >
        <img src={imgUrl} className="flat" alt="Flat" />
      </div>
      <div className="flat-title" onClick={() => history.push(showPath)}>
        <strong>{price} EUR</strong> - {title}
      </div>
    </div>
  );
}

export default Flat;
