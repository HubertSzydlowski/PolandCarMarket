import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminPageFavouritesService from '../../../../services/AdminPageServices/AdminPageFavouritesService';

const AdminAddToFavoritesButton = () => {
    const { userId, advertisementId } = useParams();
    const navigate = useNavigate();

    const handleAdd = async () => {
        try {
            await AdminPageFavouritesService.addToFavorites(userId, advertisementId);
            alert('Added to favorites');
            navigate(`/admin/users/${userId}/favorites`);
        } catch (err) {
            console.error('Failed to add to favorites', err);
            alert('Failed to add to favorites');
        }
    };

    return <button onClick={handleAdd}>Add to Favorites</button>;
};

export default AdminAddToFavoritesButton;
