import React, { Component, useState, useEffect } from 'react';
import LeafletMap from './LeafletMap';
import Details from './Detail';
import TopStations from './TopStations';
import TopTrips from './TopTrips';
import Stations from '../services/Stations';
import Trips from '../services/Trips';
import AddStation from './AddStation';
import AddTrip from './AddTrip';
import AllStations from './AllStations';
import AllTrips from './AllTrips';

//Aloitussivu, lataa Asema datan tietokannasta, suosituimmat matkat ja suosituimmat asemat. 
//hakee käyttäjän valintojen mukaan asema ja matka datan ja välittää sen karttaa, matkoja ja asemia näyttäville komponenteille.

const Home = () => {

  const [stations, setStations] = useState([]);
  const [onViewStations, setOnViewStations] = useState([]);
  const [onViewTrips, setOnViewTrips] = useState([]);
  const [topStations, setTopStations] = useState([]);
  const [topTrips, setTopTrips] = useState([]);
  const [station, setStation] = useState(null);
  const [trip, setTrip] = useState(null)
  const [viewAllTrips, setViewAllTrips] = useState(false);
  const [viewAllStations, setViewAllStations] = useState(true)
  const [viewAddStation, setViewAddStation] = useState(false)
  const [viewAddTrip, setViewAddTrip] = useState(false)

  useEffect(() => {
    Stations.getAll()
      .then(response => {
        setStations(response.data);
        setOnViewStations(response.data);
      });

    Trips.getTopDepartureStations()
      .then(response => {
        setTopStations(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    Trips.getTopTrips()
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
      foundStations.push(departureStation);
      const returnStation = stations.find(s => trip.returnStationId === s.hslStationId);
      foundStations.push(returnStation);
      tripsCoordinates.push([[departureStation.y, departureStation.x], [returnStation.y, returnStation.x]]);
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
        <LeafletMap stationData={onViewStations} tripData={onViewTrips} setTrip={setTrip} setStation={setStation} trip={trip} station={station} />
        <Details station={station} trip={trip} />
      </div>
      <div className="box">
        <div className='stationsList'>
          <h2> Asemat </h2>
          <div className='subHeadersForList'>
            <h3 onClick={() => { viewTopStations(); setViewAllStations(false) }}>Suosituimmat asemat</h3>
            <h3 onClick={() => { setViewAllStations(true); reset() }}>Kaikki asemat</h3>
          </div>
          <div>
            {viewAllStations ? (
              <div>
                <AllStations stations={stations} />
              </div>
            ) : (
              <div>
                <TopStations stationList={topStations} setTrip={setTrip} setStation={setStation} />
              </div>
            )}
          </div>
          <div>
            <div onClick={() =>{ setViewAddStation(true); console.log("set view add station to true " + viewAddStation)}}>
            Lisää Asema
            </div>
            {viewAddStation ? (
            <div>
              <AddStation viewAddStation={viewAddStation} setViewAddStation={setViewAddStation} />
            </div>
            ):""}
          </div>
      </div>
      <div className='tripsList'>
        <h2> Matkat </h2>
        <div className='subHeadersForList'>
          <h3 onClick={() => { setViewAllTrips(false); viewTopTrips() }}>Suosituimmat matkat</h3>
          <h3 onClick={() => { setViewAllTrips(true); reset() }}>Kaikki matkat</h3>
        </div>
        <div>
          {viewAllTrips ? (
            <div>
              <AllTrips />
            </div>
          ) : (
            <div>
              <TopTrips tripList={topTrips} setTrip={setTrip} setStation={setStation} />
            </div>
          )}
        </div>
        <div onClick={() => setViewAddTrip(true)}>
          lisää matka
          <AddTrip viewAddTrip={viewAddTrip} setViewAddTrip={setViewAddTrip} stations={stations}/>
        </div>
      </div>
    </div>
    </div >
  );
};

export default Home;