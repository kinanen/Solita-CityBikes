import axios from 'axios'



const baseUrl = process.env.REACT_APP_API_URI;

const getAll = () => {
    return axios.get(baseUrl + "/station")
  }

const getStation = id => {
    return axios.get(baseUrl + "/station/" + id)
}

const getStationName = id => {
    return axios.get(baseUrl + "/station/name" + id)

    
}

const postStation = station => {
    return axios.post(baseUrl+'/station', station)
}

const putStation = station => {
    return axios.put(baseUrl+'/station', station)
}

const deleteStation = (id) => {
    return axios.delete(baseUrl + "/station/" + id)
}

export default{
    getAll, 
    getStation, 
    putStation, 
    postStation, 
    deleteStation,
    getStationName
}