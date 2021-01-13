import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";

import Button from 'react-bootstrap/Button';
import './styles/FlatUpdate.scss';

import { fetchItem, fetchPatch } from './Fetches';

const FlatUpdate = ({ match }) => {
  useEffect(() => {
    fetchItem(setFlat, match.params.id);
  }, []);
  
  const [flat, setFlat] = useState({});

  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const onSubmit = (data) => {
    fetchPatch(data, match.params.id);
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
          
          <div className="click-area">
            <Button variant="success" className="ml-0 mt-2 mb-2 rounded" onClick={() => history.push("/")}>Back</Button>
            <input type="submit" value="Update" className="btn btn-success"/>
          </div>
        </div>
      </form>

    </div>
  );
}

export default FlatUpdate;
