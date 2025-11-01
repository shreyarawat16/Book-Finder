import axios from "axios"

//in production, there is no localhost so we have to make this dyamic
const BASE_URL= import.meta.env.MODE === "development" ?
"http://localhost:3000/api": "/api";

const api= axios.create({
    baseURL: BASE_URL
})

export default api