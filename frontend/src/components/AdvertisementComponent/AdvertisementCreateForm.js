import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import advertisementService from '../../services/AdvertisementServices/advertisementService';

function AdvertisementCreateForm() {
    const [title, setTitle] = useState('');
    const [userId, setUserId] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [googlePlaceId, setGooglePlaceId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dto = {
                title,
                userId: parseInt(userId, 10),
                phoneNumber: phoneNumber || null,
                googlePlaceId: googlePlaceId || null
            };
            const created = await advertisementService.createAdvertisement(dto);
            navigate(`/advertisements/${created.id}`);
        } catch (err) {
            console.error('Error creating advertisement:', err);
            alert('Error occurred while creating advertisement');
        }
    };

    return (
        <div>
            <h2>Create Advertisement</h2>
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
                    <label htmlFor="userId">User ID:</label>
                    <input
                        id="userId"
                        type="number"
                        value={userId}
                        onChange={e => setUserId(e.target.value)}
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
                <button type="button" onClick={() => navigate('/advertisements')}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default AdvertisementCreateForm;
