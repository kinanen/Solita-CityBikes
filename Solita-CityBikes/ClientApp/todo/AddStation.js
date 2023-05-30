import StationForm from "./StationForm";

const AddStation = ({setViewAddStation }) => {
        return (
            <div className="inputForm">       
                <StationForm setViewAddStation={setViewAddStation}/>
            </div>
        )
    
}

export default AddStation;