import React, { Component, useState, useEffect } from 'react';
import LeafletMap from './LeafletMap';
import DrawTrips from './DrawTrips';
import Details from './Detail';
import TopStations from './TopStations';
import TopTrips from './TopTrips';
import axios from 'axios';


const Home = () => {
  const [stations, setStations] = useState([]);
  const [onViewStations, setOnViewStations] = useState([]);
  const [onViewTrips, setOnViewTrips] = useState([]);
  const [topStations, setTopStations] = useState([]);
  const [topTrips, setTopTrips] = useState([]);
  const [station, setStation] = useState(null);
  const [trip, setTrip]= useState(null)

  useEffect(() => {
    axios("https://localhost:7199/api/station")
      .then(response => {
        setStations(response.data);
        setOnViewStations(response.data);
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
  const tripsCoordinates = [];
  
  const viewTopTrips = () => {
    topTrips.forEach(trip => {
      const departureStation = stations.find(s => trip.departureStationId === s.hslStationId);
      // Find the departure station object in the stations array that matches the trip's departure station ID
      foundStations.push(departureStation);
      // Add the departure station object to the foundStations array
      const returnStation = stations.find(s => trip.returnStationId === s.hslStationId);
      // Find the return station object in the stations array that matches the trip's return station ID
      foundStations.push(returnStation);
      // Add the return station object to the foundStations array
      tripsCoordinates.push([[departureStation.y, departureStation.x], [returnStation.y, returnStation.x]]);
      // Combine both departure and return station coordinates into one array and add it to the tripsCoordinates array
    });
    
    const uniqueStations = foundStations.reduce((acc, station) => {
      if (!acc.find(s => s.hslStationId === station.hslStationId)) {
        acc.push(station);
      }
      return acc;
    }, []);


    setOnViewStations(uniqueStations);
    setOnViewTrips(tripsCoordinates);
  };

  const viewTopStations = () => {
    setOnViewStations(viewableTopStations);
    setOnViewTrips([]);
  };

  const reset = () => {
    setOnViewStations(stations);
    setStation(null);
    setTrip(null)
  }

  return (
    <div>
      <div className='box'> 
        <button onClick={reset}>Reset</button>
        <LeafletMap stationData={onViewStations} tripData={onViewTrips} setTrip={setTrip} setStation={setStation} trip={trip} station={station} />
        <Details station={station} trip={trip}/>
      </div>
      <div className="box">
        <div id="topStations">
          <h2> Suosituimmat Asemat: </h2>
          <button onClick={viewTopStations}>näytä</button>
          <TopStations stationList={topStations} setTrip={setTrip} setStation={setStation}/>
        </div>
        <div id="topTrips">
          <h2> Suosituimmat Matkat: </h2>
          <button onClick={viewTopTrips}>näytä</button>
          <TopTrips tripList={topTrips} setTrip={setTrip} setStation={setStation}/>
        </div>
      </div>
    </div>
  );
};

export default Home;