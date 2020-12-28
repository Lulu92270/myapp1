import React from 'react';
import { useForm } from "react-hook-form";
import faker from 'faker';

import './styles/FlatCreate.scss';

import { useHistory } from 'react-router-dom';

const FlatCreate = () => {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = async (flat) => {
    const token = document.querySelector('[name=csrf-token]').content
    const CREATE_URL = "/api/v1/flats";

    const options = {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": token
        },
      method: 'post',
      credentials: "same-origin",
      body: JSON.stringify(flat)
    }
    await fetch(CREATE_URL, options);
    history.push("/");
    // .then(response => response.json())
    // .then(data => this.setState({ postId: data.id }));
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form">
          <h2 className="pb-4">My New Location</h2>
          <label>My new Place:</label>
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

export default FlatCreate;
