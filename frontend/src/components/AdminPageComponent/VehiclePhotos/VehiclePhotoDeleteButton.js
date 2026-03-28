import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deletePhoto } from '../../../services/AdminPageServices/AdminPageVehiclePhotoService';

const AdminVehiclePhotoDeleteButton = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this photo?")) return;

        try {
            await deletePhoto(id);
            alert("Photo has been deleted.");
            navigate('/admin/vehicle-photos');
        } catch (error) {
            console.error("Error deleting photo (admin):", error);
            alert("Failed to delete the photo.");
        }
    };

    return (
        <button onClick={handleDelete} style={{ color: 'red' }}>
            Delete Photo
        </button>
    );
};

export default AdminVehiclePhotoDeleteButton;
