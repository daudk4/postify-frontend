import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})


api.interceptors.response.use(
    (response) => {
        let newResponse;
        if (response.data.message) newResponse = { status: response.status, message: response.data.message }
        else newResponse = { status: response.status, data: response.data.data }
        return newResponse
    },
    (error) => {
        const newError = { status: error.status, message: error.response.data.message }
        return Promise.reject(newError)
    }
)


export default api