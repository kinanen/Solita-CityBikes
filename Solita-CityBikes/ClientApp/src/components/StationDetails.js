import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Stations from "../services/Stations";
import TripCounts from "../services/TripCounts";

const StationDetails = ({ station }) => {
  const [stationData, setStationData] = useState([]);

  const [topDestinations, setTopDestinations] = useState([]);
  const [topReturns, setTopReturns] = useState([]);

  useEffect(() => {
    Stations.getStation(station)
      .then(response => {
        setStationData(response.data);
      })

    TripCounts.getTripCountByDsId(station)
      .then(response => {
        setTopDestinations(response.data)
      })

    TripCounts.getTripCountByRsId(station)
      .then(response => {
        setTopReturns(response.data)
      })

    Stations.getStationName(station)
      .then(response => {
        console.log(response.data)
      })

  }, [station])

  const topDestinationsList = topDestinations.map((tc) => 
      <li key={`${tc.departureStationId}${tc.returnStationId}`}>
        {tc.returnStationId} matkoja {tc.count}
      </li>
  );
    
  

  const topReturnsList = topReturns.map((tc) =>
    <li key={`${tc.returnStationId}${tc.departureStationId}`}>{tc.departureStationId} matkoja {tc.count}</li>
  );


  return (
    <div>
      <h3>{stationData.nimi}</h3>
      <p>Aseman osoite:
        {stationData.osoite}</p>
      Suosituimmat kohdeasemat asemalta:
      <ul>
        {stationData && topDestinationsList}
      </ul>
      Suosituimmat lähtöasemat asemalle:
      <ul>
        {stationData && topReturnsList}
      </ul>
      Recommended

      Station name
      Station address
      Total number of journeys starting from the station
      Total number of journeys ending at the station

      Additional

      Station location on the map
      The average distance of a journey starting from the station
      The average distance of a journey ending at the station
      Top 5 most popular return stations for journeys starting from the station
      Top 5 most popular departure stations for journeys ending at the station
      Ability to filter all the calculations per month

    </div>
  )
}

export default StationDetails;