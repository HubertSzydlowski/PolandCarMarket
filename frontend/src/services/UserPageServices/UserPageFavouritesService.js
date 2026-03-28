import UserPageControllerApi from '../../api/src/api/UserPageControllerApi';
import apiClient from '../apiClientInstance';
import { jwtDecode } from 'jwt-decode';

const userApi = new UserPageControllerApi(apiClient);

const callApi = (method, ...args) =>
    new Promise((resolve, reject) => {
        method(...args, (error, data) => {
            if (error) return reject(error);
            resolve(data);
        });
    });

export const getUserIdFromToken = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;
    try {
        const decoded = jwtDecode(token.replace(/^Bearer\s+/i, ''));
        return decoded.userId || decoded.sub || null;
    } catch (error) {
        console.error('Błąd dekodowania tokena:', error);
        return null;
    }
};

export const getFavorites = async () => {
    return callApi(userApi.getFavorites1.bind(userApi));
};

export const addToFavorites = async (advertisementId) => {
    if (advertisementId == null) throw new Error('advertisementId is required');
    return callApi(userApi.addToFavorites1.bind(userApi), advertisementId);
};

export const removeFromFavorites = async (advertisementId) => {
    if (advertisementId == null) throw new Error('advertisementId is required');
    return callApi(userApi.removeFromFavorites1.bind(userApi), advertisementId);
};

const UserPageFavouritesService = {
    getUserIdFromToken,
    getFavorites,
    addToFavorites,
    removeFromFavorites,
};

export default UserPageFavouritesService;
