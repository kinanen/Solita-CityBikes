import axios from 'axios'
import { variables } from '../Variables'

const baseUrl = variables.API_URL;

const getAll = () => {
    return axios.get(baseUrl + "/trip");
  }

const getTopDepartureStations = () => {
    return axios( baseUrl + "/trip/topdeparturestations");
}

const getTopTrips = () => {
    return axios(baseUrl + "/trip/toptrips");
}

const postTrip = trip => {
    return axios.post(baseUrl+'/trip', trip)
}

const putTrip = trip => {
    return axios.put(baseUrl+'/trip', trip)
}


export default{
    getAll,
    getTopTrips,
    getTopDepartureStations,
    putTrip,
    postTrip
}