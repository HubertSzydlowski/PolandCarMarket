import tokenManager from '../TokenManager';

const BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

export const brandModels = {
    TOYOTA: [
        "Corolla", "Camry", "Hilux", "Yaris", "Prius",
        "LandCruiser", "Avalon", "Highlander", "Sienna"
    ],
    VOLKSWAGEN: [
        "Golf", "Passat", "Tiguan", "Polo", "Jetta",
        "Arteon", "Touareg", "Up", "Scirocco", "Beetle"
    ],
    FORD: [
        "Focus", "Fiesta", "Mustang", "Mondeo", "Escape",
        "Explorer", "Ranger", "Edge", "EcoBoost", "Expedition"
    ],
    HONDA: [
        "Civic", "Accord", "CR_V", "HR_V", "Pilot",
        "Odyssey", "Fit", "Insight", "Ridgeline", "Element"
    ],
    CHEVROLET: [
        "Silverado", "Malibu", "Equinox", "Camaro", "Trax",
        "Colorado", "Suburban", "Tahoe", "Impala", "Corvette"
    ],
    BMW: [
        "Series_3", "Series_5", "X5", "X3", "Series_7",
        "X1", "M3", "M5", "Z4", "i3"
    ],
    MERCEDES: [
        "C_Class", "E_Class", "S_Class", "GLC", "GLE",
        "A_Class", "G_Class", "CLA", "GLS", "SL"
    ],
    NISSAN: [
        "Altima", "Rogue", "Sentra", "Versa", "Pathfinder",
        "Juke", "Titan", "Leaf", "Murano", "Maxima"
    ],
    HYUNDAI: [
        "Elantra", "Sonata", "Tucson", "Santa_Fe", "Accent",
        "Kona", "Venue", "Palisade", "Ioniq"
    ],
    KIA: [
        "Soul", "Sportage", "Optima", "Sorento", "Rio",
        "Forte", "Stinger", "Niro", "Cadenza", "Seltos"
    ],
    AUDI: [
        "A3", "A4", "A6", "Q5", "Q7",
        "A8", "Q3", "TT", "RS5", "R8"
    ],
    RENAULT: [
        "Clio", "Megane", "Captur", "Scenic", "Kadjar",
        "Talisman", "Zoe", "Koleos", "Espace", "Twingo"
    ],
    PEUGEOT: [
        "208", "308", "3008", "5008", "2008",
        "Partner", "Rifter", "Expert", "Boxer", "508"
    ],
    FIAT: [
        "Panda", "Tipo", "500", "Punto", "Doblo",
        "Qubo", "Scudo", "Bravo", "Stilo", "Fiorino"
    ],
    SEAT: [
        "Ibiza", "Leon", "Arona", "Ateca", "Toledo",
        "Alhambra", "Altea", "Exeo", "Mii", "Tarraco"
    ],
    SKODA: [
        "Octavia", "Superb", "Fabia", "Karoq", "Kodiaq",
        "Rapid", "Citigo", "Yeti", "Roomster", "Enyaq"
    ],
    MAZDA: [
        "CX_5", "CX_3", "CX_9", "Mazda3", "Mazda6",
        "MX_5", "BT_50", "RX_8", "CX_30", "MazdaSpeed3"
    ],
    SUBARU: [
        "Outback", "Forester", "Impreza", "XV", "Legacy",
        "BRZ", "WRX", "Ascent", "Crosstrek", "Trezia"
    ],
    VOLVO: [
        "XC90", "XC60", "XC40", "S60", "S90",
        "V60", "V90", "V40", "C40", "Polestar2"
    ],
    JEEP: [
        "Wrangler", "Cherokee", "GrandCherokee", "Compass", "Renegade",
        "Gladiator", "Patriot", "Commander", "Wagoneer", "Liberty"
    ]
};

function normalizeEnum(value) {
    return value ? value.trim().toUpperCase().replace(/\s+/g, '_') : null;
}

function authHeaders() {
    const token = tokenManager.getAccessToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
}

export async function getAllVehicles(page = 0, size = 50, params = {}) {
    const query = new URLSearchParams({
        page,
        size,
    });

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

    const res = await fetch(`${BASE}/user-page/vehicles?${query.toString()}`, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...authHeaders()
        }
    });

    if (!res.ok) throw new Error(`Failed to fetch vehicles: ${res.status}`);

    return res.json();
}

export async function getVehicleById(id) {
    const res = await fetch(`${BASE}/user-page/vehicles/${id}`, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...authHeaders()
        }
    });
    if (!res.ok) throw new Error(`Failed to fetch vehicle ${id}: ${res.status}`);
    return res.json();
}

export async function createVehicle(vehicleDto) {
    const dto = {
        ...vehicleDto,
        brand: normalizeEnum(vehicleDto.brand),
        model: normalizeEnum(vehicleDto.model),
    };

    const res = await fetch(`${BASE}/user-page/vehicles`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...authHeaders()
        },
        body: JSON.stringify(dto)
    });
    if (!res.ok) throw new Error(`Failed to create vehicle: ${res.status}`);
    return res.json();
}

export async function updateVehicle(id, vehicleDto) {
    const dto = {
        ...vehicleDto,
        brand: normalizeEnum(vehicleDto.brand),
        model: normalizeEnum(vehicleDto.model),
    };

    const res = await fetch(`${BASE}/user-page/vehicles/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...authHeaders()
        },
        body: JSON.stringify(dto)
    });
    if (!res.ok) throw new Error(`Failed to update vehicle ${id}: ${res.status}`);
    return res.json();
}

export async function deleteVehicle(id) {
    const res = await fetch(`${BASE}/user-page/vehicles/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            ...authHeaders()
        }
    });
    if (!res.ok) throw new Error(`Failed to delete vehicle ${id}: ${res.status}`);
}

const UserPageVehicleService = {
    getAllVehicles,
    getVehicleById,
    createVehicle,
    updateVehicle,
    deleteVehicle,
};

export default UserPageVehicleService;
