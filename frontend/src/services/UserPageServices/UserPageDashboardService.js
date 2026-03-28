import { UserPageControllerApi } from '../../api/src';
import apiClient from '../apiClientInstance';

const userApi = new UserPageControllerApi(apiClient);

const UserDashboard = () => {
    return new Promise((resolve, reject) => {
        userApi.getUserDashboard((error, data, response) => {
            if (error) {
                console.error('Błąd pobierania dashboardu użytkownika:', error);
                reject(error);
            } else {
                const payload =
                    (response && (response.body || response.obj || response.response)) ||
                    (response && response.data) ||
                    data;

                console.debug('UserDashboard resolved payload:', payload);

                resolve(payload);
            }
        });
    });
};

export default UserDashboard;