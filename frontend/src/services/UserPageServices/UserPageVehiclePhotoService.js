import tokenManager from '../TokenManager';

const BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

function authHeaders() {
    const token = typeof tokenManager.getAccessToken === 'function' ? tokenManager.getAccessToken() : null;
    return token ? { 'Authorization': `Bearer ${token}` } : {};
}

async function getAllPhotos(vehicleId) {
    if (!vehicleId && vehicleId !== 0) throw new Error('getAllPhotos: vehicleId is required');

    const res = await fetch(`${BASE}/user-page/vehicles/${encodeURIComponent(vehicleId)}/photos`, {
        headers: { ...authHeaders() },
        credentials: 'include'
    });

    if (!res.ok) throw new Error(`Failed to fetch photos for vehicle ${vehicleId}`);

    const photos = await res.json();
    return (Array.isArray(photos) ? photos : (photos.content || photos.items || [photos])).map(photo => ({
        ...photo,
        fullPhotoUrl: photo.fullPhotoUrl || (photo.photoUrl ? `${BASE}/photos/${photo.photoUrl}` : null)
    }));
}

async function getPhotoById(id) {
    if (!id) throw new Error('getPhotoById: id is required');

    const res = await fetch(`${BASE}/user-page/photos/${encodeURIComponent(id)}`, {
        headers: { ...authHeaders() },
        credentials: 'include'
    });

    if (!res.ok) throw new Error(`Failed to fetch photo with ID ${id}`);

    const photo = await res.json();
    return { ...photo, fullPhotoUrl: photo.fullPhotoUrl || (photo.photoUrl ? `${BASE}/photos/${photo.photoUrl}` : null) };
}

export async function addPhotoToVehicle(vehicleId, arg2, arg3 = 0, arg4 = false) {
    if (!vehicleId && vehicleId !== 0) throw new Error('addPhotoToVehicle: vehicleId is required');

    let photoFiles = [];
    let mainIndex = -1;
    let isEdit = false;
    let singleMode = false;
    let singleIsMain = false;

    if (Array.isArray(arg2)) {
        photoFiles = arg2;
        mainIndex = typeof arg3 === 'number' ? arg3 : -1;
        isEdit = !!arg4;
    } else {
        singleMode = true;
        singleIsMain = !!arg2;
        const singleFile = arg3;
        if (!singleFile) return [];
        photoFiles = [singleFile];
        isEdit = !!arg4;
    }

    if (!photoFiles || photoFiles.length === 0) return [];

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
    for (let i = 0; i < photoFiles.length; i++) {
        const file = photoFiles[i];

        const isMain = singleMode ? !!singleIsMain : (i === mainIndex);

        const formData = new FormData();
        formData.append('photo', file);
        formData.append('isMain', isMain ? 'true' : 'false');

        const res = await fetch(`${BASE}/user-page/vehicles/${encodeURIComponent(vehicleId)}/photos`, {
            method: 'POST',
            headers: { ...authHeaders() },
            credentials: 'include',
            body: formData
        });

        if (!res.ok) {
            const errorText = await res.text().catch(() => '');
            throw new Error(`Upload failed for ${file?.name || '<file>'}: ${res.status} - ${errorText}`);
        }

        const uploaded = await res.json().catch(() => null);
        results.push(uploaded);
    }

    return results;
}

export async function deletePhoto(photoId) {
    if (!photoId) throw new Error('deletePhoto: photoId is required');

    const res = await fetch(`${BASE}/user-page/photos/${encodeURIComponent(photoId)}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            ...authHeaders()
        },
        credentials: 'include'
    });

    if (!res.ok) {
        const txt = await res.text().catch(() => '');
        console.error(`[UserPhotoService] deletePhoto failed for id=${photoId}`, res.status, txt);
        throw new Error(`Failed to delete photo ${photoId}: ${res.status}`);
    }

    return;
}

const UserPageVehiclePhotoService = {
    getAllPhotos,
    getPhotoById,
    addPhotoToVehicle,
    deletePhoto
};

export default UserPageVehiclePhotoService;
