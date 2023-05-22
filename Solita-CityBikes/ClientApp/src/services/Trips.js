import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_URI;

const getAll = () => {
    return axios.get(baseUrl + "/trip");
  }

const getPaginatedTrips = (pageNumber, pageSize) => {
    return axios.get(`${baseUrl}/trip/getPaginatedTrips?pagenumber=${pageNumber}&pagesize=${pageSize}`)
}

const getTopTrips = () => {
    return axios.get(baseUrl + "/trip/toptrips");
}

const getAverageDistanceByStation = (stationId) =>{
    return axios.get(`${baseUrl}/trip/getaveragedistancebystation?stationid=${stationId}`)
}

const getAverageDurationByStation = (stationId) =>{
    return axios.get(`${baseUrl}/trip/getaveragedurationbystation?stationid=${stationId}`)
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
    getPaginatedTrips,
    putTrip,
    postTrip,
    getAverageDistanceByStation,
    getAverageDurationByStation

}