import axios from 'axios'
import { variables } from '../Variables'

const baseUrl = variables.API_URL;

const getAll = () => {
    return axios.get(baseUrl + "/station")
  }

const getStation = id => {
    return axios.get(baseUrl + "/station" + id)
}


export default{
    getAll, getStation
}