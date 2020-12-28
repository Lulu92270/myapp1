import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";

import './styles/FlatUpdate.scss';

const FlatUpdate = ({ match }) => {
  useEffect(() => {
    fetchFlat();
  }, []);
  
  const [flat, setFlat] = useState({});

  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  
  const fetchFlat = async () => {
    const fetchFlat = await fetch(`/api/v1/flats/${match.params.id}`)
    const flat = await fetchFlat.json();
    setFlat(flat);
  }

  const onSubmit = async (flat) => {
    const token = document.querySelector('[name=csrf-token]').content
    const UPDATE_URL = `/api/v1/flats/${match.params.id}`;
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": token
      },
      method: 'PATCH',
      credentials: "same-origin",
      body: JSON.stringify(flat)
    }
    
    await fetch(UPDATE_URL, options);
    history.push("/");
  }

  const maxCharacters = (string, maxlimit) => {
    return string.length > maxlimit ? string.substring(0,maxlimit-3) + '...' : string
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form">
          <h2 className="pb-4">Updating {maxCharacters(String(flat.name), 20)}</h2> 
          <label>Place:</label>
          <input type="text" name="name" ref={register({required: true, minLength: 8})} defaultValue={flat.name} />
          {errors.flat && <p>8 Characters min</p>}
          <label>Price:</label>
          <input type="text" name="price" ref={register} defaultValue={flat.price} />
          
          <label>Latitude:</label>
          <input type="text" name="lat" ref={register} defaultValue={flat.lat} />

          <label>Longitude:</label>
          <input type="text" name="lng" ref={register} defaultValue={flat.lng} />

          <label>Flat URL:</label>
          <input type="text" name="image_url" ref={register} defaultValue={flat.image_url}/> 

          <input type="submit" value="Submit" />
        </div>
      </form>
        <button 
        type="button" 
        className="btn btn-success"
        onClick={() => history.push("/")}
        >Back
        </button>
    </div>
  );
}

export default FlatUpdate;
