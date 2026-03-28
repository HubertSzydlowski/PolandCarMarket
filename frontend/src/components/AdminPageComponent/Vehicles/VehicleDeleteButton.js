import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminPageVehicleService from '../../../services/AdminPageServices/AdminPageVehicleService';

function AdminVehicleDeleteButton() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this vehicle?')) return;

        setLoading(true);
        setError(null);
        try {
            await AdminPageVehicleService.deleteVehicle(id);
            navigate('/vehicles');
        } catch (err) {
            setError('Error occurred while deleting the vehicle');
        }
        setLoading(false);
    };

    return (
        <div>
            <h2>Delete Vehicle</h2>
            <button onClick={handleDelete} disabled={loading}>
                {loading ? 'Deleting...' : 'Delete Vehicle'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default AdminVehicleDeleteButton;
