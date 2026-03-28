import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserPageFavouritesService from '../../../../services/UserPageServices/UserPageFavouritesService';

const UserAddToFavoritesButton = () => {
    const { advertisementId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const doAdd = async () => {
            if (!advertisementId) {
                alert('Brak id ogłoszenia');
                return navigate('/user/favorites');
            }
            try {
                await UserPageFavouritesService.addToFavorites(advertisementId);
                alert('Dodano do ulubionych');
            } catch (err) {
                console.error('Failed to add to favorites', err);
                alert('Nie udało się dodać do ulubionych');
            } finally {
                navigate('/user/favorites');
            }
        };
        doAdd();
    }, [advertisementId]);

    return <div style={{ padding: '2rem' }}><p>Dodawanie do ulubionych...</p></div>;
};

export default UserAddToFavoritesButton;
