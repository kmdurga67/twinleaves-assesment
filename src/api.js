import axios from 'axios';

const API_URL = 'https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products';
const USER_API_URL = 'http://localhost:5000/users'; 
//https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products?page=2

export const fetchProducts = async (page = 1) => {
    try {
        const response = await axios.get(`${API_URL}?page=${page}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching products');
    }
};

export const registerUser = async (user) => {
    try {
        const response = await axios.post(USER_API_URL, user);
        return response.data;
    } catch (error) {
        throw new Error('Error registering user');
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await axios.get(USER_API_URL, {
            params: { ...credentials }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error logging in');
    }
};
