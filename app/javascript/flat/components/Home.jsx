import React, { useState, useEffect, useRef, createRef } from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { capitalize } from './functions/Capitalize';
import { delay } from './functions/Delay';
import { getIndex } from './functions/GetIndex';

import { fetchItems, fetchDelete, fetchPatch } from './Fetches';
import Header from './Header';
import Flat from './Flat';
import FlatMarker from './FlatMarker';

import './styles/Home.scss';

const Map = ReactMapboxGl({ accessToken: process.env.REACT_APP_MAPBOX_TOKEN });

const Home = () => {

  const FlatsRef = useRef({});
  const prevFlat = useRef(-1);

  const [width, setWidth] = useState(window.innerWidth);
  const breakPoint = 1080;

  const [array, setArray] = useState([]);
  const [center, setCenter] = useState([-9.142685, 38.736946]);
  const [searchTerm, setSearchTerm] = useState("");
  const [index, setIndex]= useState(-1);
  const [flats, setFlats] = useState([]);
  const [selectedFlat, setSelectedFlat] = useState(null);

  const filteredFlats = flats.filter(flat => flat.name.match(new RegExp(searchTerm, 'i')));

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

  useEffect(() => {
    prevFlat.current = index
  },[index])

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
   },[]);
 
  const handleHoverFlat = (flatId) => {
    const flat = flats.find(flat => flat.id === flatId);
    setSelectedFlat(flat);
    setCenter([flat.lng, flat.lat]);
    if (prevFlat.current != -1) {FlatsRef.current[prevFlat.current].leaveFlat()}
  }
  
  const handleMarkerClick = (flatId) => {
    const newIndex = getIndex(flatId, flats, 'id')
    if (prevFlat.current != -1) {FlatsRef.current[prevFlat.current].leaveFlat()}
    FlatsRef.current[newIndex].hoverFlat()
    setIndex(getIndex(flatId, flats, 'id'))
  };

  return array ? (
    <div className="home">
      <Header
        triggerSearch={(string) => setSearchTerm(string)}
      />
      <div className="content">
        <div className="flats">
          {filteredFlats.map((flat, index) => {
            return (
              <Flat
                key={flat.id}
                id={flat.id}
                onHover={handleHoverFlat}
                title={capitalize(flat.name)}
                imgUrl={flat.imageUrl || flat.image_url}
                ref={r => (FlatsRef.current[index] = r)}
                onDelete={() => {
                  fetchDelete(flat);
                  setFlats(flats.filter(eachFlat => eachFlat !== flat));
                }}
                onUpdate={(flatId, data) => {    
                  const index = getIndex(flatId, flats, 'id')
                  const newFlats = [...flats];
                  data['id'] = flatId;
                  newFlats[index] = data;
                  setFlats(newFlats);
                }}
              />                
            );
          })}
        </div>
        {width > breakPoint && 
          <div className="map">
            <Map
              zoom={[3]}
              center={center}
              containerStyle={{ height: '100vh', width: '100%' }}
              style="mapbox://styles/mapbox/streets-v11"
              animationOptions={{ duration: 4000 }}
              className="rounded">
                {filteredFlats.map((flat) => {
                  return(
                    <Marker key={flat.id} className="my-marker" coordinates={[flat.lng, flat.lat]} anchor="bottom" onClick={() => handleMarkerClick(flat.id)}>
                      <FlatMarker price={flat.price} selected={flat === selectedFlat} />
                    </Marker>
                  );
                })}
            </Map>
          </div>
        }
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default Home;
