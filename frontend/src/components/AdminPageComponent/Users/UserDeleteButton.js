import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminPageUserService from '../../../services/AdminPageServices/AdminPageUserService';

const AdminUserDeleteButton = ({ onDeleted }) => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await AdminPageUserService.deleteUser(userId);
                if (onDeleted) {
                    onDeleted();
                } else {
                    navigate('/admin/users');
                }
            } catch (err) {
                console.error('Failed to delete user:', err);
            }
        }
    };

    return <button onClick={handleDelete}>Delete User</button>;
};

export default AdminUserDeleteButton;
