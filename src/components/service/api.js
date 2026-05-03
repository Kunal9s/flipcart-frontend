import axios from 'axios';

const URL = 'http://localhost:8000';

const API = axios.create({
    baseURL: URL
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
})

export const authenticateSignup = async (data) => {
    try {
        // return await axios.post(`${URL}/signup`, data);
        return await API.post('/signup', data);
    } catch (error) {
        console.log("Error while calling signup api", error);
        return null;
    }
}

export const authenticateLogin = async (data) => {
    try {

        const response = await API.post('/login', data);

        if (response.status === 200) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
        }

        return response;

        // return await axios.post(`${URL}/login`, data);
    } catch (error) {
        console.log("Error while calling login api", error);
        return null;
        
    }
}

export const payUsingPaytm = async (data) => {
    try {
        // const response = await axios.post(`${URL}/payment`, data);
        const response = await API.post('/payment', data);
        return response.data;
    } catch (error) {
        console.log('Error while calling payment api ', error);
    }
}