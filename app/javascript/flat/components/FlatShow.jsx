import React, { useState, useEffect } from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';

import { useHistory } from 'react-router-dom';

import FlatMarker from './FlatMarker';
import './styles/FlatShow.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ReactMapboxGl({ accessToken: "pk.eyJ1IjoibHVsdTkyMjcwIiwiYSI6ImNraXN6dnU1azA4amMycW11YTFtZjJzczgifQ.HZ5XIlT_pmdzbIQd3QWUjw" });

const FlatShow = ({ match }) => {
  useEffect(() => {
    fetchFlat();
  }, []);

  const [flat, setFlat] = useState({});

  const history = useHistory();
  
  const fetchFlat = async () => {
    const fetchFlat = await fetch(`/api/v1/flats/${match.params.id}`)
    const flat = await fetchFlat.json();
    setFlat(flat);
  }

  return (
    <div className="flat-details">
      <h1>{flat.name}</h1>
      <h2>The price for this flat is: {flat.price} EUR</h2>
      <img src={flat.image_url} className="flat-picture" alt="Flat" />
      <Map
        zoom={[14]}
        center={[2.3522, 48.8566]}
        containerStyle={{ height: '100vh', width: '100%' }}
        style="mapbox://styles/mapbox/streets-v11">
        <Marker key={flat.id} coordinates={[flat.lng, flat.lat]} anchor="bottom">
          <FlatMarker price={flat.price} selected={true} />
        </Marker>          
      </Map>
      <div className="my-button">
        <button 
        type="button" 
        className="btn btn-success"
        onClick={() => history.push("/")}
        >Back
        </button>
      </div>
    </div>
  );
}

export default FlatShow;
