import React, { useState, useEffect } from "react";
import TripCounts from "../services/TripCounts";
import Trips from "../services/Trips";

const TripDetails = ({ trip, stations, setStation }) => {
  const [station1, setStation1] = useState();
  const [station2, setStation2] = useState();
  const [tripCount, setTripCount] = useState(0);
  const [avgDuration, setAvgDuration]= useState("lataa..");
  const [avgDistance, setAvgDistance]=useState("lataa..");

  useEffect(() => {
    setStation1 (stations.find(s => trip[0] === s.hslStationId).nimi)
    setStation2 (stations.find(s => trip[1] === s.hslStationId).nimi)

    const fetchData = async () => {
      try {
        const response = await TripCounts.getTripCount(trip[0],trip[1]);
        setTripCount(response.data);
      } catch (error) {
        console.error("Error fetching trip count data:", error);
      }
      try{
        Trips.getTripCountPerMonthStation(trip[0], trip[1], 5)
        .then(response =>{
            console.log(response.data)
        })
      } catch (error){
        console.error("Error fetching monthly trips data:", error);
      }
      try{
        Trips.getAverageDurationByDStationandRStation(trip[0], trip[1])
        .then(response =>{
            setAvgDuration(response.data)
        })
      } catch (error){
        console.error("Error fetching avg duration data:", error);
      }
      try{
        Trips.getAverageDistanceByDStationandRStation(trip[0], trip[1])
        .then(response =>{
            setAvgDistance(response.data)
        })
      } catch (error){
        console.error("Error fetching avg distance data:", error);
      }

    };

    fetchData();
  }, [trip]);

  const secView = (arg) => {
    if(arg < 10 ) return `0${arg}`
    else return arg
}  
  return (
    <div>
      {station1 && station2 ? (
        <>
          <h3>{station1 + " - " + station2}</h3>
          {tripCount ? <>matkoja yhteensä pysäkkien välillä <strong>{tripCount}</strong> </>:""}
          {}
          <p>keskimääräinen matkan pituus asemien välillä: <strong>{Math.round(avgDistance/1000 * 100) / 100}km</strong></p>
        <p>keskimääräinen matkan kesto tällä matkalla:<strong> {Math.floor(avgDuration/60)}:{secView(Math.round(avgDuration%60))}</strong></p>
        </>
      ) : (
        "Ladataan..."
      )}
    </div>
  );
};

export default TripDetails;