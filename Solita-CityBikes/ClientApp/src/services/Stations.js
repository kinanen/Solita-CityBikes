import axios from 'axios'
import { variables } from '../Variables'

const baseUrl = variables.API_URL;

const getAll = () => {
    return axios.get(baseUrl + "/station")
  }

const getStation = id => {
    return axios.get(baseUrl + "/station" + id)
}

const postStation = station => {
    return axios.post(baseUrl+'/station', station)
}

const putStation = station => {
    return axios.put(baseUrl+'/station', station)
}

export default{
    getAll, getStation, putStation, postStation
}