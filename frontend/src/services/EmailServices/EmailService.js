import EmailControllerApi from '../../api/src/api/EmailControllerApi';
import EmailDto from '../../api/src/model/EmailDto';
import apiClient from '../apiClientInstance';

const emailApi = new EmailControllerApi(apiClient);

export const verifyEmail = async (token) => {
    return new Promise((resolve, reject) => {
        emailApi.verifyEmail(token, (error, data) => {
            if (error) return reject(error);
            resolve(data);
        });
    });
};

export const resetPasswordRequest = async (email) => {
    const emailDto = new EmailDto();
    emailDto.email = email;

    return new Promise((resolve, reject) => {
        emailApi.resetPasswordRequest(emailDto, (error, data) => {
            if (error) return reject(error);
            resolve(data);
        });
    });
};

export const resetPassword = async (token, newPassword) => {
    const emailDto = new EmailDto();
    emailDto.token = token;
    emailDto.newPassword = newPassword;

    return new Promise((resolve, reject) => {
        emailApi.resetPassword(emailDto, (error, data) => {
            if (error) return reject(error);
            resolve(data);
        });
    });
};

const emailService = {
    verifyEmail,
    resetPasswordRequest,
    resetPassword,
};

export default emailService;