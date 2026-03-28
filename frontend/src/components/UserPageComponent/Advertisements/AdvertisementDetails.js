import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom';
import userAdService from '../../../services/UserPageServices/UserPageAdvertisementsService';
import TokenManager from '../../../services/TokenManager';

function UserAdvertisementDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ad, setAd] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(true);

    const username = TokenManager.getUsername();

    useEffect(() => {
        if (!TokenManager.canAccessUserPage(username)) {
            setIsAuthorized(false);
            setAuthChecked(true);
            return;
        }

        userAdService.getAdvertisementById(id)
            .then(setAd)
            .catch(err => {
                console.error('Error loading advertisement:', err);
                alert('Unable to load advertisement');
                navigate('/user/advertisements');
            })
            .finally(() => setAuthChecked(true));
    }, [id, navigate, username]);

    if (!authChecked) return <p>Checking authorization…</p>;
    if (!isAuthorized) return <Navigate to="/unauthorized" replace />;
    if (!ad) return <p>Loading…</p>;

    return (
        <div>
            <h2>Advertisement Details (User)</h2>
            <p><strong>ID:</strong> {ad.id}</p>
            <p><strong>Title:</strong> {ad.title}</p>
            <p><strong>Phone Number:</strong> {ad.phoneNumber || '-'}</p>
            <p><strong>Google Place ID:</strong> {ad.googlePlaceId || '-'}</p>
            <div>
                <Link to={`/user/advertisements/${ad.id}/edit`}><button>Edit</button></Link>
                <Link to={`/user/advertisements/${ad.id}/delete`}><button>Delete</button></Link>
                <button onClick={() => navigate('/user/advertisements')}>Back to list</button>
            </div>
        </div>
    );
}

export default UserAdvertisementDetails;
