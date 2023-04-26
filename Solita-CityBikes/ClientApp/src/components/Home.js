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

  const foundStations = [];

  const viewTopTrips = () => {
    (topTrips.map(trip => {
      foundStations.push(stations.find(s => trip.departureStationId===s.hslStationId));
      foundStations.push(stations.find(s => trip.returnStationId===s.hslStationId ));
      //const foundStations = [...foundDepartureStations];
      console.log(foundStations);
    }))
    const uniqueStations = foundStations.reduce((acc, station) => {
      if (!acc.find(s => s.hslStationId === station.hslStationId)) {
        acc.push(station);
      }
      return acc;
    }, []);
    setOnViewStations(uniqueStations);
  };

  const viewTopStations = () => {
    setOnViewStations(viewableTopStations);
  };

  return (
    <div>
      HELLO
      <button onClick={()=> setOnViewStations(stations)}>Reset</button>
      <LeafletMap stationData = {onViewStations} tripData={onViewTrips}/>
      <div id="topStations">
        <h2> Suosituimmat Asemat: </h2>
        <button onClick={viewTopStations}>näytä</button>
        <TopStations stationList={topStations}/>
      </div>
      <div id="topTrips">
        <h2> Suosituimmat Matkat: </h2>
        <button onClick={viewTopTrips}>näytä</button>
        <TopTrips tripList={topTrips}/>
      </div>
    </div>
  );
};

export default Home;