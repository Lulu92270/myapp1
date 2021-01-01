import React, { useState, useEffect } from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { useHistory } from 'react-router-dom';

import './styles/Home.scss';

import Flat from './Flat';
import FlatMarker from './FlatMarker';

const Home = () => {
  useEffect(() => {
    fetchFlats();
  }, []);

  const [flats, setFlats] = useState([]);
  const [selectedFlat, setSelectedFlat] = useState(null);
  const [center, setCenter] = useState([2.3522, 48.8566]);
  const [searchTerm, setSearchTerm] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(" disabled");

  const Map = ReactMapboxGl({ accessToken: process.env.REACT_APP_MAPBOX_TOKEN });
  const history = useHistory();

  const fetchFlats = async () => {
    const INDEX_URL = "/api/v1/flats";
    const fetchFlats = await fetch(INDEX_URL)
    const flats = await fetchFlats.json();
    // flats == flats.map(flat => { 
    //   flat.lat = Number(flat.lat)
    //   flat.lng = Number(flat.lng)
    //  })
    setFlats(flats);
  }

  const deleteFlat = async () => {
    const flat = flats.find(flat => flat === selectedFlat) || null;

    const token = document.querySelector('[name=csrf-token]').content
    const DELETE_URL = `/api/v1/flats/${flat.id}`;

    const options = {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": token
        },
      method: 'DELETE',
      credentials: "same-origin",
      body: JSON.stringify(flat)
    }
    await fetch(DELETE_URL, options);
    setFlats(flats.filter(flat => flat !== selectedFlat));
  }

  const handleSelect = (flatId) => {
    const flat = flats.find(flat => flat.id === flatId);
    setButtonDisabled("");
    setSelectedFlat(flat);
    setCenter([flat.lng, flat.lat]);
  }

  const filteredFlats =  flats.filter(flat => flat.name.match(new RegExp(searchTerm, 'i')));
  console.log(flats)
  return flats ? (
    <div className="home">
      <div className="main">
        <div className="header">
          <input className="form-control w-25" type="text" placeholder="Search" aria-label="Search" onChange={event => setSearchTerm(event.target.value)}/>
          <div className="d-flex justify-content-end w-75">
            <button 
              type="button" 
              className={"btn btn-secondary rounded w-25" + buttonDisabled}
              onClick={() => history.push(`/flats/update/${selectedFlat.id}`)}
              >Update
            </button>
            <button 
              type="button" 
              className={"btn btn-danger rounded w-25" + buttonDisabled}
              onClick={deleteFlat}
              >Delete
            </button>
            <button 
              type="button" 
              className="btn btn-success mr-0 rounded w-25"
              onClick={() => history.push("/flats/new")}
              >Add
            </button>
          </div>
        </div>
        <div className="flats">
          {filteredFlats.map((flat) => {
            return (
              <Flat
                key={flat.id}
                id={flat.id}
                onSelect={handleSelect}
                price={flat.price} 
                title={flat.name}
                selected={flat === selectedFlat}
                imgUrl={flat.imageUrl || flat.image_url} />
            );
          })}
        </div>
      </div>
      <div className="map">
        <Map
          zoom={[14]}
          center={center}
          containerStyle={{ height: '100vh', width: '100%' }}
          style="mapbox://styles/mapbox/streets-v8">
            {filteredFlats.map((flat) => {
              return(
                <Marker key={flat.id} coordinates={[flat.lng, flat.lat]} anchor="bottom">
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
