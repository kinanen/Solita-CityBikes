import React, { Component, useState, useEffect } from 'react';
import LeafletMap from './LeafletMap';
import TopStations from './TopStations';
import TopTrips from './TopTrips';
import axios from 'axios';


const Home = () => {
  const [stations, setStations] = useState ([]);
  const [onViewStations, setOnViewStations] =  useState([]);
  const [onViewTrips, setOnViewTrips] =  useState([]);
  const [topStations, setTopStations] = useState([]);
  const [topTrips, setTopTrips] = useState([]);

  useEffect(() => {
    axios("https://localhost:7199/api/station")
      .then(response => {
        setStations(response.data);
        setOnViewStations(response.data);
        console.log(stations);
      });

    axios("https://localhost:7199/api/trip/topdeparturestations")
      .then(response => {
        setTopStations(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    axios("https://localhost:7199/api/trip/toptrips")
      .then(response => {
        console.log(response.data);
        setTopTrips(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const viewableTopStations = topStations.map(station => {
    const foundStation = stations.find(s => station.stationHslId === s.hslStationId);
    return foundStation;
  });
  
  console.log(viewableTopStations);

  const viewTopStations = () => {
    setOnViewStations(viewableTopStations);
  };

  return (
    <div>
      HELLO
      <LeafletMap stationData = {onViewStations} tripData={onViewTrips}/>
      <div id="topStations">
        <h2> Suosituimmat Asemat: </h2>
        <button onClick={viewTopStations}>näytä</button>
        <TopStations stationList={topStations}/>
      </div>
      <div id="topTrips">
        <h2> Suosituimmat Matkat: </h2>
        <TopTrips tripList={topTrips}/>
      </div>
    </div>
  );
};

export default Home;