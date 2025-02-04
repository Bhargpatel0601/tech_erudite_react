import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/users`;

export const createUser = async (userData) => {
    try {
        const response = await axios.post(API_URL, userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const verifyOTP = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/verify-otp`, userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const Login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const VerifyToken = async (token) => {
    try {
        const response = await axios.post(`${API_URL}/verifyToken`, {},  {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};