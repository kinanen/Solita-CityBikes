import React, { useState, useEffect } from "react";
import TripCounts from "../services/TripCounts";
import Trips from "../services/Trips";

const TripDetails = ({ trip, stations, setStation }) => {
  const [station1, setStation1] = useState();
  const [station2, setStation2] = useState();
  const [tripsPerMonth,setTripsPerMonth]= useState()
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
        const trips=[];
        Trips.getTripCountPerMonthStation(trip[0], trip[1], 5)
        .then(response =>{
            trips [0] = response.data;
        })
        Trips.getTripCountPerMonthStation(trip[0], trip[1], 6)
        .then(response =>{
            trips [1] = response.data;
        })
        Trips.getTripCountPerMonthStation(trip[0], trip[1], 7)
        .then(response =>{
            trips [2] = response.data;
        })
        setTripsPerMonth(trips)
        
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

const viewTripsPerMonth = (arg) =>{
  if(arg<0) return " virhe tietojen hakemisessa."
  else{
    return arg
  }
}

  return (
    <div>
      {station1 && station2 ? (
        <>
          <h3 onClick={()=>setStation(trip[0])}>{station1 }</h3> 
          <h3> - </h3> 
          <h3 onClick={()=>setStation(trip[1])}>{station2}</h3>
          
          {tripCount ? <>matkoja yhteensä pysäkkien välillä <strong>{tripCount}</strong> </>:"Ladataan ... "}
          <br/>
          {tripsPerMonth ? <>Matkat kuukausittain<br/> 05/2021: <strong>{tripsPerMonth[0] ? viewTripsPerMonth(tripsPerMonth[0]): " Ladataan ja lasketaan kuukausittaisia matkoja pysäkkien välillä, tässä voi kestää hetki! "}</strong>matkaa<br/> 06/2021:<strong>{tripsPerMonth[1] ? viewTripsPerMonth(tripsPerMonth[1]): "ladataan ..."}</strong>matkaa<br/>07/2021 <strong>{tripsPerMonth[2] ? viewTripsPerMonth(tripsPerMonth[2]) : "ladataan ..." }</strong> matkaa</>:"Ladataan .. "}
          <p>keskimääräinen matkan pituus asemien välillä: {avgDistance ? <><strong>{Math.round(avgDistance/1000 * 100) / 100}km</strong></>: "Ladataan .. "}</p>
        <p>keskimääräinen matkan kesto tällä matkalla:  {avgDuration ? <><strong>{Math.floor(avgDuration/60)}:{secView(Math.round(avgDuration%60))}</strong></>: "Ladataan .. "}</p>
        </>
      ) : (
        "Ladataan..."
      )}
    </div>
  );
};

export default TripDetails;