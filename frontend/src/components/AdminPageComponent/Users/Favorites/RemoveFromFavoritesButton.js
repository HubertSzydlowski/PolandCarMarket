import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminPageFavouritesService from '../../../../services/AdminPageServices/AdminPageFavouritesService';

const AdminRemoveFromFavoritesButton = () => {
    const { userId, advertisementId } = useParams();
    const navigate = useNavigate();

    const handleRemove = async () => {
        try {
            await AdminPageFavouritesService.removeFromFavorites(userId, advertisementId);
            alert('Removed from favorites');
            navigate(`/admin/users/${userId}/favorites`);
        } catch (err) {
            console.error('Failed to remove from favorites', err);
            alert('Failed to remove from favorites');
        }
    };

    return <button onClick={handleRemove}>Remove from Favorites</button>;
};

export default AdminRemoveFromFavoritesButton;
