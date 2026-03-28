import React from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import userAdService from '../../../services/UserPageServices/UserPageAdvertisementsService';
import TokenManager from '../../../services/TokenManager';

function UserAdvertisementDeleteButton() {
    const { id } = useParams();
    const navigate = useNavigate();

    const username = TokenManager.getUsername();
    if (!TokenManager.canAccessUserPage(username)) {
        return <Navigate to="/unauthorized" replace />;
    }

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this advertisement?')) return;
        try {
            await userAdService.deleteAdvertisement(id);
            navigate('/user/advertisements');
        } catch (err) {
            console.error('Error deleting advertisement:', err);
            alert('Error occurred while deleting the advertisement');
        }
    };

    return (
        <div>
            <h2>Delete Advertisement (User)</h2>
            <p>Are you sure you want to delete the advertisement with ID {id}?</p>
            <button onClick={handleDelete}>Yes, delete</button>
            <button onClick={() => navigate(-1)}>Cancel</button>
        </div>
    );
}

export default UserAdvertisementDeleteButton;
