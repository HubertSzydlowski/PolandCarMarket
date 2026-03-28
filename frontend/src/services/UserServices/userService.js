import UserControllerApi from '../../api/src/api/UserControllerApi';
import apiClient from '../apiClientInstance';

const userApi = new UserControllerApi(apiClient);

export const getAllUsers = async () => {
    return await new Promise((resolve, reject) => {
        userApi.getAllUsers((error, data) => {
            if (error) return reject(error);
            resolve(data);
        });
    });
};

export const getUserById = async (userId) => {
    return await new Promise((resolve, reject) => {
        userApi.getUserById(userId, (error, data) => {
            if (error) return reject(error);
            resolve(data);
        });
    });
};

export const createUser = async (userDto) => {
    return await new Promise((resolve, reject) => {
        userApi.createUser(userDto, (error, data) => {
            if (error) return reject(error);
            resolve(data);
        });
    });
};

export const updateUser = async (userId, userDto) => {
    return await new Promise((resolve, reject) => {
        userApi.updateUser(userId, userDto, (error, data) => {
            if (error) return reject(error);
            resolve(data);
        });
    });
};

export const deleteUser = async (userId) => {
    return await new Promise((resolve, reject) => {
        userApi.deleteUser(userId, (error) => {
            if (error) return reject(error);
            resolve();
        });
    });
};

const userService = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};

export default userService;
