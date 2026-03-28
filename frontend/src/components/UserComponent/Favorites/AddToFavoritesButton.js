import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import favoritesService from '../../../services/UserServices/favoritesService';

const AddToFavoritesButton = () => {
    const { userId, advertisementId } = useParams();
    const navigate = useNavigate();

    const handleAdd = async () => {
        try {
            await favoritesService.addToFavorites(userId, advertisementId);
            alert('Added to favorites');
            navigate(`/users/${userId}/favorites`);
        } catch (err) {
            console.error('Failed to add to favorites', err);
            alert('Failed to add to favorites');
        }
    };

    return <button onClick={handleAdd}>Add to Favorites</button>;
};

export default AddToFavoritesButton;
