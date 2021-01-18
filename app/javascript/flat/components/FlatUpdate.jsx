import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";

import Button from 'react-bootstrap/Button';
import './styles/FlatUpdate.scss';

import { fetchItem, fetchPatch } from './Fetches';

const FlatUpdate = forwardRef((props, ref) => {
  useEffect(() => {
    fetchItem(setFlat, props.id);
  }, []);
  // https://www.youtube.com/watch?v=SmMZqh1xdB4&ab_channel=LetsCode
  const [flat, setFlat] = useState({});

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    fetchPatch(data, props.id);
  }

  const maxCharacters = (string, maxlimit) => {
    return string.length > maxlimit ? string.substring(0,maxlimit-3) + '...' : string
  }

  const [show, setShow] = useState(true);
  const open = () => setShow(true);
  const close = () => setShow(false);
  
  useImperativeHandle(ref, () => {
    return {
      openModal: () => open(),
      close: () => close()
    }
  });

  if (show) {
    return ReactDOM.createPortal(      
      <div className={"modal-wrapper"}>
        <div onClick={close} className={"modal-bd"}>
          <div className={"modal-box"}>
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
                  <Button variant="success" className="ml-0 mt-2 mb-2 rounded" onClick={() => close}>Back</Button>
                  <input type="submit" value="Update" className="btn btn-success"/>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>, document.getElementById("modal-root"))

  }
  return null;
});

export default FlatUpdate;
