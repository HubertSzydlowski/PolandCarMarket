import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../../services/UserServices/authService';
import tokenManager from '../../../services/TokenManager';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error('Backend logout failed (continuing local cleanup):', error);
        }

        try {
            tokenManager.removeToken();
        } catch (err) {
            console.error('Error removing token from localStorage:', err);
        }

        navigate('/', { replace: true });
        setTimeout(() => {
            try { window.location.reload(); } catch (e) {}
        }, 80);
    };

    return (
        <button
            style={{
                backgroundColor: 'white',
                color: '#8b0000',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
            }}
            onClick={handleLogout}
        >
            Logout
            <img
                src="/icons/logout.png"
                alt="logout"
                style={{ width: '20px', height: '20px' }}
            />
        </button>
    );
};

export default LogoutButton;
