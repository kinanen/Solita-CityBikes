import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Stations from "../services/Stations";
import TripCounts from "../services/TripCounts";
import Trips from "../services/Trips";

const StationDetails = ({ station: stationId }) => {
  const [stationData, setStationData] = useState([]);
  const [departures, setDepartures] = useState([]);
  const [returns, setReturns] = useState([]);
  const [topDestinations, setTopDestinations] = useState([]);
  const [topReturns, setTopReturns] = useState([]);
  const [totalDepartures, setTotalDepartures] = useState([]);
  const [totalReturns, setTotalReturns] = useState([]);
  const [avgDuration, setAvgDuration]= useState(0);
  const [avgDistance, setAvgDistance]=useState(0);


  useEffect(() => {
    Stations.getStation(stationId)
      .then(response => {
        setStationData(response.data);
      })

    TripCounts.getTripCountByDsId(stationId)
      .then(response => {
        setDepartures(response.data);
      })

    TripCounts.getTripCountByRsId(stationId)
      .then(response => {
        setReturns(response.data);
      })

    Stations.getStationName(stationId)
      .then(response => {
        console.log(response.data)
      })

    Trips.getAverageDistanceByStation(stationId)
      .then(response => {
        setAvgDistance(response.data)
      })

    Trips.getAverageDurationByStation(stationId)
      .then(response => {
        setAvgDuration(response.data)
      })
  }, [stationId])

  useEffect(() => {
    if (departures.length > 0) {
      setTotalDepartures(departures.map(tc => tc.count).reduce((a, b) => a + b))
    }
    if (returns.length > 0) {
      setTotalReturns(returns.map((tc) => tc.count).reduce((a, b) => a + b))
    }

  }, [returns, departures])

  const topDestinationsList = departures.slice(0, 5).map((tc) =>
    <li key={`${tc.departureStationId}${tc.returnStationId}`}>
      {tc.returnStationId} matkoja {tc.count}
    </li>
  );

  const topReturnsList = returns.slice(0, 5).map((tc) =>
    <li key={`${tc.returnStationId}${tc.departureStationId}`}>{tc.departureStationId} matkoja {tc.count}</li>
  );




  return (
    <div>
      <h3>{stationData.nimi}</h3>
      <p>Aseman osoite:
        {stationData.osoite}</p>
      <div>
        <p>Matkoja asemalta mittausjaksolla :</p>
        <p> lähtöjä: {totalDepartures}</p>
        <p>palautuksia asemalle: {totalReturns}</p>
        <p>keskimääräinen matkan pituus asemalta: {Math.round(avgDistance/1000 * 100) / 100
}km</p>
        <p>keskimääräinen matkan kesto asemalta: {Math.floor(avgDuration/60)}min{Math.round(avgDuration%60)}sek</p>
      </div>
      Suosituimmat kohdeasemat asemalta:
      <ul>
        {stationData && topDestinationsList}
      </ul>
      Suosituimmat lähtöasemat asemalle:
      <ul>
        {stationData && topReturnsList}
      </ul>

      The average distance of a journey starting from the station
      The average distance of a journey ending at the station

      Ability to filter all the calculations per month

    </div>
  )
}

export default StationDetails;