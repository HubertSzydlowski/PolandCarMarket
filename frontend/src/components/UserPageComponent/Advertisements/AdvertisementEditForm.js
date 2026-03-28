import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import userAdService from '../../../services/UserPageServices/UserPageAdvertisementsService';
import TokenManager from '../../../services/TokenManager';

function UserAdvertisementEditForm() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [googlePlaceId, setGooglePlaceId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        userAdService.getAdvertisementById(id)
            .then(ad => {
                setTitle(ad.title);
                setPhoneNumber(ad.phoneNumber || '');
                setGooglePlaceId(ad.googlePlaceId || '');
            })
            .catch(err => {
                console.error('Error loading advertisement:', err);
                alert('Unable to load advertisement');
                navigate('/user/advertisements');
            });
    }, [id, navigate]);

    const username = TokenManager.getUsername();
    if (!TokenManager.canAccessUserPage(username)) {
        return <Navigate to="/unauthorized" replace />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dto = { title, phoneNumber, googlePlaceId };
            await userAdService.updateAdvertisement(id, dto);
            navigate(`/user/advertisements/${id}`);
        } catch (err) {
            console.error('Error updating advertisement:', err);
            alert('Error saving advertisement');
        }
    };

    return (
        <div>
            <h2>Edit Advertisement (User)</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div>
                    <label>Google Place ID:</label>
                    <input
                        type="text"
                        value={googlePlaceId}
                        onChange={e => setGooglePlaceId(e.target.value)}
                    />
                </div>
                <button type="submit">Save</button>
                <button type="button" onClick={() => navigate(-1)}>Cancel</button>
            </form>
        </div>
    );
}

export default UserAdvertisementEditForm;
