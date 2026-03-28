import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import vehicleService from '../../services/VehicleServices/vehicleService';

function VehicleDetails() {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVehicle = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await vehicleService.getVehicleById(id);
                if (!data) throw new Error('Vehicle not found');
                setVehicle(data);
            } catch {
                setError('Error loading vehicle');
            }
            setLoading(false);
        };
        fetchVehicle();
    }, [id]);

    if (loading) return <p>Loading vehicle...</p>;
    if (error) return <p style={{color:'red'}}>{error}</p>;
    if (!vehicle) return <p>Vehicle not found.</p>;

    return (
        <div>
            <h2>{vehicle.brand} {vehicle.model} ({vehicle.year})</h2>
            <p><b>Price:</b> {vehicle.price} PLN</p>
            <p><b>Fuel Type:</b> {vehicle.fuelType}</p>
            <p><b>Transmission:</b> {vehicle.transmission}</p>
            <p><b>Color:</b> {vehicle.color}</p>
            <p><b>Mileage:</b> {vehicle.mileage} km</p>
            <p><b>Power:</b> {vehicle.power} HP</p>
            <p><b>Seats:</b> {vehicle.seats}</p>
            <p><b>VIN:</b> {vehicle.vin}</p>
            <p><b>Condition:</b> {vehicle.condition}</p>
            <p><b>Warranty:</b> {vehicle.hasWarranty ? 'Yes' : 'No'}</p>
            <p><b>Description:</b> {vehicle.description}</p>
        </div>
    );
}

export default VehicleDetails;
