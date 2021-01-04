import React from 'react';
import { useHistory } from 'react-router-dom';
import { capitalize } from './functions/Capitalize';
import './styles/Flat.scss';

const Flat = ({imgUrl, title, price, onSelect, id, selected}) => {
  const classes = selected ? ' selected' : '';
  const showPath = "/flats/" + id;
  const history = useHistory();

  return (
    <div className={'flat-content rounded' + classes}> 
      <div onClick={() => onSelect(id)} >
        <img src={imgUrl} className="flat" alt="Flat" />
      </div>
      <div className="flat-title" onClick={() => history.push(showPath)}>
        {`${price} EUR - ${capitalize(title)}`}
      </div>
    </div>
  );
}

export default Flat;
