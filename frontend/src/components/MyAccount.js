import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TokenManager from '../services/TokenManager';

const MyAccount = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const role = TokenManager.getUserRole();

        if (role === 'USER') {
            navigate('/user/my-account', { replace: true });
        } else if (role === 'ADMIN') {
            navigate('/admin/my-account', { replace: true });
        } else {
            navigate('/users/login', { replace: true });
        }
    }, [navigate]);

    return null;
};

export default MyAccount;
