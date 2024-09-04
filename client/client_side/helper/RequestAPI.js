import axios from "axios"

const RequestAPI = axios.create({
    // baseURL : "184.73.49.203"
    baseURL : "https://api.spoonacular.com"
})

export default RequestAPI