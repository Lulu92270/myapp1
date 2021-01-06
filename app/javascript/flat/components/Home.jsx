import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { capitalize } from './functions/Capitalize';

import { fetchItems, fetchDelete } from './Fetches';
import Flat from './Flat';
import FlatMarker from './FlatMarker';

import './styles/Home.scss';

const Map = ReactMapboxGl({ accessToken: process.env.REACT_APP_MAPBOX_TOKEN });

const Home = () => {

  const [flats, setFlats] = useState([]);
  const [selectedFlat, setSelectedFlat] = useState(null);
  const [center, setCenter] = useState([-9.142685, 38.736946]);
  const [searchTerm, setSearchTerm] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(" disabled");
  const history = useHistory();

  useEffect(() => {
    fetchItems(setFlats);
  }, []);

  const handleSelect = (flatId) => {
    const flat = flats.find(flat => flat.id === flatId);
    setButtonDisabled("");
    setSelectedFlat(flat);
    setCenter([flat.lng, flat.lat]);
  }

  const filteredFlats =  flats.filter(flat => flat.name.match(new RegExp(searchTerm, 'i')));

  return flats ? (
    <div className="home">
      <div className="main">
        <div className="header">
          <input 
            className="form-control w-25 pt-2 pb-2"
            type="text"
            placeholder="Search"
            aria-label="Search"
            onChange={event => setSearchTerm(event.target.value)}/>
          <div className="d-flex justify-content-end w-75">
            <button 
              type="button" 
              className={"btn btn-secondary mb-0 mt-0 rounded w-25" + buttonDisabled}
              onClick={() => history.push(`/flats/update/${selectedFlat.id}`)}
              >Update
            </button>
            <button 
              type="button" 
              className={"btn btn-danger mb-0 mt-0 rounded w-25" + buttonDisabled}
              onClick={() => {
                fetchDelete(selectedFlat, flats)
                setFlats(flats.filter(flat => flat !== selectedFlat));
              }}
              >Delete
            </button>
            <button 
              type="button" 
              className="btn btn-success mb-0 mt-0 mr-0 rounded w-25"
              onClick={() => history.push("/flats/new")}
              >Create
            </button>
          </div>
        </div>
        <div className="flats">
          {filteredFlats.map((flat) => {
            return (
              <Flat
                key={flat.id}
                id={flat.id}
                onSelect={() => handleSelect(flat.id)}
                title={`${flat.price} EUR - ${capitalize(flat.name)}`}
                selected={flat === selectedFlat}
                imgUrl={flat.imageUrl || flat.image_url} />
            );
          })}
          </div>
      </div>
      <div className="map">
        <Map
          zoom={[10]}
          center={center}
          containerStyle={{ height: '100vh', width: '100%' }}
          style="mapbox://styles/mapbox/streets-v11"
          animationOptions={{ duration: 4000 }}
          className="rounded">
            {filteredFlats.map((flat) => {
              return(
                <Marker key={flat.id} className="my-marker" coordinates={[flat.lng, flat.lat]} anchor="bottom" onClick={() => handleSelect(flat.id)}>
                  <FlatMarker price={flat.price} selected={flat === selectedFlat} />
                </Marker>
              );
            })}
        </Map>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default Home;
