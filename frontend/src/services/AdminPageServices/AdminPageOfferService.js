import advertisementService from '../AdvertisementServices/advertisementService';
import vehicleService from '../VehicleServices/vehicleService';
import vehiclePhotoService from '../VehiclePhotoServices/vehiclePhotoService';
import favoritesService from '../UserServices/favoritesService';
import tokenManager from '../TokenManager';

const BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

function authHeaders() {
    const token = tokenManager.getAccessToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
}

function ensureAdminAccess() {
    if (!tokenManager.canAccessAdminPage()) {
        throw new Error('Access denied: Admin role required');
    }
}

async function fetchVehiclesByAdvertisement(advertisementId) {
    ensureAdminAccess();
    if (advertisementId === undefined || advertisementId === null || advertisementId === '') {
        return [];
    }

    const safeId = encodeURIComponent(String(advertisementId));
    const primaryUrl = `${BASE}/vehicles/by-advertisement/${safeId}`;

    try {
        const res = await fetch(primaryUrl, {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', ...authHeaders() }
        });
        if (res.ok) {
            const json = await res.json();
            if (!json) return [];
            // If backend returns { content: [...] } handle it
            if (Array.isArray(json)) return json;
            if (json.content && Array.isArray(json.content)) return json.content;
            // single object -> wrap into array
            return [json];
        } else {
            console.warn(`[AdminPageOfferService] ${primaryUrl} returned ${res.status}, will try fallback`);
        }
    } catch (err) {
        console.warn('[AdminPageOfferService] fetchVehiclesByAdvertisement primary endpoint failed, falling back:', err);
    }

    try {
        const fallbackUrl = `${BASE}/vehicles?advertisementId=${safeId}`;
        const res2 = await fetch(fallbackUrl, {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', ...authHeaders() }
        });
        if (!res2.ok) throw new Error(`Failed fallback fetch vehicles: ${res2.status}`);
        const json2 = await res2.json();
        if (!json2) return [];
        if (Array.isArray(json2)) return json2;
        if (json2.content && Array.isArray(json2.content)) return json2.content;
        if (json2.items && Array.isArray(json2.items)) return json2.items;
        return [json2];
    } catch (err) {
        console.error('[AdminPageOfferService] fetchVehiclesByAdvertisement fallback failed', err);
        throw err;
    }
}

async function fetchPhotosByVehicle(vehicleId) {
    ensureAdminAccess();
    if (vehicleId === undefined || vehicleId === null || vehicleId === '') return [];

    const safeId = encodeURIComponent(String(vehicleId));
    const primaryUrl = `${BASE}/vehicle-photos/by-vehicle/${safeId}`;

    try {
        const res = await fetch(primaryUrl, {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', ...authHeaders() }
        });
        if (res.ok) {
            const photos = await res.json();
            if (!photos) return [];
            const arr = Array.isArray(photos) ? photos : (photos.content && Array.isArray(photos.content) ? photos.content : [photos]);
            return arr.map(photo => ({ ...photo, fullPhotoUrl: `${BASE}/photos/${photo.photoUrl}` }));
        } else {
            console.warn(`[AdminPageOfferService] ${primaryUrl} returned ${res.status}, will try fallback`);
        }
    } catch (err) {
        console.warn('[AdminPageOfferService] fetchPhotosByVehicle primary endpoint failed, falling back:', err);
    }

    // fallback
    try {
        const fallbackUrl = `${BASE}/vehicle-photos?vehicleId=${safeId}`;
        const res2 = await fetch(fallbackUrl, {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', ...authHeaders() }
        });
        if (!res2.ok) throw new Error(`Failed fallback fetch photos: ${res2.status}`);
        const photos2 = await res2.json();
        const arr2 = Array.isArray(photos2) ? photos2 : (photos2.content && Array.isArray(photos2.content) ? photos2.content : (photos2.items && Array.isArray(photos2.items) ? photos2.items : [photos2]));
        return arr2.map(photo => ({ ...photo, fullPhotoUrl: `${BASE}/photos/${photo.photoUrl}` }));
    } catch (err) {
        console.error('[AdminPageOfferService] fetchPhotosByVehicle fallback failed', err);
        throw err;
    }
}

function normalizeFileEntry(entry) {
    if (!entry) return null;
    if (entry.file) return { file: entry.file, isMain: !!entry.isMain, username: entry.username || null };
    if (typeof File !== 'undefined' && entry instanceof File) return { file: entry, isMain: false, username: null };
    return null;
}

function ensureUploader(uploaderName, context = 'photo upload') {
    if (!uploaderName) throw new Error(`Uploader (username) required for ${context}`);
}

export async function getAllOffers(page = 0, size = 50) {
    ensureAdminAccess();
    return advertisementService.getAllAdvertisements(page, size);
}

