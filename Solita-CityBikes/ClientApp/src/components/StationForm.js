import { useState } from "react";
import Stations from "../services/Stations";

const StationForm = ({ setViewAddStation }) => {
    const [station, setStation] = useState({
        hslStationId: '',
        nimi: '',
        namn: '',
        name: '',
        x: '',
        y: '',
    });

    const validateData = (station) => {
        console.log('validate station data: ' + station)
        return true;
    }

    const handleChange = (event) => {
        setStation({
            ...station,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateData(station)) {
            console.log(station);
            Stations.putStation(station)
                .then((response) => {
                    // Handle success
                    console.log(response.data);
                })
                .catch((error) => {
                    // Handle error
                    console.error(error);
                });

        }
        setViewAddStation(false);
    };

    return (
        <div className="modal-content">
            <form onSubmit={handleSubmit}>
                <h3>Lisää asema</h3>
                <p>
                    <label>
                        Aseman Hsl-id:
                        <input
                            type="text"
                            name="hslStationId"
                            value={station.hslStationId}
                            onChange={handleChange}
                        />
                    </label>
                </p>
                <p>
                    <label>
                        Aseman nimi (Fin):
                        <input
                            type="text"
                            name="nimi"
                            value={station.nimi}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Station namn (Swe):
                        <input
                            type="text"
                            name="namn"
                            value={station.namn}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Station name (Eng):
                        <input
                            type="text"
                            name="name"
                            value={station.name}
                            onChange={handleChange}
                        />
                    </label>
                </p>
                <p>
                    <label>
                        X-koordinatti
                        <input
                            type="text"
                            name="x"
                            value={station.x}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Y-koordinaatti
                        <input
                            type="text"
                            name="y"
                            value={station.y}
                            onChange={handleChange}
                        />
                    </label>
                </p>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default StationForm;