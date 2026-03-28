import React, { useEffect, useState } from 'react';
import vehiclePhotoService from '../../../services/UserPageServices/UserPageVehiclePhotoService';

function UserVehiclePhotoList() {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const data = await vehiclePhotoService.getAllPhotos();
                setPhotos(data);
            } catch (error) {
                console.error('Error fetching photos (user):', error);
            }
        };

        fetchPhotos();
    }, []);

    return (
        <div>
            <h2>Vehicle Photo List (User)</h2>
            {photos.map(photo => (
                <div key={photo.id} style={{ marginBottom: '20px' }}>
                    <p>
                        <strong>ID:</strong> {photo.id} |{' '}
                        <strong>Vehicle ID:</strong> {photo.vehicleId} |{' '}
                        <strong>Is Main:</strong> {photo.isMain ? 'Yes' : 'No'}
                    </p>
                    {photo.fullPhotoUrl && (
                        <img
                            src={photo.fullPhotoUrl}
                            alt={`Photo ${photo.id}`}
                            style={{ maxWidth: '400px', border: '1px solid #ccc' }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

export default UserVehiclePhotoList;
