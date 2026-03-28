import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import vehiclePhotoService from '../../services/VehiclePhotoServices/vehiclePhotoService';

function VehiclePhotoDetails() {
    const { id } = useParams();
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        const fetchPhoto = async () => {
            try {
                const data = await vehiclePhotoService.getPhotoById(id);
                setPhoto(data);
            } catch (error) {
                console.error('Error fetching photo:', error);
            }
        };

        fetchPhoto();
    }, [id]);

    if (!photo) return <p>Loading...</p>;

    return (
        <div>
            <h2>Photo Details (ID {photo.id})</h2>
            <p>
                <strong>ID:</strong> {photo.id}<br />
                <strong>Vehicle ID:</strong> {photo.vehicleId}<br />
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
    );
}

export default VehiclePhotoDetails;
