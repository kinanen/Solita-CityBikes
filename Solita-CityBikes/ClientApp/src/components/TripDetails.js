import React, { useState, useEffect } from "react";
import Stations from "../services/Stations";
import TripCounts from "../services/TripCounts";
import Trips from "../services/Trips";

const TripDetails = ({ trip }) => {
  const [station1, setStation1] = useState();
  const [station2, setStation2] = useState();
  const [tripCount, setTripCount] = useState(0);
  const [avgDuration, setAvgDuration]= useState("lataa..");
  const [avgDistance, setAvgDistance]=useState("lataa..");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await Stations.getStation(trip[0]);
        setStation1(response1.data);
        const response2 = await Stations.getStation(trip[1]);
        setStation2(response2.data);
      } catch (error) {
        console.error("Error fetching station data:", error);
      }
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

  console.log(station1, station2);

  return (
    <div>
      {station1 && station2 ? (
        <>
          <h3>{station1.nimi + " - " + station2.nimi}</h3>
          {tripCount ? <>matkoja yhteensä <strong>{tripCount}</strong> </>:""}
          {}
          <p>keskimääräinen matkan pituus asemalta: <strong>{Math.round(avgDistance/1000 * 100) / 100}km</strong></p>
        <p>keskimääräinen matkan kesto tällä matkalla:<strong> {Math.floor(avgDuration/60)}min{Math.round(avgDuration%60)}sek</strong></p>
        </>
      ) : (
        "Ladataan..."
      )}
    </div>
  );
};

export default TripDetails;