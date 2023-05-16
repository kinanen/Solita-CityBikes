import { useState } from "react";
import Trips from "../services/Trips"
import DatalistInput, { useComboboxControls } from 'react-datalist-input';

const TripForm = ({ setViewAddTrip, stations }) => {
    const [trip, setTrip] = useState({
        departureTime: '',
        returnTime: '',
        departureStationId: '',
        returnStationId: '',
        coveredDistance: '',
        duration: '',
    });

    const validateData = (trip) => {
        console.log('validate trip data: ' + trip)
        return true;
    }

    const handleChange = (event) => {
        setTrip({
            ...trip,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateData(trip)) {
            console.log(trip);
            Trips.putTrip(trip)
                .then((response) => {
                    // Handle success
                    console.log(response.data);
                })
                .catch((error) => {
                    // Handle error
                    console.error(error);
                });

        }
        setViewAddTrip(false);
    };

    const stationList = () => {
        return
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Lähtöasema:
                <input
                    type="text"
                    list="stationList"
                    name="departureStation"
                    value={trip.departureStation}
                    onChange={handleChange}
                />
                <datalist id="stationList">
                    {stations.map((station, index) => (
                        <option key={index} value={station.nimi} />
                    ))}
                </datalist>
            </label>
            <label>
                Lähtöaika:
                <input
                    type="datetime-local"
                    name="departureTime"
                    value={trip.departureTime}
                    onChange={handleChange}
                />
            </label>
            <label>
                Palautusasema:
                <input
                    type="text"
                    name="returnStation"
                    value={trip.name}
                    onChange={handleChange}
                />
            </label>
            <label>
                Palautusaika:
                <input
                    type="datetime-local"
                    name="returnTime"
                    value={trip.returnTime}
                    onChange={handleChange}
                />
            </label>


            <br />
            <label>
                Ajettu matka metreissä
                <input
                    type="text"
                    name="coveredDistance"
                    value={trip.coveredDistance}
                    onChange={handleChange}
                />
            </label>
            <label>
                Matkan kesto sekunneissa
                <input
                    type="text"
                    name="duration"
                    value={trip.duration}
                    onChange={handleChange}
                />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default TripForm;