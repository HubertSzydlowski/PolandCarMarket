import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import favoritesService from '../../../services/UserServices/favoritesService';

const UserFavorites = () => {
    const { userId } = useParams();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const data = await favoritesService.getFavorites(userId);
                setFavorites(data);
            } catch (err) {
                console.error('Failed to load favorites', err);
            }
        };

        if (userId) {
            fetchFavorites();
        }
    }, [userId]);

    return (
        <div>
            <h2>My Favorites</h2>
            <ul>
                {favorites.map((adId) => (
                    <li key={adId}>Advertisement ID: {adId}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserFavorites;
