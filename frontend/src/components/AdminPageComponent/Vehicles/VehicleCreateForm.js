import React, { useState } from 'react';
import AdminPageVehicleService, { brandModels } from '../../../services/AdminPageServices/AdminPageVehicleService';
import { useNavigate } from 'react-router-dom';

function AdminVehicleCreateForm() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        brand: '',
        model: '',
        year: '',
        price: '',
        fuelType: 'PETROL',
        transmission: 'MANUAL',
        color: '',
        mileage: '',
        power: '',
        seats: 1,
        description: '',
        vin: '',
        condition: 'USED',
        hasWarranty: false,
        advertisementId: ''
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const models = form.brand && brandModels[form.brand] ? brandModels[form.brand] : [];

    const handleChange = e => {
        const { name, value, type, checked } = e.target;

        if (name === 'brand') {
            setForm(prev => ({
                ...prev,
                brand: value,
                model: '',
            }));
        } else {
            setForm(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const vehicleDto = {
                ...form,
                year: Number(form.year),
                price: Number(form.price),
                mileage: Number(form.mileage),
                power: Number(form.power),
                seats: Number(form.seats),
                hasWarranty: Boolean(form.hasWarranty),
                advertisementId: Number(form.advertisementId),
                description: form.description
            };

            await AdminPageVehicleService.createVehicle(vehicleDto);
            navigate('/vehicles');
        } catch {
            setError('Error creating vehicle');
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Vehicle</h2>

            <label>
                Brand:
                <select name="brand" value={form.brand} onChange={handleChange} required>
                    <option value="">-- Select Brand --</option>
                    {Object.keys(brandModels).map(b => (
                        <option key={b} value={b}>{b}</option>
                    ))}
                </select>
            </label><br />

            <label>
                Model:
                <select
                    name="model"
                    value={form.model}
                    onChange={handleChange}
                    required
                    disabled={!form.brand}
                >
                    <option value="">-- Select Model --</option>
                    {models.map(m => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                </select>
            </label><br />

            <label>Year: <input name="year" type="number" value={form.year} onChange={handleChange} required /></label><br />
            <label>Price: <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} required /></label><br />

            <label>Fuel Type:
                <select name="fuelType" value={form.fuelType} onChange={handleChange} required>
                    <option value="PETROL">Petrol</option>
                    <option value="DIESEL">Diesel</option>
                    <option value="LPG">LPG</option>
                    <option value="ELECTRIC">Electric</option>
                    <option value="HYBRID">Hybrid</option>
                </select>
            </label><br />

            <label>Transmission:
                <select name="transmission" value={form.transmission} onChange={handleChange} required>
                    <option value="MANUAL">Manual</option>
                    <option value="AUTOMATIC">Automatic</option>
                </select>
            </label><br />

            <label>Color: <input name="color" value={form.color} onChange={handleChange} required /></label><br />
            <label>Mileage: <input name="mileage" type="number" value={form.mileage} onChange={handleChange} /></label><br />
            <label>Power (HP): <input name="power" type="number" value={form.power} onChange={handleChange} /></label><br />
            <label>Seats: <input name="seats" type="number" min="1" max="8" value={form.seats} onChange={handleChange} /></label><br />
            <label>VIN: <input name="vin" value={form.vin} onChange={handleChange} required /></label><br />

            <label>Condition:
                <select name="condition" value={form.condition} onChange={handleChange} required>
                    <option value="NEW">New</option>
                    <option value="USED">Used</option>
                    <option value="DAMAGED">Damaged</option>
                </select>
            </label><br />

            <label>Warranty: <input name="hasWarranty" type="checkbox" checked={form.hasWarranty} onChange={handleChange} /></label><br />

            <label>Description:</label><br />
            <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                cols={50}
                maxLength={2000}
                placeholder="Vehicle description"
            /><br />

            <label>Advertisement ID: <input name="advertisementId" type="number" value={form.advertisementId} onChange={handleChange} required /></label><br />

            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Add Vehicle'}</button>
        </form>
    );
}

export default AdminVehicleCreateForm;
