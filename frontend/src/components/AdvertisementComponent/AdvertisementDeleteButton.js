import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import advertisementService from '../../services/AdvertisementServices/advertisementService';

function AdvertisementDeleteButton() {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this advertisement?')) return;
        try {
            await advertisementService.deleteAdvertisement(id);
            // Navigate back to the advertisement list after deletion
            navigate('/advertisements');
        } catch (err) {
            console.error('Error deleting advertisement:', err);
            alert('Error occurred while deleting the advertisement');
        }
    };

    return (
        <div>
            <h2>Delete Advertisement</h2>
            <p>Are you sure you want to delete the advertisement with ID {id}?</p>
            <button onClick={handleDelete}>Yes, delete</button>
            <button onClick={() => navigate(-1)}>Cancel</button>
        </div>
    );
}

export default AdvertisementDeleteButton;
