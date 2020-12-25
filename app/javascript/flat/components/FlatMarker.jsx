import React from 'react';
import './styles/FlatMarker.scss';

const FlatMarker = ({price, selected}) => {
  const classes = selected ? 'marker selected' : 'marker';
  return <div className={classes}>{price} EUR</div>
}

export default FlatMarker;
