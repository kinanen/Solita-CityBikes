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

export default{
    getAll,
    getTopTrips,
    getTopDepartureStations
}