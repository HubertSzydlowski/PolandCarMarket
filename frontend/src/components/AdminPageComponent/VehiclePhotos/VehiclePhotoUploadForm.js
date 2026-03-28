import React, { useState } from 'react';
import { addPhotoToVehicle } from '../../../services/AdminPageServices/AdminPageVehiclePhotoService';

const AdminVehiclePhotoUploadForm = () => {
    const [vehicleId, setVehicleId] = useState('');
    const [isMain, setIsMain] = useState(false);
    const [username, setUsername] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert("Please select a file.");
            return;
        }

        try {
            await addPhotoToVehicle(vehicleId, isMain, username, file);
            alert("Photo uploaded successfully.");
        } catch (error) {
            console.error("Photo upload error (admin):", error);
            alert("An error occurred during upload.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Vehicle Photo (Admin)</h2>
            <div>
                <label>Vehicle ID:</label>
                <input
                    type="number"
                    value={vehicleId}
                    onChange={e => setVehicleId(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Is Main Photo?</label>
                <input
                    type="checkbox"
                    checked={isMain}
                    onChange={e => setIsMain(e.target.checked)}
                />
            </div>
            <div>
                <label>Select File:</label>
                <input
                    type="file"
                    onChange={e => setFile(e.target.files[0])}
                    required
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default AdminVehiclePhotoUploadForm;
