import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Stations from "../services/Stations";
import TripCounts from "../services/TripCounts";

const StationDetails = ({ station }) => {
  const [stationData, setStationData] = useState([]);
  const [departures, setDepartures] = useState([]);
  const [returns, setReturns] = useState([]);
  const [topDestinations, setTopDestinations] = useState([]);
  const [topReturns, setTopReturns] = useState([]);
  const [totalDepartures, setTotalDepartures] = useState([]);
  const [totalReturns, setTotalReturns] = useState([]);



  useEffect(() => {
    Stations.getStation(station)
      .then(response => {
        setStationData(response.data);
      })

    TripCounts.getTripCountByDsId(station)
      .then(response => {
        setDepartures(response.data);
      })

    TripCounts.getTripCountByRsId(station)
      .then(response => {
        setReturns(response.data);
      })

    Stations.getStationName(station)
      .then(response => {
        console.log(response.data)
      })
  }, [station])

  useEffect(()=>{
    if (departures.length>0){
      setTotalDepartures( departures.map(tc=>tc.count).reduce((a,b)=>a+b))
    }
    if (returns.length>0){
      setTotalReturns(returns.map((tc)=>tc.count).reduce((a,b)=>a+b))
    }
  
  },[returns,departures])

  const topDestinationsList = departures.slice(0,5).map((tc) => 
      <li key={`${tc.departureStationId}${tc.returnStationId}`}>
        {tc.returnStationId} matkoja {tc.count}
      </li>
  );
 
  const topReturnsList = returns.slice(0,5).map((tc) =>
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