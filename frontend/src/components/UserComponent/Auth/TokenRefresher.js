import { useEffect } from 'react';
import authService from '../../../services/UserServices/authService';

const TokenRefresher = () => {
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                await authService.refreshToken();
                console.log('Token refreshed');
            } catch (err) {
                console.error('Failed to refresh token', err);
            }
        }, 180 * 1000);

        return () => clearInterval(interval);
    }, []);

    return null;
};

export default TokenRefresher;
