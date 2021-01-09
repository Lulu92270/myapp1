import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { capitalize } from './functions/Capitalize';
import { delay } from './functions/Delay';

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

  const [displayEl, setDisplayEl] = useState();
  const [displayArray, setDisplayArray] = useState([]);

  const handleSelect = (flatId) => {
    const flat = flats.find(flat => flat.id === flatId);
    setButtonDisabled("");
    setSelectedFlat(flat);
    setCenter([flat.lng, flat.lat]);
  }

  useEffect(() => {
    fetchItems(setFlats)
  }, []);

  useEffect(() => {
    (async () => {
      for (let flat of flats) {
        await delay(500);
        setDisplayEl(flat);
      }
      setDisplayEl(undefined);
    })();
    return () => {
      clearTimeout(delay);
   }
  }, [flats]);

  useEffect(() => {
    displayEl && setDisplayArray((prev) => [...prev, displayEl]);
  }, [displayEl]);

  const filteredFlats =  displayArray.filter(flat => flat.name.match(new RegExp(searchTerm, 'i')));

  return flats ? (
    <div className="home">
      <div className="header">
        <input 
          className="form-control search"
          type="text"
          placeholder="Search"
          aria-label="Search"
          onChange={event => setSearchTerm(event.target.value)}/>
        <div className="buttons">
          <button 
            type="button"
            className={"button-update" + buttonDisabled}
            onClick={() => history.push(`/flats/update/${selectedFlat.id}`)}
            >UPDATE
          </button>
          <button 
            type="button" 
            className={"button-delete" + buttonDisabled}
            onClick={() => {
              fetchDelete(selectedFlat, flats)
              setFlats(flats.filter(flat => flat !== selectedFlat));
            }}
            >DELETE
          </button>
          <button 
            type="button" 
            className="button-create"
            onClick={() => history.push("/flats/new")}
            >CREATE
          </button>
        </div>
      </div>
      <div className="content">
        <div className="flats">
          {filteredFlats.map((flat) => {
            return (
              <Flat
                key={flat.id}
                id={flat.id}
                onSelect={() => handleSelect(flat.id)}
                title={`${flat.price} EUR - ${capitalize(flat.name)} ${flat.id}`}
                selected={flat === selectedFlat}
                imgUrl={flat.imageUrl || flat.image_url} />                
            );
          })}
        </div>
        <div className="map">
          <Map
            zoom={[15]}
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
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default Home;
