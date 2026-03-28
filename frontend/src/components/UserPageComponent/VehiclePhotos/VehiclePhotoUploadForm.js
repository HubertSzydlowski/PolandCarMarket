import React, { useState } from 'react';
import { addPhotoToVehicle } from '../../../services/UserPageServices/UserPageVehiclePhotoService';

const UserVehiclePhotoUploadForm = () => {
    const [vehicleId, setVehicleId] = useState('');
    const [isMain, setIsMain] = useState(false);
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const parsedVehicleId = Number(vehicleId);
        if (!parsedVehicleId || parsedVehicleId <= 0) {
            alert("Please enter a valid vehicle ID.");
            return;
        }

        if (!file) {
            alert("Please select a file.");
            return;
        }

        try {
            await addPhotoToVehicle(parsedVehicleId, isMain, file);
            alert("Photo uploaded successfully.");
            setVehicleId('');
            setIsMain(false);
            setFile(null);
        } catch (error) {
            console.error("Photo upload error (user):", error);
            alert("An error occurred during upload.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Vehicle Photo (User)</h2>
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
                    accept="image/*"
                    onChange={e => setFile(e.target.files[0])}
                    required
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default UserVehiclePhotoUploadForm;
