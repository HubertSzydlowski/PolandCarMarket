import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import userAdService from '../../../services/UserPageServices/UserPageAdvertisementsService';
import TokenManager from '../../../services/TokenManager';

function UserAdvertisementList() {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [authChecked, setAuthChecked] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(true);

    const username = TokenManager.getUsername();

    useEffect(() => {
        if (!TokenManager.canAccessUserPage(username)) {
            setIsAuthorized(false);
            setAuthChecked(true);
            return;
        }

        userAdService.getAllAdvertisements()
            .then(data => setAds(data.content || []))
            .catch(err => {
                console.error('Error fetching user advertisements:', err);
                setAds([]);
            })
            .finally(() => {
                setLoading(false);
                setAuthChecked(true);
            });
    }, [username]);

    if (!authChecked) return <p>Checking authorization…</p>;
    if (!isAuthorized) return <Navigate to="/unauthorized" replace />;
    if (loading) return <p>Loading your advertisements…</p>;

    return (
        <div>
            <h2>My Advertisements</h2>
            {ads.length > 0 ? (
                <ul>
                    {ads.map(ad => (
                        <li key={ad.id}>
                            <strong>{ad.title}</strong><br/>
                            Phone: {ad.phoneNumber || '-'}<br/>
                            Google Place ID: {ad.googlePlaceId || '-'}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You have no advertisements.</p>
            )}
        </div>
    );
}

export default UserAdvertisementList;
