import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import userService from '../../../services/UserServices/userService';

const UserDeleteButton = ({ onDeleted }) => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await userService.deleteUser(userId);
                if (onDeleted) {
                    onDeleted();
                } else {
                    navigate('/users');
                }
            } catch (err) {
                console.error('Failed to delete user', err);
            }
        }
    };

    return (
        <button onClick={handleDelete}>
            Delete User
        </button>
    );
};

export default UserDeleteButton;
