import React from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import adminAdService from '../../../services/AdminPageServices/AdminPageAdvertisementsService';
import TokenManager from '../../../services/TokenManager';

function AdminAdvertisementDeleteButton() {
    const { id } = useParams();
    const navigate = useNavigate();

    if (!TokenManager.canAccessAdminPage()) {
        return <Navigate to="/unauthorized" replace />;
    }

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this advertisement?')) return;
        try {
            await adminAdService.deleteAdvertisement(id);
            navigate('/admin/advertisements');
        } catch (err) {
            console.error('Error deleting advertisement:', err);
            alert('Error occurred while deleting the advertisement');
        }
    };

    return (
        <div>
            <h2>Delete Advertisement (Admin)</h2>
            <p>Are you sure you want to delete the advertisement with ID {id}?</p>
            <button onClick={handleDelete}>Yes, delete</button>
            <button onClick={() => navigate(-1)}>Cancel</button>
        </div>
    );
}

export default AdminAdvertisementDeleteButton;
