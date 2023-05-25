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

const getAverageDistanceByDStationandRStation = (dsid, rsid) =>{
    return axios.get(`${baseUrl}/trip/getaveragedistancebystations?dsid=${dsid}&rsid=${rsid}`)
}

const getAverageDurationByStation = (stationId) =>{
    return axios.get(`${baseUrl}/trip/getaveragedurationbystation?stationid=${stationId}`)
}

const getAverageDurationByDStationandRStation = (dsid, rsid) =>{
    return axios.get(`${baseUrl}/trip/getaveragedurationbystations?dsid=${dsid}&rsid=${rsid}`)
}

const getTripCountPerMonthStation = (dsid, rsid, month) =>{
    const year = 2021
    return axios.get(`${baseUrl}/trip/gettripcountpermonthstation?dsid=${dsid}&rsid=${rsid}&month=${month}&year=${year}`)
}
//[HttpGet("getaveragedurationbystation")]
//public int GetTripCountPerMonthStation(int dsid, int rsid, int month, int year)


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
    getAverageDurationByStation,
    getTripCountPerMonthStation,
    getAverageDurationByDStationandRStation,
    getAverageDistanceByDStationandRStation

}