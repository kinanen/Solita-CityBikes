import React from "react";
import { useEffect, useState } from "react";
import Stations from "../services/Stations";
import TripCounts from "../services/TripCounts";
import Trips from "../services/Trips";

const StationDetails = ({ station: stationId, stations, setTrip, setStation }) => {
  const [stationData, setStationData] = useState([]);
  const [departures, setDepartures] = useState([]);
  const [returns, setReturns] = useState([]);
  const [totalDepartures, setTotalDepartures] = useState([]);
  const [totalReturns, setTotalReturns] = useState([]);
  const [avgDuration, setAvgDuration] = useState(0);
  const [avgDistance, setAvgDistance] = useState(0);

  useEffect(() => {
    if (departures.length > 0) {
      setTotalDepartures(departures.map(tc => tc.count).reduce((a, b) => a + b));
    }
    if (returns.length > 0) {
      setTotalReturns(returns.map(tc => tc.count).reduce((a, b) => a + b));
    }
  }, [departures, returns]);

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

    Trips.getAverageDistanceByStation(stationId)
      .then(response => {
        setAvgDistance(response.data)
      })

    Trips.getAverageDurationByStation(stationId)
      .then(response => {
        setAvgDuration(response.data)
      })
  }, [stationId])



  const viewTrip = (arg) => {
    setStation(null);
    setTrip([arg[0], arg[1]])
  }
  const topDestinationsList = departures
    .slice(0, 5)
    .map((tc) => (
      <li key={`${tc.departureStationId}${tc.returnStationId}`}>
        <a href="#" onClick={() => viewTrip([tc.departureStationId, tc.returnStationId])} >{stations.find(s => tc.returnStationId === s.hslStationId).nimi + " "}
       , matkoja: </a>{tc.count}
      </li>
    ));

  const topReturnsList = returns
    .slice(0, 5)
    .map((tc) => (
      <li key={`${tc.returnStationId}${tc.departureStationId}`}>
        <a href="#" onClick={() => viewTrip([tc.departureStationId, tc.returnStationId])}>{stations.find(s => tc.departureStationId === s.hslStationId).nimi + " "}
       , matkoja: {tc.count}</a>
      </li>
    ));

  const secView = (arg) => {
    if (arg < 10) return `0${arg}`
    else return arg
  }

  return (
    <div>
      <h3>{stationData.nimi}</h3>
      <p>{stationData.osoite}</p>
      <div className="stationDataDetails">
        Matkoja asemalta mittausjaksolla <br />
        lähtöjä: <strong>{totalDepartures}</strong><br />
        palautuksia asemalle:<strong> {totalReturns}</strong><br />
        keskimääräinen matkan pituus asemalta: <strong>{Math.round(avgDistance / 1000 * 100) / 100}km</strong><br />
        keskimääräinen matkan kesto asemalta: <strong> {Math.floor(avgDuration / 60)}:{secView(Math.round(avgDuration % 60))}</strong><br />
      </div>
      <div className="stationDataDetailLists">
        Suosituimmat kohdeasemat asemalta:
        <ul>
          {stationData && topDestinationsList}
        </ul>
        Suosituimmat lähtöasemat asemalle:
        <ul>
          {stationData && topReturnsList}
        </ul>
      </div>
    </div>
  )
}

export default StationDetails;