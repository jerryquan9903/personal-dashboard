import axios from "axios";

const api = axios.create({baseURL: 'http://192.168.1.11:8081/'});
api.defaults.headers.common["Access-Control-Allow-Origin"] = "*";


export default api;