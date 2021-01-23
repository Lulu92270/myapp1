import React from 'react';
import { useForm } from "react-hook-form";
import faker from 'faker';

import { fetchPost } from './Fetches';
import './styles/FlatCreate.scss';

import { useHistory } from 'react-router-dom';

const FlatCreate = () => {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const onSubmit = (data) => {
    fetchPost(data);
    history.push("/");
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form">
          <h2 className="pb-4">Create Location</h2>
          <label>Location:</label>
          <input type="text" name="name" ref={register({required: true, minLength: 8})} defaultValue={faker.company.bs()} />
          {errors.flat && <p>8 Characters min</p>}
          <label>Price:</label>
          <input type="text" name="price" ref={register} defaultValue={faker.commerce.price()} />
          
          <label>Latitude:</label>
          <input type="text" name="lat" ref={register} defaultValue={faker.address.latitude()} />

          <label>Longitude:</label>
          <input type="text" name="lng" ref={register} defaultValue={faker.address.longitude()} />

          <label>Flat URL:</label>
          <input type="text" name="image_url" ref={register} defaultValue={`https://source.unsplash.com/featured/1600x900/?{${faker.random.word()}`}/> 

          <div className="click-area">
            <button className="btn btn-success ml-0 mt-2 mb-2 rounded" onClick={() => history.push("/")}>Back</button>
            <input type="submit" value="Submit" className="btn btn-success ml-0 mt-2 mb-2 rounded"/>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FlatCreate;
