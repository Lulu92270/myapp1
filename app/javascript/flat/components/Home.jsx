import React, { useState, useEffect, useRef } from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { capitalize } from './functions/Capitalize';
import { delay } from './functions/Delay';

import { fetchItems, fetchDelete } from './Fetches';
import Header from './Header';
import Flat from './Flat';
import FlatMarker from './FlatMarker';

import './styles/Home.scss';

const Map = ReactMapboxGl({ accessToken: process.env.REACT_APP_MAPBOX_TOKEN });

const Home = () => {

  const [array, setArray] = useState([]);
  
  const [center, setCenter] = useState([-9.142685, 38.736946]);
  const [searchTerm, setSearchTerm] = useState("");

  const [flats, setFlats] = useState([]);
  const [selectedFlat, setSelectedFlat] = useState(null);

  useEffect(() => {
    fetchItems(setArray)
  }, []);

  useEffect(() => {
    (async () => {
      for (let flat of array) {
        await delay(300);
        setFlats((prev) => [...prev, flat]);
      }
    })();
    return () => clearTimeout(delay);
  }, [array]);

  const handleHoverFlat = (flatId) => {
    const flat = flats.find(flat => flat.id === flatId);
    setSelectedFlat(flat);
    setCenter([flat.lng, flat.lat]);
  }
  
  let singleFlatRef = useRef(null);
  const hoverFlat = (flatId) => {
    const flat = flats.find(flat => flat.id === flatId);
    setSelectedFlat(flat);
    setCenter([flat.lng, flat.lat]);
    console.log(singleFlatRef.current)
    // singleFlatRef.current.hoverFlat()
  };

  const filteredFlats = flats.filter(flat => flat.name.match(new RegExp(searchTerm, 'i')));

  return array ? (
    <div className="home">
      <Header
        triggerSearch={(string) => setSearchTerm(string)}
      />
      <div className="content">
        <div className="flats">
          {filteredFlats.map((flat) => {
            return (
              <Flat
                key={flat.id}
                id={flat.id}
                onHover={handleHoverFlat}
                title={capitalize(flat.name)}
                imgUrl={flat.imageUrl || flat.image_url}
                forwardedRef={singleFlatRef}
                onDelete={() => {
                  fetchDelete(flat);
                  setFlats(flats.filter(eachFlat => eachFlat !== flat));
                }}
              />                
            );
          })}
        </div>
        <div className="map">
          <Map
            // zoom={[15]}
            center={center}
            containerStyle={{ height: '100vh', width: '100%' }}
            style="mapbox://styles/mapbox/streets-v11"
            animationOptions={{ duration: 4000 }}
            className="rounded">
              {filteredFlats.map((flat) => {
                return(
                  <Marker key={flat.id} className="my-marker" coordinates={[flat.lng, flat.lat]} anchor="bottom" onClick={() => hoverFlat(flat.id)}>
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
