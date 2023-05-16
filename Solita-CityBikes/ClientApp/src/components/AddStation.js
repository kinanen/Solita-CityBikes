import StationForm from "./StationForm";

const AddStation = ({ viewAddStation, setViewAddStation }) => {
        return (
            <div>       
                <StationForm setViewAddStation={setViewAddStation}/>
                <button onClick={() => setViewAddStation(false)}>
                    sulje
                </button>    
            </div>
        )
    
}

export default AddStation;