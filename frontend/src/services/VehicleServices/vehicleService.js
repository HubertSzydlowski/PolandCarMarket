import VehicleControllerApi from '../../api/src/api/VehicleControllerApi';
import apiClient from '../apiClientInstance';
import tokenManager from '../TokenManager';

const vehicleApi = new VehicleControllerApi(apiClient);

const BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

export const brandModels = {
    Toyota: ["Corolla", "Camry", "RAV4", "Hilux", "Yaris", "Prius", "Land_Cruiser", "Avalon", "Highlander", "Sienna"],
    Volkswagen: ["Golf", "Passat", "Tiguan", "Polo", "Jetta", "Arteon", "Touareg", "Up", "Scirocco", "Beetle"],
    Ford: ["Focus", "Fiesta", "Mustang", "Mondeo", "Escape", "Explorer", "Ranger", "Edge", "EcoBoost", "Expedition"],
    Honda: ["Civic", "Accord", "CR_V", "HR_V", "Pilot", "Odyssey", "Fit", "Insight", "Ridgeline", "Element"],
    Chevrolet: ["Silverado", "Malibu", "Equinox", "Camaro", "Trax", "Colorado", "Suburban", "Tahoe", "Impala", "Corvette"],
    BMW: ["Series_3", "Series_5", "X5", "X3", "Series_7", "X1", "M3", "M5", "Z4", "i3"],
    Mercedes: ["C_Class", "E_Class", "S_Class", "GLC", "GLE", "A_Class", "G_Class", "CLA", "GLS", "SL"],
    Nissan: ["Altima", "Rogue", "Sentra", "Versa", "Pathfinder", "Juke", "Titan", "Leaf", "Murano", "Maxima"],
    Hyundai: ["Elantra", "Sonata", "Tucson", "Santa_Fe", "Accent", "Kona", "Venue", "Palisade", "Ioniq", "SantaFe"],
    KIA: ["Soul", "Sportage", "Optima", "Sorento", "Rio", "Forte", "Stinger", "Niro", "Cadenza", "Seltos"],
    Audi: ["A3", "A4", "A6", "Q5", "Q7", "A8", "Q3", "TT", "RS5", "R8"],
    Renault: ["Clio", "Megane", "Captur", "Scenic", "Kadjar", "Talisman", "Zoe", "Koleos", "Espace", "Twingo"],
    Peugeot: ["208", "308", "3008", "5008", "2008", "Partner", "Rifter", "Expert", "Boxer", "508"],
    Fiat: ["Panda", "Tipo", "500", "Punto", "Doblo", "Qubo", "Scudo", "Bravo", "Stilo", "Fiorino"],
    Seat: ["Ibiza", "Leon", "Arona", "Ateca", "Toledo", "Alhambra", "Altea", "Exeo", "Mii", "Tarraco"],
    Skoda: ["Octavia", "Superb", "Fabia", "Karoq", "Kodiaq", "Rapid", "Citigo", "Yeti", "Roomster", "Enyaq"],
    Mazda: ["CX_5", "CX_3", "CX_9", "Mazda_3", "Mazda_6", "MX_5", "BT_50", "RX_8", "CX_30", "Mazdaspeed_3"],
    Subaru: ["Outback", "Forester", "Impreza", "XV", "Legacy", "BRZ", "WRX", "Ascent", "Crosstrek", "Trezia"],
    Volvo: ["XC90", "XC60", "XC40", "S60", "S90", "V60", "V90", "V40", "C40", "Polestar_2"],
    Jeep: ["Wrangler", "Cherokee", "Grand_Cherokee", "Compass", "Renegade", "Gladiator", "Patriot", "Commander", "Wagoneer", "Liberty"]
};

function normalizeEnum(value) {
    return value ? value.trim().toUpperCase().replace(/\s+/g, '_') : null;
}

function authHeaders() {
    const token = tokenManager.getAccessToken();
    return token
        ? { 'Authorization': `Bearer ${token}` }
        : {};
}

export const getVehicleById = async (vehicleId) => {
    return await new Promise((resolve, reject) => {
        vehicleApi.getVehicleById(vehicleId, (error, data) => {
            if (error) return reject(error);
            resolve(data);
        });
    });
};

export const createVehicle = async (vehicleDto) => {
    const dto = {
        ...vehicleDto,
        brand: normalizeEnum(vehicleDto.brand),
        model: normalizeEnum(vehicleDto.model),
    };

    return await new Promise((resolve, reject) => {
        vehicleApi.createVehicle(dto, (error, data) => {
            if (error) return reject(error);
            resolve(data);
        });
    });
};

export const updateVehicle = async (vehicleId, vehicleDto) => {
    const dto = {
        ...vehicleDto,
        brand: normalizeEnum(vehicleDto.brand),
        model: normalizeEnum(vehicleDto.model),
    };

    return await new Promise((resolve, reject) => {
        vehicleApi.updateVehicle(vehicleId, dto, (error, data) => {
            if (error) return reject(error);
            resolve(data);
        });
    });
};

export const deleteVehicle = async (vehicleId) => {
    if (vehicleId === undefined || vehicleId === null || vehicleId === '') {
        throw new Error('deleteVehicle: vehicleId is required and must be a valid id');
    }

    const idStr = String(vehicleId);
    const res = await fetch(`${BASE}/vehicles/${encodeURIComponent(idStr)}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...authHeaders(),
        },
    });

    if (!res.ok) {
        const txt = await res.text().catch(() => '');
        console.error(`[vehicleService] deleteVehicle failed for id=${idStr}`, res.status, txt);
        throw new Error(`Failed to delete vehicle ${idStr}: ${res.status}`);
    }

    console.info(`[vehicleService] deleteVehicle succeeded for id=${idStr}`);
    return;
};


export async function getVehicles(params = {}) {
    const query = new URLSearchParams();

    if (params.brand) query.append('brand', normalizeEnum(params.brand));
    if (params.model) query.append('model', normalizeEnum(params.model));
    if (params.year !== undefined && params.year !== null) query.append('year', params.year);
    if (params.minPrice !== undefined && params.minPrice !== null) query.append('minPrice', params.minPrice);
    if (params.maxPrice !== undefined && params.maxPrice !== null) query.append('maxPrice', params.maxPrice);
    if (params.minMileage !== undefined && params.minMileage !== null) query.append('minMileage', params.minMileage);
    if (params.maxMileage !== undefined && params.maxMileage !== null) query.append('maxMileage', params.maxMileage);
    if (params.fuelType) query.append('fuelType', params.fuelType);
    if (params.transmission) query.append('transmission', params.transmission);
    if (params.sortBy) query.append('sortBy', params.sortBy);
    if (params.order) query.append('order', params.order);

    const res = await fetch(
        `${BASE}/vehicles?${query.toString()}`,
        {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...authHeaders(),
            },
        }
    );

    if (!res.ok) {
        throw new Error(`Failed to fetch vehicles: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

const vehicleService = {
    getVehicles,
    getVehicleById,
    createVehicle,
    updateVehicle,
    deleteVehicle,
};

export default vehicleService;
