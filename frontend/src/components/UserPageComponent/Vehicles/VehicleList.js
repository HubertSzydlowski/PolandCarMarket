import React, { useEffect, useState } from 'react';
import UserPageVehicleService, { brandModels } from '../../../services/UserPageServices/UserPageVehicleService';

function UserVehicleList() {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [tempFilters, setTempFilters] = useState({
        brand: '',
        model: '',
        year: '',
        minPrice: '',
        maxPrice: '',
        minMileage: '',
        maxMileage: '',
        fuelType: '',
        transmission: '',
    });

    const [filters, setFilters] = useState({});
    const [sortBy, setSortBy] = useState('');
    const [order, setOrder] = useState('asc');

    useEffect(() => {
        const fetchVehicles = async () => {
            setLoading(true);
            setError(null);
            try {
                const params = {
                    ...filters,
                    sortBy: sortBy || null,
                    order: order || null,
                };

                const data = await UserPageVehicleService.getAllVehicles(0, 50, params);

                setVehicles(data);
            } catch {
                setError('Error loading vehicles');
            }
            setLoading(false);
        };

        fetchVehicles();
    }, [filters, sortBy, order]);

    const handleTempFilterChange = e => {
        const { name, value } = e.target;
        setTempFilters(prev => ({ ...prev, [name]: value }));
    };

    const applyFilters = () => {
        const cleaned = {};
        for (const key in tempFilters) {
            let val = tempFilters[key].toString().trim();
            if (val !== '') {
                if (["year", "minPrice", "maxPrice", "minMileage", "maxMileage"].includes(key)) {
                    const numVal = Number(val);
                    if (!isNaN(numVal)) {
                        cleaned[key] = numVal;
                    }
                } else {
                    cleaned[key] = val;
                }
            }
        }
        setFilters(cleaned);
    };

    const resetFilters = () => {
        setTempFilters({
            brand: '',
            model: '',
            year: '',
            minPrice: '',
            maxPrice: '',
            minMileage: '',
            maxMileage: '',
            fuelType: '',
            transmission: '',
        });
        setFilters({});
    };

    const handleSortChange = e => setSortBy(e.target.value);
    const handleOrderChange = e => setOrder(e.target.value);

    return (
        <div>
            <h2>Vehicle List (User)</h2>

            <fieldset style={{ marginBottom: 20 }}>
                <legend>Filters</legend>

                <label>
                    Brand:
                    <select name="brand" value={tempFilters.brand} onChange={e => {
                        handleTempFilterChange(e);
                        setTempFilters(prev => ({ ...prev, model: '' }));
                    }}>
                        <option value="">--</option>
                        {Object.keys(brandModels).map(brand => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>
                </label>{' '}

                <label>
                    Model:
                    <select name="model" value={tempFilters.model} onChange={handleTempFilterChange} disabled={!tempFilters.brand}>
                        <option value="">--</option>
                        {tempFilters.brand && brandModels[tempFilters.brand].map(model => (
                            <option key={model} value={model}>{model.replace(/_/g, ' ')}</option>
                        ))}
                    </select>
                </label>{' '}

                <label>
                    Year: <input name="year" type="number" value={tempFilters.year} onChange={handleTempFilterChange} />
                </label>{' '}
                <label>
                    Price from: <input name="minPrice" type="number" value={tempFilters.minPrice} onChange={handleTempFilterChange} />
                </label>{' '}
                <label>
                    Price to: <input name="maxPrice" type="number" value={tempFilters.maxPrice} onChange={handleTempFilterChange} />
                </label>{' '}
                <label>
                    Min. mileage: <input name="minMileage" type="number" value={tempFilters.minMileage} onChange={handleTempFilterChange} />
                </label>{' '}
                <label>
                    Max. mileage: <input name="maxMileage" type="number" value={tempFilters.maxMileage} onChange={handleTempFilterChange} />
                </label>{' '}
                <label>
                    Fuel type:
                    <select name="fuelType" value={tempFilters.fuelType} onChange={handleTempFilterChange}>
                        <option value="">--</option>
                        <option value="PETROL">Petrol</option>
                        <option value="DIESEL">Diesel</option>
                        <option value="ELECTRIC">Electric</option>
                        <option value="HYBRID">Hybrid</option>
                    </select>
                </label>{' '}
                <label>
                    Transmission:
                    <select name="transmission" value={tempFilters.transmission} onChange={handleTempFilterChange}>
                        <option value="">--</option>
                        <option value="MANUAL">Manual</option>
                        <option value="AUTOMATIC">Automatic</option>
                    </select>
                </label>
                <br /><br />
                <button onClick={applyFilters}>Apply Filters</button>{' '}
                <button onClick={resetFilters}>Reset</button>
            </fieldset>

            <fieldset style={{ marginBottom: 20 }}>
                <legend>Sorting</legend>
                <label>
                    Sort by:
                    <select value={sortBy} onChange={handleSortChange}>
                        <option value="">None</option>
                        <option value="price">Price</option>
                        <option value="mileage">Mileage</option>
                        <option value="year">Year</option>
                    </select>
                </label>{' '}
                <label>
                    Order:
                    <select value={order} onChange={handleOrderChange}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </label>
            </fieldset>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!loading && vehicles.length === 0 && <p>No vehicles found.</p>}

            <ul>
                {vehicles.map(vehicle => (
                    <li key={vehicle.id}>
                        {vehicle.brand} {vehicle.model} ({vehicle.year}) — {vehicle.price} PLN
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserVehicleList;
