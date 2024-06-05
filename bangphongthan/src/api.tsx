import axios from "axios"

const axiosKDB = axios.create({
    baseURL: 'http://0.0.0.0:3000/api',
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    },
})

export default axiosKDB
