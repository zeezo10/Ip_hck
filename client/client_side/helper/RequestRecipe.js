import axios from "axios"

const RequestRecipe = axios.create({
    baseURL : "https://ip.visionaryvibes.site"
    // baseURL : "http://localhost:3000"
})

export default RequestRecipe