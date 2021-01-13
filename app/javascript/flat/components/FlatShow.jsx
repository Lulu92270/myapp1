import React, { useState, useEffect } from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import faker from 'faker';

import { capitalize } from './functions/Capitalize';
import { useHistory } from 'react-router-dom';
import { fetchItem } from './Fetches';

import FlatMarker from './FlatMarker';
import './styles/FlatShow.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ReactMapboxGl({ accessToken: process.env.REACT_APP_MAPBOX_TOKEN });

const FlatShow = ({ match }) => {
  useEffect(() => {
    fetchItem(setFlat, match.params.id);
  }, []);

  const [flat, setFlat] = useState({});
  const location = flat != 'undefined' ? [-9.142685, 38.736946] : [flat.lng, flat.lat];
  const history = useHistory();

  return (
    <div className="flat-details">
      <Card className="card">
        <Card.Img variant="top" src={flat.image_url} />
        <Card.Body>
          <Card.Title>{`${capitalize(flat.name)} - ${flat.price} €`}</Card.Title>
          <Card.Text>
            {faker.commerce.productDescription()}
          </Card.Text>
          <Button variant="success" className="ml-0 rounded" onClick={() => history.push("/")}>Back</Button>
        </Card.Body>
      </Card>
      <div className="map-show">
        <Map
          zoom={[10]}
          center={location}
          containerStyle={{ height: '100vh', width: '100%' }}
          style="mapbox://styles/mapbox/streets-v11"
          animationOptions={{ duration: 10000 }}>
          <Marker key={flat.id} coordinates={location} anchor="bottom">
            <FlatMarker price={flat.price} selected={true} />
          </Marker>          
        </Map>
      </div>
    </div>
  );
}

export default FlatShow;
