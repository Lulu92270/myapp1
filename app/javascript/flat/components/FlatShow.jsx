import React, { useState, useEffect } from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import faker from 'faker';

import { capitalize } from './functions/Capitalize';
import { useHistory } from 'react-router-dom';

import FlatMarker from './FlatMarker';
import './styles/FlatShow.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ReactMapboxGl({ accessToken: process.env.REACT_APP_MAPBOX_TOKEN });

const FlatShow = ({ match }) => {
  useEffect(() => {
    fetchFlat();
  }, []);

  const [flat, setFlat] = useState({});
  const [center, setCenter] = useState([2.3522, 48.8566]);
  const history = useHistory();
  
  const fetchFlat = async () => {
    const fetchFlat = await fetch(`/api/v1/flats/${match.params.id}`)
    const flat = await fetchFlat.json();
    setFlat(flat);
    setCenter([flat.lng, flat.lat]);
  }

  return (
    <div className="flat-details">
      <Card className="card">
        <Card.Img variant="top" src={flat.image_url} />
        <Card.Body>
          <Card.Title>{`${capitalize(flat.name)} - ${flat.price} €`}</Card.Title>
          <Card.Text>
            {faker.commerce.productDescription()}
          </Card.Text>
          <Button variant="success" className="ml-0" onClick={() => history.push("/")}>Back</Button>
        </Card.Body>
      </Card>
      <div className="map">
        <Map
          zoom={[10]}
          center={center}
          containerStyle={{ height: '100vh', width: '100%' }}
          style="mapbox://styles/mapbox/streets-v11"
          animationOptions={{ duration: 10000 }}>
          <Marker key={flat.id} coordinates={center} anchor="bottom">
            <FlatMarker price={flat.price} selected={true} />
          </Marker>          
        </Map>
      </div>
    </div>
  );
}

export default FlatShow;
