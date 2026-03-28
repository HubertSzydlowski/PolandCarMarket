import tokenManager from '../TokenManager';

const BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

function authHeaders() {
    const token = tokenManager.getAccessToken();
    return token
        ? { 'Authorization': `Bearer ${token}` }
        : {};
}

export async function getAllAdvertisements(page = 0, size = 50) {
    const res = await fetch(`${BASE}/advertisements?page=${page}&size=${size}`, {
        credentials: 'include',
        headers: {
            ...authHeaders()
        }
    });
    if (!res.ok) throw new Error(`Failed to fetch advertisements: ${res.status}`);
    return res.json();
}

export async function getAdvertisementById(id) {
    const res = await fetch(`${BASE}/advertisements/${id}`, {
        credentials: 'include',
        headers: {
            ...authHeaders()
        }
    });
    if (!res.ok) throw new Error(`Failed to fetch advertisement ${id}: ${res.status}`);
    return res.json();
}

export async function createAdvertisement({ title, userId, phoneNumber, googlePlaceId }) {
    const res = await fetch(`${BASE}/advertisements`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...authHeaders()
        },
        body: JSON.stringify({ title, userId, phoneNumber, googlePlaceId })
    });
    if (!res.ok) throw new Error(`Failed to create advertisement: ${res.status}`);
    return res.json();
}

export async function updateAdvertisement(id, { title, userId, phoneNumber, googlePlaceId }) {
    const res = await fetch(`${BASE}/advertisements/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...authHeaders()
        },
        body: JSON.stringify({ title, userId, phoneNumber, googlePlaceId })
    });
    if (!res.ok) throw new Error(`Failed to update advertisement ${id}: ${res.status}`);
    return res.json();
}

export async function deleteAdvertisement(id) {
    const res = await fetch(`${BASE}/advertisements/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            ...authHeaders()
        }
    });
    if (!res.ok) throw new Error(`Failed to delete advertisement ${id}: ${res.status}`);
}

const AdminPageAdvertisementsService = {
    getAllAdvertisements,
    getAdvertisementById,
    createAdvertisement,
    updateAdvertisement,
    deleteAdvertisement,
};

export default AdminPageAdvertisementsService;
