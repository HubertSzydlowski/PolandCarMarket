import { AdminPageControllerApi } from '../../api/src';
import apiClient from '../apiClientInstance';

const adminApi = new AdminPageControllerApi(apiClient);

const AdminDashboard = (start = null, end = null) => {
    return new Promise((resolve, reject) => {
        const opts = {};
        if (start) opts.start = start;
        if (end) opts.end = end;

        adminApi.getDashboard(opts, (error, data, response) => {
            if (error) {
                console.error('Error downloading administrator dashboard:', error);
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
};

export default AdminDashboard;
