import axios from 'axios'


const baseUrl = process.env.REACT_APP_API_URI;

const getAll = () => {
    return axios.get(baseUrl + "/tripcount")
  }

const getTripCount = (dsid, rsid) => {
    return axios.get(baseUrl + "/tripcount/" + dsid + rsid)
}

const getPaginatedTripCounts = (pageNumber, pageSize) => {
    return axios.get(`${baseUrl}/tripcount/getpaginatedtripcounts?pagenumber=${pageNumber}&pagesize=${pageSize}`)
}

const getStationDepartureCount = () => {
    return axios.get(`${baseUrl}/tripcount/getstationcount`)
}

const getTripCountByDsId = (dsid) =>{
    return axios.get(`${baseUrl}/tripcount/departures?dsid=${dsid}`)
}

const getTripCountByRsId = (rsid) =>{
    return axios.get(`${baseUrl}/tripcount/returns?rsid=${rsid}`)
}

const postTripCount = tripCount => {
    return axios.post(baseUrl+'/tripcount', tripCount)
}

const putTripCount = tripCount => {
    return axios.put(baseUrl+'/tripcount', tripCount)
}

const deleteTripCount = (id) => {
    return axios.delete(baseUrl + "/tripcount/" + id)
}

export default{
    getAll, 
    getTripCount, 
    putTripCount, 
    postTripCount, 
    deleteTripCount, 
    getPaginatedTripCounts, 
    getTripCountByDsId,
    getTripCountByRsId,
    getStationDepartureCount
}