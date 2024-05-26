import axios from "../axios";

//api xu li ben phia front-end
const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
}
const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}


export { handleLoginApi, getAllUsers }
