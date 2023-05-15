import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Stations from "../services/Stations";

const StationDetails = ({ station }) => {
  const [stationData, setStationData] = useState([]);

  const [topDestinations, setTopDestinations] = useState([]);
  const [topArrivals, setTopArrivals] = useState([]);

  useEffect(() => {
    Stations.getStation(station)
      .then(response => {
        setStationData(response.data);
      })

    /* axios(("https://localhost:7199/api/station/topdestinations/" + station)
     .then(response =>{
       setTopDestinations(response.data)
     }))
     */

  }, [station])

  const topDestinationsList = topDestinations.map((station) =>
    <li>{station}</li>
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
      {topArrivals}

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