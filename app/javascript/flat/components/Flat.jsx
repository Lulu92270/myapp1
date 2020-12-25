import React from 'react';
import { Link } from 'react-router-dom';

import './styles/Flat.scss';

import Title from './FlatTitle';

const Flat = ({imgUrl, title, price, onClick, id, selected}) => {
  const classes = selected ? ' selected' : '';
  const showPath = "/flats/" + id;

  return (
    <div className={'flat-content' + classes}> 
      <div onClick={() => onClick(id)}>
        <img src={imgUrl} className="flat" alt="Flat" />
      </div>
      <Link to={showPath} >
        <Title title={title} price={price} />
      </Link>
    </div>
  );
}

export default Flat;
