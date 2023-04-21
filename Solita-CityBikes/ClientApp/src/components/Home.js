import React, { Component } from 'react';
import LeafletMap from './LeafletMap';
import { variables } from '../Variables';
import axios from 'axios';


const Home = () =>{

  const promise = axios("https://localhost:7199/api/trip/topdeparturestations")
  .then(response => {
    console.log(response.data)
  })
  .catch(error => {
    console.log(error);
  });

  console.log( )
    return (
      <div>
            HELLO
            <LeafletMap/>
      </div>
    );
  }

export default Home;