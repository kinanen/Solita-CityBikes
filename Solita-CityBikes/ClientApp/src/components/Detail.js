import React from "react";
import StationDetails from "./StationDetails";
import TripDetails from "./TripDetails";

// Näyttää aseman tai matkan yksityiskohtaiset tiedot
const Details = ({ trip, station, stations, setStation, setTrip }) => {
    if (station) {
        return (
            <div className="details">
                <StationDetails station={station} stations={stations} setTrip={setTrip} setStation={setStation} />
            </div>
        )
    }
    if (trip) {
        return (
            <div className="details">
                <TripDetails trip = {trip} stations={stations} setTrip={setTrip} setStation={setStation} />
            </div>
        )
    }
    else return (
        null
    )
}

export default Details;