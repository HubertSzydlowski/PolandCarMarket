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
        userApi.getUserById(userId, (error, data, response) => {
            if (error) return reject(error);
            // use response.body to get raw JSON from backend
            const rawData = response?.body ?? data;
            console.log("RAW DATA FROM API:", rawData);
            resolve(rawData);
        });
    });
}

export const createUser = async (userDto) => {
    return await new Promise((resolve, reject) => {
        userApi.createUser(userDto, (error, data) => {
            if (error) return reject(error);
            resolve(data);
        });
    });
};

export const updateUser = async (userId, userDto) => {
    // force enabled to boolean
    const payload = { ...userDto, enabled: !!userDto.enabled };
    if ("isEnabled" in payload) delete payload.isEnabled;

    return await new Promise((resolve, reject) => {
        userApi.updateUser(userId, payload, (error, data, response) => {
            if (error) return reject(error);
            // again, ensure raw JSON from backend
            const rawData = response?.body ?? data;
            resolve(rawData);
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

const AdminPageUserService = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};

export default AdminPageUserService;
