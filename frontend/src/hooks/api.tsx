import axios from "axios";
import { BASE_URL } from "../utils/constant";

const API = axios.create({
    baseURL : BASE_URL,
    headers : {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
    }
})

export default API;