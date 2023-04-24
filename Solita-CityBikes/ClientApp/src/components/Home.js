import React, { Component, useState, useEffect } from 'react';
import LeafletMap from './LeafletMap';
import { variables } from '../Variables';
import axios from 'axios';


const Home = () => {
  const [topTenStations, setTopTenStations] = useState([]);
  const [topTenTrips, setTopTenTrips] = useState([]);

  useEffect(() => {
    axios("https://localhost:7199/api/trip/topdeparturestations")
      .then(response => {
        console.log(response.data);
        setTopTenStations(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    axios("https://localhost:7199/api/trip/toptrips")
    .then(response => {
      console.log(response.data);
      setTopTenTrips(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  console.log(topTenStations);

  const viewStationList = topTenStations.map(element =>
  <li key={element.stationHslId}>{element.stationName + ": " + element.departureCount}</li>)

  const viewTripList = topTenTrips.map(element =>
    <li key={element.departureStationNimi+element.returnStationNimi}>{element.departureStationNimi + ": " + element.returnStationNimi}</li>)
  

  return (
    <div>
      HELLO
      <LeafletMap />
      <div id="topStations">
        <h2> Suosituimmat Asemat: </h2>
        <ul>{viewStationList}</ul>
      </div>
      <div id="topTrips">
        <h2> Suosituimmat Matkat: </h2>
        <ul>{viewTripList}</ul>
      </div>
    </div>
  );
};

export default Home;