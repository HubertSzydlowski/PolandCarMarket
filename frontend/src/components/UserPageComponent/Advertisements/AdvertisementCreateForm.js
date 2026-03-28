import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import userAdService from '../../../services/UserPageServices/UserPageAdvertisementsService';
import TokenManager from '../../../services/TokenManager';

function UserAdvertisementCreateForm() {
    const [title, setTitle] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [googlePlaceId, setGooglePlaceId] = useState('');
    const navigate = useNavigate();

    const username = TokenManager.getUsername();
    if (!TokenManager.canAccessUserPage(username)) {
        return <Navigate to="/unauthorized" replace />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dto = { title, phoneNumber, googlePlaceId };
            const created = await userAdService.createAdvertisement(dto);
            navigate(`/user/advertisements/${created.id}`);
        } catch (err) {
            console.error('Error creating advertisement:', err);
            alert('Error occurred while creating advertisement');
        }
    };

    return (
        <div>
            <h2>Create Advertisement (User)</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        id="phoneNumber"
                        type="text"
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="googlePlaceId">Google Place ID:</label>
                    <input
                        id="googlePlaceId"
                        type="text"
                        value={googlePlaceId}
                        onChange={e => setGooglePlaceId(e.target.value)}
                    />
                </div>
                <button type="submit">Create</button>
                <button type="button" onClick={() => navigate('/user/advertisements')}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default UserAdvertisementCreateForm;
