import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserPageFavouritesService from '../../../../services/UserPageServices/UserPageFavouritesService';

const UserRemoveFromFavoritesButton = () => {
    const { advertisementId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const doRemove = async () => {
            if (!advertisementId) {
                alert('Brak id ogłoszenia');
                return navigate('/user/favorites');
            }
            if (!window.confirm('Czy na pewno chcesz usunąć to ogłoszenie z ulubionych?')) {
                return navigate('/user/favorites');
            }
            try {
                await UserPageFavouritesService.removeFromFavorites(advertisementId);
                alert('Usunięto z ulubionych');
            } catch (err) {
                console.error('Failed to remove from favorites', err);
                alert('Nie udało się usunąć z ulubionych');
            } finally {
                navigate('/user/favorites');
            }
        };
        doRemove();
    }, [advertisementId]);

    return <div style={{ padding: '2rem' }}><p>Usuwanie z ulubionych...</p></div>;
};

export default UserRemoveFromFavoritesButton;
