import React from "react";
import { useEffect, useState } from "react";
import Stations from "../services/Stations";
import TripCounts from "../services/TripCounts";
import Trips from "../services/Trips";

const StationDetails = ({ station: stationId }) => {
  const [stationData, setStationData] = useState([]);
  const [departures, setDepartures] = useState([]);
  const [returns, setReturns] = useState([]);
  const [totalDepartures, setTotalDepartures] = useState([]);
  const [totalReturns, setTotalReturns] = useState([]);
  const [avgDuration, setAvgDuration]= useState(0);
  const [avgDistance, setAvgDistance]=useState(0);
  const [topReturns, setTopReturns]=useState([]);


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

    const returnStationName = async (id) => {
      const response = await Stations.getStationName(id);
      return response.data;
    };

    setTopReturns (() => returns.slice(0, 5).map(async (tc) => {
      await returnStationName(tc.returnStationId) }))

      
  }, [returns, departures])

  const topDestinationsList = departures.slice(0, 5).map((tc) =>
    <li key={`${tc.departureStationId}${tc.returnStationId}`}>
      {tc.returnStationId} matkoja {tc.count}
    </li>
  );

  topReturns && console.log(topReturns);

  return (
    <div>
      <h3>{stationData.nimi}</h3>
      <p>{stationData.osoite}</p>
      <div className="stationDataDetails">
        Matkoja asemalta mittausjaksolla <br/>
        lähtöjä: <strong>{totalDepartures}</strong><br/>
        palautuksia asemalle:<strong> {totalReturns}</strong><br/>
        keskimääräinen matkan pituus asemalta: <strong>{Math.round(avgDistance/1000 * 100) / 100}km</strong><br/>
        keskimääräinen matkan kesto asemalta:<strong> {Math.floor(avgDuration/60)}min{Math.round(avgDuration%60)}sek</strong><br/>
      </div>
      <div className="stationDataDetailLists">
      Suosituimmat kohdeasemat asemalta:
      <ul>
        {stationData && topDestinationsList}
      </ul>
      Suosituimmat lähtöasemat asemalle:
      <ul>
        {stationData && ":)"}
      </ul>
      </div>
    </div>
  )
}

export default StationDetails;