export async function getOfferById(advertisementId, options = {}) {
    ensureAdminAccess();
    if (!advertisementId) throw new Error('advertisementId is required');

    const advertisement = await advertisementService.getAdvertisementById(advertisementId);

    const vehicles = await fetchVehiclesByAdvertisement(advertisementId);
    const vehiclesWithPhotos = await Promise.all(vehicles.map(async v => {
        const photos = await fetchPhotosByVehicle(v.id);
        return { ...v, photos };
    }));

    let isFavorited = false;
    if (options.userId) {
        const favs = await favoritesService.getFavorites(options.userId);
        if (Array.isArray(favs)) {
            isFavorited = favs.some(f => {
                if (typeof f === 'object') return f.id === advertisementId || f.advertisementId === advertisementId;
                return String(f) === String(advertisementId);
            });
        }
    }

    return { advertisement, vehicles: vehiclesWithPhotos, isFavorited };
}

export async function createOffer({ advertisementDto, vehicle = null, vehicles = null, photos = [], photosByVehicle = [], uploader = null } = {}) {
    ensureAdminAccess();
    if (!advertisementDto) throw new Error('advertisementDto is required');

    const createdAd = await advertisementService.createAdvertisement(advertisementDto);
    const advertisementId = createdAd.id;

    let vehicleDto = vehicle || (Array.isArray(vehicles) && vehicles.length ? vehicles[0] : null);
    let createdVehicle = null;
    if (vehicleDto) {
        const dtoWithAd = { ...vehicleDto, advertisementId };
        createdVehicle = await vehicleService.createVehicle(dtoWithAd);
    }

    if (Array.isArray(photosByVehicle) && photosByVehicle.length) {
        for (const pbv of photosByVehicle) {
            const { vehicleIndex, vehicleId, files = [], username } = pbv;
            let targetVehicleId = vehicleId;
            if ((vehicleIndex === 0 || vehicleIndex === '0') && createdVehicle) targetVehicleId = createdVehicle.id;
            if (!targetVehicleId) continue;
            const uploaderName = username || uploader;
            ensureUploader(uploaderName, 'photosByVehicle');
            for (const f of files) {
                const nf = normalizeFileEntry(f);
                if (!nf || !nf.file) continue;
                await vehiclePhotoService.addPhotoToVehicle(targetVehicleId, !!nf.isMain, uploaderName, nf.file);
            }
        }
    } else if (Array.isArray(photos) && photos.length && createdVehicle) {
        for (const p of photos) {
            const nf = normalizeFileEntry(p);
            const uploaderName = nf?.username || uploader;
            ensureUploader(uploaderName, 'photos');
            await vehiclePhotoService.addPhotoToVehicle(createdVehicle.id, !!nf?.isMain, uploaderName, nf?.file || p);
        }
    }

    const vehiclesWithPhotos = createdVehicle ? [{ ...createdVehicle, photos: await fetchPhotosByVehicle(createdVehicle.id) }] : [];
    return { advertisement: createdAd, vehicles: vehiclesWithPhotos };
}

export async function updateOffer(advertisementId, { advertisementDto, vehicle = null, vehicles = null, vehiclesToDelete = [], photosToAdd = [], photosToDelete = [], uploader = null } = {}) {
    ensureAdminAccess();
    if (!advertisementId) throw new Error('advertisementId is required');

    let updatedAd = advertisementDto
        ? await advertisementService.updateAdvertisement(advertisementId, advertisementDto)
        : await advertisementService.getAdvertisementById(advertisementId);

    for (const photoId of photosToDelete || []) {
        if (!photoId) continue;
        try { await vehiclePhotoService.deletePhoto(photoId); } catch (err) { console.error('deletePhoto error', photoId, err); }
    }

    for (const vId of vehiclesToDelete || []) {
        if (!vId) continue;
        const photos = await fetchPhotosByVehicle(vId);
        for (const p of photos) { if (p?.id) { try { await vehiclePhotoService.deletePhoto(p.id); } catch (err) { console.error('deletePhoto error', p.id, err); } } }
        try { await vehicleService.deleteVehicle(vId); } catch (err) { console.error('deleteVehicle error', vId, err); }
    }

    let vehicleDto = vehicle || (Array.isArray(vehicles) && vehicles.length ? vehicles[0] : null);
    let resultVehicle = null;
    if (vehicleDto) {
        if (vehicleDto.id) resultVehicle = await vehicleService.updateVehicle(vehicleDto.id, vehicleDto);
        else resultVehicle = await vehicleService.createVehicle({ ...vehicleDto, advertisementId });
    }

    if (Array.isArray(photosToAdd) && photosToAdd.length) {
        const first = photosToAdd[0];
        const looksLikePerVehicle = first && (first.files || first.vehicleId !== undefined || first.vehicleIndex !== undefined);
        if (looksLikePerVehicle) {
            for (const pAdd of photosToAdd) {
                const { vehicleId, vehicleIndex, files = [], username } = pAdd;
                let targetVehicleId = vehicleId || (vehicleIndex === 0 && resultVehicle?.id);
                if (!targetVehicleId) continue;
                const uploaderName = username || uploader;
                ensureUploader(uploaderName, 'photosToAdd entry');
                for (const f of files) {
                    const nf = normalizeFileEntry(f);
                    if (!nf || !nf.file) continue;
                    await vehiclePhotoService.addPhotoToVehicle(targetVehicleId, !!nf.isMain, uploaderName, nf.file);
                }
            }
        } else {
            if (!resultVehicle) throw new Error('No target vehicle to add photos to (primary vehicle missing).');
            for (const f of photosToAdd) {
                const nf = normalizeFileEntry(f);
                const uploaderName = nf?.username || uploader;
                ensureUploader(uploaderName, 'photosToAdd (flat)');
                await vehiclePhotoService.addPhotoToVehicle(resultVehicle.id, !!nf?.isMain, uploaderName, nf?.file || f);
            }
        }
    }

    const allVehicles = await fetchVehiclesByAdvertisement(advertisementId);
    const vehiclesWithPhotos = await Promise.all(allVehicles.map(async v => {
        const photos = await fetchPhotosByVehicle(v.id);
        return { ...v, photos };
    }));

    return { advertisement: updatedAd, vehicles: vehiclesWithPhotos };
}

