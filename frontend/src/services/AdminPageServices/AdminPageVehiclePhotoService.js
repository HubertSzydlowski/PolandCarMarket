import tokenManager from '../TokenManager';

const BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

function authHeaders() {
    const token = tokenManager.getAccessToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
}

export async function getAllPhotos(vehicleId) {
    if (!vehicleId) throw new Error('getAllPhotos: vehicleId is required');

    const res = await fetch(`${BASE}/vehicle-photos/by-vehicle/${vehicleId}`, {
        headers: { ...authHeaders() },
        credentials: 'include'
    });

    if (!res.ok) throw new Error(`Failed to fetch photos for vehicle ${vehicleId}`);

    const photos = await res.json();

    return photos.map(photo => ({
        ...photo,
        fullPhotoUrl: `${BASE}/photos/${photo.photoUrl}`
    }));
}

export async function getPhotoById(id) {
    if (!id) throw new Error('getPhotoById: id is required');

    const res = await fetch(`${BASE}/vehicle-photos/${id}`, {
        headers: { ...authHeaders() },
        credentials: 'include'
    });

    if (!res.ok) throw new Error(`Failed to fetch photo with ID ${id}`);

    const photo = await res.json();

    return {
        ...photo,
        fullPhotoUrl: `${BASE}/photos/${photo.photoUrl}`
    };
}

export async function addPhotoToVehicle(vehicleId, username, photoFiles, mainIndex = 0, isEdit = false) {
    if (!vehicleId) throw new Error('addPhotoToVehicle: vehicleId is required');
    if (!photoFiles || photoFiles.length === 0) return [];

    if (isEdit) {
        const existing = await getAllPhotos(vehicleId);
        for (const photo of existing) {
            await deletePhoto(photo.id);
        }
    }

    const results = [];
    for (let i = 0; i < photoFiles.length; i++) {
        const isMain = photoFiles.length === 1 ? true : (i === mainIndex);

        const formData = new FormData();
        formData.append('vehicleId', vehicleId);
        formData.append('photo', photoFiles[i]);
        formData.append('isMain', isMain);
        formData.append('username', username);

        const res = await fetch(`${BASE}/vehicle-photos`, {
            method: 'POST',
            headers: { ...authHeaders() },
            body: formData
        });

        if (!res.ok) {
            const errorText = await res.text().catch(() => '');
            throw new Error(`Upload failed for ${photoFiles[i].name}: ${res.status} - ${errorText}`);
        }

        const uploaded = await res.json();
        results.push(uploaded);
    }

    return results;
}

export const deletePhoto = async (photoId) => {
    if (!photoId) throw new Error('deletePhoto: photoId is required');

    const res = await fetch(`${BASE}/vehicle-photos/${encodeURIComponent(photoId)}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...authHeaders(),
        },
    });

    if (!res.ok) {
        const txt = await res.text().catch(() => '');
        console.error(`[AdminPhotoService] deletePhoto failed for id=${photoId}`, res.status, txt);
        throw new Error(`Failed to delete photo ${photoId}: ${res.status}`);
    }

    console.info(`[AdminPhotoService] deletePhoto succeeded for id=${photoId}`);
    return;
};

const AdminPageVehiclePhotoService = {
    getAllPhotos,
    getPhotoById,
    addPhotoToVehicle,
    deletePhoto
};

export default AdminPageVehiclePhotoService;