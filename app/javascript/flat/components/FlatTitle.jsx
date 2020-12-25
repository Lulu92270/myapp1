import React from 'react';
import './styles/FlatTitle.scss';

const Title = ({ title, price }) => {
  return (
    <div className="flat-title" >
      <strong>{price} EUR</strong> - {title}
    </div>
  );
}

export default Title;