export async function deleteOffer(advertisementId) {
    ensureAdminAccess();
    if (advertisementId === undefined || advertisementId === null || advertisementId === '') {
        throw new Error('advertisementId is required');
    }

    console.info('[AdminPageOfferService] deleteOffer start:', advertisementId);

    const vehicles = await fetchVehiclesByAdvertisement(advertisementId);
    if (!Array.isArray(vehicles)) {
        console.warn('[AdminPageOfferService] fetchVehiclesByAdvertisement did not return array, aborting to avoid mass delete:', vehicles);
        throw new Error('Unexpected vehicles response shape; aborting delete');
    }

    console.info('[AdminPageOfferService] vehicles to delete count:', vehicles.length);

    for (const v of vehicles) {
        const vId = v?.id;
        // Walidacja powiązania vehicle -> advertisement
        const advertIdOnVehicle = v?.advertisementId ?? v?.advertisement?.id ?? null;
        if (String(advertIdOnVehicle) !== String(advertisementId)) {
            console.warn(`[AdminPageOfferService] Skipping vehicle ${vId} because its advertisementId (${advertIdOnVehicle}) !== ${advertisementId}`);
            continue;
        }

        if (vId === undefined || vId === null || vId === '') {
            console.warn('Skipping vehicle delete because id is missing for entry:', v);
            continue;
        }

        console.info('Processing vehicle id=', vId);
        const photos = await fetchPhotosByVehicle(vId);
        if (!Array.isArray(photos)) {
            console.warn('fetchPhotosByVehicle returned non-array for vehicle', vId, photos);
        }

        for (const p of (photos || [])) {
            const pId = p?.id;
            const photoVehicleId = p?.vehicleId ?? p?.vehicle?.id ?? null;
            if (String(photoVehicleId) !== String(vId)) {
                console.warn(`Skipping photo ${pId} because its vehicleId (${photoVehicleId}) !== ${vId}`);
                continue;
            }
            if (pId === undefined || pId === null || pId === '') {
                console.warn('Skipping photo delete because id missing:', p);
                continue;
            }
            try {
                console.info('Deleting photo', pId, 'for vehicle', vId);
                await vehiclePhotoService.deletePhoto(pId);
            } catch (err) {
                console.error('Error deleting photo', pId, err);
            }
        }

        try {
            console.info('Deleting vehicle', vId, 'for advertisement', advertisementId);
            await vehicleService.deleteVehicle(vId);
        } catch (err) {
            console.error('Error deleting vehicle', vId, err);
        }
    }

    try {
        console.info('Deleting advertisement', advertisementId);
        await advertisementService.deleteAdvertisement(advertisementId);
        console.info('Deleted advertisement', advertisementId);
    } catch (err) {
        console.error('Failed to delete advertisement', advertisementId, err);
        throw err;
    }
}

export async function addToFavorites(userId, advertisementId) {
    ensureAdminAccess();
    if (!userId) throw new Error('userId is required to add to favorites');
    return favoritesService.addToFavorites(userId, advertisementId);
}

export async function removeFromFavorites(userId, advertisementId) {
    ensureAdminAccess();
    if (!userId) throw new Error('userId is required to remove from favorites');
    return favoritesService.removeFromFavorites(userId, advertisementId);
}

const AdminPageOfferService = {
    getAllOffers,
    getOfferById,
    createOffer,
    updateOffer,
    deleteOffer,
    addToFavorites,
    removeFromFavorites
};

export default AdminPageOfferService;