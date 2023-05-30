import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_URI;

const getAll = () => {
    return axios.get(baseUrl + "/tripcount")
  }

const getTripCount = (dsid, rsid) => {
    return axios.get(`${baseUrl}/tripcount/gettripcount?dsid=${dsid}&rsid=${rsid}`)
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

export default{
    getAll, 
    getTripCount, 
    getPaginatedTripCounts, 
    getTripCountByDsId,
    getTripCountByRsId,
    getStationDepartureCount
}