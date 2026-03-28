import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom';
import adminAdService from '../../../services/AdminPageServices/AdminPageAdvertisementsService';
import TokenManager from '../../../services/TokenManager';

function AdminAdvertisementDetails() {
    const { id } = useParams();
    const [ad, setAd] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        adminAdService.getAdvertisementById(id)
            .then(setAd)
            .catch(err => {
                console.error('Error loading advertisement:', err);
                alert('Unable to load advertisement');
                navigate('/admin/advertisements');
            });
    }, [id, navigate]);

    if (!TokenManager.canAccessAdminPage()) {
        return <Navigate to="/unauthorized" replace />;
    }

    if (!ad) return <p>Loading…</p>;

    return (
        <div>
            <h2>Advertisement Details (Admin)</h2>
            <p><strong>ID:</strong> {ad.id}</p>
            <p><strong>Title:</strong> {ad.title}</p>
            <p><strong>User ID:</strong> {ad.userId}</p>
            <p><strong>Phone Number:</strong> {ad.phoneNumber || '—'}</p>
            <p><strong>Google Place ID:</strong> {ad.googlePlaceId || '—'}</p>
            <div>
                <Link to={`/admin/advertisements/${ad.id}/edit`}><button>Edit</button></Link>
                <Link to={`/admin/advertisements/${ad.id}/delete`}><button>Delete</button></Link>
                <button onClick={() => navigate('/admin/advertisements')}>Back to list</button>
            </div>
        </div>
    );
}

export default AdminAdvertisementDetails;
