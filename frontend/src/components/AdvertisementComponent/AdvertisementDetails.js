import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import advertisementService from '../../services/AdvertisementServices/advertisementService';

function AdvertisementDetails() {
    const { id } = useParams();
    const [ad, setAd] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        advertisementService.getAdvertisementById(id)
            .then(data => setAd(data))
            .catch(err => {
                console.error('Error loading advertisement:', err);
                alert('Unable to load advertisement');
                navigate('/advertisements');
            });
    }, [id, navigate]);

    if (!ad) return <p>Loading…</p>;

    return (
        <div>
            <h2>Advertisement Details</h2>
            <p><strong>ID:</strong> {ad.id}</p>
            <p><strong>Title:</strong> {ad.title}</p>
            <p><strong>User ID:</strong> {ad.userId}</p>
            <p><strong>Phone Number:</strong> {ad.phoneNumber || 'N/A'}</p>
            <p><strong>Google Place ID:</strong> {ad.googlePlaceId || 'N/A'}</p>
            <div>
                <Link to={`/advertisements/${ad.id}/edit`}>
                    <button>Edit</button>
                </Link>
                <Link to={`/advertisements/${ad.id}/delete`}>
                    <button>Delete</button>
                </Link>
                <button onClick={() => navigate('/advertisements')}>
                    Back to list
                </button>
            </div>
        </div>
    );
}

export default AdvertisementDetails;
