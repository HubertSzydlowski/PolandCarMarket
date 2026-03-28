import UserControllerApi from '../../api/src/api/UserControllerApi';
import apiClient from '../apiClientInstance';

const userApi = new UserControllerApi(apiClient);

export const getFavorites = async (userId) => {
    return await new Promise((resolve, reject) => {
        userApi.getFavorites(userId, (error, data) => {
            if (error) return reject(error);
            resolve(data);
        });
    });
};

export const addToFavorites = async (userId, advertisementId) => {
    return await new Promise((resolve, reject) => {
        userApi.addToFavorites(userId, advertisementId, (error, data) => {
            if (error) return reject(error);
            resolve(data);
        });
    });
};

export const removeFromFavorites = async (userId, advertisementId) => {
    return await new Promise((resolve, reject) => {
        userApi.removeFromFavorites(userId, advertisementId, (error, data) => {
            if (error) return reject(error);
            resolve(data);
        });
    });
};

const AdminPageFavouritesService = {
    getFavorites,
    addToFavorites,
    removeFromFavorites
};

export default AdminPageFavouritesService;
