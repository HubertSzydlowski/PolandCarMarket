import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import userPhotoService from '../../../services/UserPageServices/UserPageVehiclePhotoService';

function UserVehiclePhotoDetails() {
    const { id: vehicleId } = useParams();
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const data = await userPhotoService.getPhotosByVehicleId(vehicleId);
                setPhotos(data);
            } catch (error) {
                console.error('Error fetching photos for vehicle:', error);
            }
        };

        fetchPhotos();
    }, [vehicleId]);

    if (!photos.length) return <p>No photos found for vehicle ID {vehicleId}.</p>;

    return (
        <div>
            <h2>Photos for Vehicle ID: {vehicleId}</h2>
            {photos.map(photo => (
                <div key={photo.id} style={{ marginBottom: '20px' }}>
                    <p>
                        <strong>ID:</strong> {photo.id} |{' '}
                        <strong>Is Main:</strong> {photo.isMain ? 'Yes' : 'No'}<br />
                        <strong>URL:</strong> {photo.photoUrl}
                    </p>
                    {photo.fullPhotoUrl && (
                        <img
                            src={photo.fullPhotoUrl}
                            alt={`Photo ${photo.id}`}
                            style={{ maxWidth: '500px', border: '1px solid #ccc', marginTop: '10px' }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

export default UserVehiclePhotoDetails;
