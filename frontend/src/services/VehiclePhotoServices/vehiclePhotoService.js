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
    return photos.map(photo => ({ ...photo, fullPhotoUrl: `${BASE}/photos/${photo.photoUrl}` }));
}

export async function getPhotoById(id) {
    if (!id) throw new Error('getPhotoById: id is required');
    const res = await fetch(`${BASE}/vehicle-photos/${id}`, {
        headers: { ...authHeaders() },
        credentials: 'include'
    });
    if (!res.ok) throw new Error(`Failed to fetch photo with ID ${id}`);
    const photo = await res.json();
    return { ...photo, fullPhotoUrl: `${BASE}/photos/${photo.photoUrl}` };
}

export const addPhotoToVehicle = async (vehicleId, file, username, isMain = false) => {
    if (!file) throw new Error("No file provided");
    if (!vehicleId) throw new Error("No vehicleId provided");
    if (!username) throw new Error("No username provided");

    const formData = new FormData();
    formData.append("photo", file);
    formData.append("vehicleId", String(vehicleId));
    formData.append("isMain", isMain ? "true" : "false");
    formData.append("username", username);

    const res = await fetch(`${BASE}/vehicle-photos`, {
        method: "POST",
        body: formData,
        credentials: "include",
        headers: {
            ...authHeaders()
        },
    });

    if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(`Upload failed: ${res.status} - ${txt || res.statusText}`);
    }

    return res.json();
};

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
        throw new Error(`Failed to delete photo ${photoId}: ${res.status} ${txt}`);
    }
    return;
};

export const updatePhoto = async (photoId, patch = {}) => {
    if (!photoId) throw new Error('updatePhoto: photoId is required');
    const res = await fetch(`${BASE}/vehicle-photos/${encodeURIComponent(photoId)}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...authHeaders(),
        },
        body: JSON.stringify(patch),
    });
    if (!res.ok) {
        const txt = await res.text().catch(() => '');
        throw new Error(`Failed to update photo ${photoId}: ${res.status} ${txt}`);
    }
    return res.json();
};

export async function addPhotosToVehicle(vehicleId, filesArray = [], mainIndex = 0, username, isEdit = false) {
    if (!vehicleId && vehicleId !== 0) throw new Error('addPhotosToVehicle: vehicleId is required');
    const shouldUpload = Array.isArray(filesArray) && filesArray.length > 0;
    if (!shouldUpload && !isEdit) return [];

    if (isEdit) {
        try {
            const existing = await getAllPhotos(vehicleId);
            for (const p of existing) {
                try { await deletePhoto(p.id); } catch (err) { console.warn('deletePhoto failed during edit cleanup', err); }
            }
        } catch (err) {
            console.warn('Could not fetch existing photos for edit cleanup', err);
        }
    }

    if (shouldUpload && !username) throw new Error('addPhotosToVehicle: username is required for admin upload');

    if (isEdit) {
        try {
            const existing = await getAllPhotos(vehicleId);
            for (const p of existing) {
                try { await deletePhoto(p.id); } catch (err) { console.warn('deletePhoto failed during edit cleanup', err); }
            }
        } catch (err) {
            console.warn('Could not fetch existing photos for edit cleanup', err);
        }
    }

    const results = [];
    for (let i = 0; i < filesArray.length; i++) {
        const file = filesArray[i];
        const isMain = (i === mainIndex);

        const formData = new FormData();
        formData.append('photo', file);
        formData.append('vehicleId', String(vehicleId));
        formData.append('isMain', isMain ? 'true' : 'false');
        formData.append('username', username);

        const res = await fetch(`${BASE}/vehicle-photos`, {
            method: 'POST',
            body: formData,
            credentials: 'include',
            headers: {
                ...authHeaders()
            }
        });

        if (!res.ok) {
            const txt = await res.text().catch(() => '');
            throw new Error(`Upload failed: ${res.status} - ${txt || res.statusText}`);
        }

        const uploaded = await res.json().catch(() => null);
        results.push(uploaded);
    }

    return results;
}

const vehiclePhotoService = {
    getAllPhotos,
    getPhotoById,
    addPhotoToVehicle,
    addPhotosToVehicle,
    deletePhoto,
    updatePhoto
};

export default vehiclePhotoService;