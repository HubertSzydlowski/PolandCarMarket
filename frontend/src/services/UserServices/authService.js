import UserControllerApi from '../../api/src/api/UserControllerApi';
import apiClient from '../apiClientInstance';
import tokenManager from '../TokenManager';

const userApi = new UserControllerApi(apiClient);

export const login = async (userDto) => {
    const response = await fetch(`${apiClient.basePath}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDto),
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    const tokens = await response.json();
    tokenManager.saveToken(tokens.accessToken);

    return tokens;
};

export const logout = async () => {
    const token = tokenManager.getAccessToken();

    const response = await fetch(`${apiClient.basePath}/users/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Authorization': token ? `Bearer ${token}` : '',
        }
    });

    if (!response.ok) {
        throw new Error('Logout failed');
    }

    tokenManager.clearToken();
};

export const refreshToken = async () => {
    const response = await fetch(`${apiClient.basePath}/users/refresh-token`, {
        method: 'POST',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Refresh token failed');
    }

    const newAccessToken = await response.text();
    tokenManager.saveToken(newAccessToken);

    return newAccessToken;
};

const authService = {
    login,
    logout,
    refreshToken
};

export default authService;
