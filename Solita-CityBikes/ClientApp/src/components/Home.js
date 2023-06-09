import React, { useState, useEffect } from 'react';
import LeafletMap from './LeafletMap';
import Details from './Detail';
import TopStations from './TopStations';
import TopTrips from './TopTrips';
import Stations from '../services/Stations';
import TripCounts from '../services/TripCounts';

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
  const [topTripPage, setTopTripPage] = useState(1)
  const pageSize = 20;

  useEffect(() => {
    const getStations = async () => await Stations.getAll()
      .then(response => {
        setStations(response.data);
        setOnViewStations(response.data);
      });


    TripCounts.getStationDepartureCount()
      .then(response => {
        setTopStations(response.data.sort(((a, b) => b.departureCount - a.departureCount)));
      })

    getStations();
  }, []);

  useEffect(() => {
    TripCounts.getPaginatedTripCounts(topTripPage, pageSize)
      .then(response => {
        setTopTrips(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [topTripPage]);

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

  const reset = () => {
    setOnViewStations(stations);
    setOnViewTrips([]);
    setStation(null);
    setTrip(null)
  }

  if (stations.length < 1) { return <div>ladataan...</div> }

  return (
    <div>
      <h1>Helsinki Citybikes - Otso Kinanen</h1>
      <div className='box'>
        <LeafletMap stationData={onViewStations} tripData={onViewTrips} setOnViewTrips={setOnViewTrips} setTrip={setTrip} setStation={setStation} trip={trip} station={station} stations={stations} />
        <Details station={station} trip={trip} stations={stations} setTrip={setTrip} setStation={setStation} />
      </div>
      <div className="bottom-half">
        <div className='stationsList'>
          <h2> Asemat </h2>
          <div className='subHeadersForList'>
            <h3 onClick={() => { setViewAllStations(true); reset() }}>{viewAllStations ? <><strong>•</strong></> : ""}Kaikki asemat</h3>
            <h3 onClick={() => { setViewAllStations(false); setOnViewTrips([]); }}>{viewAllStations ? "" : <><strong>•</strong></>}Suosituimmat asemat</h3>
          </div>
          {stations && viewAllStations ? (
            <AllStations stationList={stations} setTrip={setTrip} setStation={setStation} />
          ) : (
            <TopStations stations={stations} stationList={topStations} setOnViewStations={setOnViewStations} setTrip={setTrip} setStation={setStation} />
          )}

        </div>
        <div className='tripsList'>
          <h2> Matkat </h2>
          <div className='subHeadersForList'>
            <h3 onClick={() => { setViewAllTrips(false); viewTopTrips() }}>{viewAllTrips ? "" : <><strong>•</strong></>} Suosituimmat matkat</h3>
            <h3 onClick={() => { setViewAllTrips(true); reset() }}> {viewAllTrips ? <><strong>•</strong></> : ""}Kaikki matkat</h3>
          </div>
          {stations && viewAllTrips ? (
            <AllTrips stations={stations} setTrip={setTrip} setStation={setStation} />
          ) : (
            <TopTrips tripList={topTrips} setTrip={setTrip} setStation={setStation} setPage={setTopTripPage} stations={stations} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;