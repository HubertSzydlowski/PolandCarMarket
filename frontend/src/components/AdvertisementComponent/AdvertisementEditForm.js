import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import advertisementService from '../../services/AdvertisementServices/advertisementService';

function AdvertisementEditForm() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [userId, setUserId] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [googlePlaceId, setGooglePlaceId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        advertisementService.getAdvertisementById(id)
            .then(ad => {
                setTitle(ad.title);
                setUserId(ad.userId);
                setPhoneNumber(ad.phoneNumber || '');
                setGooglePlaceId(ad.googlePlaceId || '');
            })
            .catch(err => {
                console.error('Error loading advertisement:', err);
                alert('Unable to load advertisement');
                navigate('/advertisements');
            });
    }, [id, navigate]);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const dto = {
                title,
                userId: parseInt(userId, 10),
                phoneNumber: phoneNumber || null,
                googlePlaceId: googlePlaceId || null
            };
            await advertisementService.updateAdvertisement(id, dto);
            navigate(`/advertisements/${id}`);
        } catch (err) {
            console.error('Error updating advertisement:', err);
            alert('Error saving advertisement');
        }
    };

    return (
        <div>
            <h2>Edit Advertisement</h2>
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
                    <label>User ID:</label>
                    <input
                        type="number"
                        value={userId}
                        onChange={e => setUserId(e.target.value)}
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
                <button type="button" onClick={() => navigate(-1)}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default AdvertisementEditForm;
