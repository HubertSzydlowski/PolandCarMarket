import UserPageAdvertisementsService from './UserPageAdvertisementsService';
import UserPageVehicleService from './UserPageVehicleService';
import UserPageVehiclePhotoService from './UserPageVehiclePhotoService';
import favoritesService from '../UserServices/favoritesService';
import tokenManager from '../TokenManager';

const BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

function authHeaders() {
    const token = tokenManager.getAccessToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
}

function ensureUserAccess() {
    if (!tokenManager.getUsername()) throw new Error('Access denied: User not logged in');
}

function normalizeFileEntry(entry) {
    if (!entry) return null;
    if (entry.file) return { file: entry.file, isMain: !!entry.isMain };
    if (typeof File !== 'undefined' && entry instanceof File) return { file: entry, isMain: false };
    return null;
}

async function fetchVehiclesByAdvertisement(advertisementId) {
    ensureUserAccess();
    if (!advertisementId && advertisementId !== 0) return [];
    const safeId = encodeURIComponent(String(advertisementId));
    const urls = [
        `${BASE}/vehicles/by-advertisement/${safeId}`,
        `${BASE}/vehicles?advertisementId=${safeId}`
    ];

    for (const url of urls) {
        try {
            const res = await fetch(url, { credentials: "include", headers: { "Content-Type": "application/json", ...authHeaders() } });
            if (!res.ok) continue;
            const json = await res.json();
            if (!json) continue;
            if (Array.isArray(json)) return json;
            if (json.content && Array.isArray(json.content)) return json.content;
            if (json.items && Array.isArray(json.items)) return json.items;
            return [json];
        } catch (err) {
            console.warn('[UserPageOfferService] fetchVehiclesByAdvertisement failed', url, err);
        }
    }
    return [];
}

async function fetchPhotosByVehicle(vehicleId) {
    ensureUserAccess();
    if (!vehicleId && vehicleId !== 0) return [];
    const safeId = encodeURIComponent(String(vehicleId));
    const urls = [
        `${BASE}/vehicle-photos/by-vehicle/${safeId}`,
        `${BASE}/vehicle-photos?vehicleId=${safeId}`
    ];

    for (const url of urls) {
        try {
            const res = await fetch(url, { credentials: "include", headers: { "Content-Type": "application/json", ...authHeaders() } });
            if (!res.ok) continue;
            const json = await res.json();
            const arr = Array.isArray(json) ? json : (json.content && Array.isArray(json.content) ? json.content : (json.items && Array.isArray(json.items) ? json.items : [json]));
            return arr.map(p => ({ ...p, fullPhotoUrl: p.fullPhotoUrl || (p.photoUrl ? `${BASE}/photos/${p.photoUrl}` : null) }));
        } catch (err) {
            console.warn('[UserPageOfferService] fetchPhotosByVehicle failed', url, err);
        }
    }
    return [];
}

export async function getAllOffers(page = 0, size = 50) {
    ensureUserAccess();
    return UserPageAdvertisementsService.getAllAdvertisements(page, size);
}

export async function getOfferById(advertisementId) {
    ensureUserAccess();
    if (!advertisementId) throw new Error('advertisementId is required');

    const advertisement = await UserPageAdvertisementsService.getAdvertisementById(advertisementId);
    const vehicles = await fetchVehiclesByAdvertisement(advertisementId);
    const vehiclesWithPhotos = await Promise.all(vehicles.map(async v => ({ ...v, photos: await fetchPhotosByVehicle(v.id) })));

    return { advertisement, vehicles: vehiclesWithPhotos };
}

export async function createOffer({ advertisementDto, vehicle = null, vehicles = null, photos = [], photosByVehicle = [] } = {}) {
    ensureUserAccess();
    if (!advertisementDto) throw new Error('advertisementDto is required');

    const createdAd = await UserPageAdvertisementsService.createAdvertisement(advertisementDto);
    const adId = createdAd?.id;
    if (!adId) throw new Error('Failed to create advertisement (missing id)');

    const createdVehicles = [];

    async function createVehicle(vDto) {
        if (!vDto) return null;
        const created = await UserPageVehicleService.createVehicle({ ...vDto, advertisementId: adId });
        if (created?.id) createdVehicles.push(created);
        return created;
    }

    if (Array.isArray(vehicles) && vehicles.length) {
        for (const v of vehicles) await createVehicle(v);
    } else if (vehicle) {
        await createVehicle(vehicle);
    }

    if (Array.isArray(photosByVehicle) && photosByVehicle.length) {
        for (const pbv of photosByVehicle) {
            const { vehicleIndex, vehicleId, files = [] } = pbv || {};
            let targetVehicleId = vehicleId ?? (vehicleIndex !== undefined ? createdVehicles[vehicleIndex]?.id : null);
            if (!targetVehicleId) continue;

            const fileEntries = files
                .map(normalizeFileEntry)
                .filter(nf => nf?.file);

            if (!fileEntries.length) continue;

            const mainIndex = files.findIndex(f => normalizeFileEntry(f)?.isMain) >= 0
                ? files.findIndex(f => normalizeFileEntry(f)?.isMain)
                : 0;

            await UserPageVehiclePhotoService.addPhotoToVehicle(targetVehicleId, fileEntries.map(f => f.file), mainIndex, true);
        }
    } else if (photos.length && createdVehicles.length) {
        const firstVehicle = createdVehicles[0];
        const fileEntries = photos
            .map(normalizeFileEntry)
            .filter(nf => nf?.file);

        if (fileEntries.length) {
            const mainIndex = photos.findIndex(f => normalizeFileEntry(f)?.isMain) >= 0
                ? photos.findIndex(f => normalizeFileEntry(f)?.isMain)
                : 0;

            await UserPageVehiclePhotoService.addPhotoToVehicle(firstVehicle.id, fileEntries.map(f => f.file), mainIndex);
        }
    }

    const vehiclesList = await fetchVehiclesByAdvertisement(adId);
    const vehiclesWithPhotos = await Promise.all(vehiclesList.map(async v => ({ ...v, photos: await fetchPhotosByVehicle(v.id) })));

    return { advertisement: createdAd, vehicles: vehiclesWithPhotos };
}

export async function updateOffer(adId, { advertisementDto, vehicle = null, vehiclesToDelete = [], photosToAdd = [], photosToDelete = [] } = {}) {
    ensureUserAccess();
    if (!adId) throw new Error('advertisementId is required');

    const updatedAd = advertisementDto
        ? await UserPageAdvertisementsService.updateAdvertisement(adId, advertisementDto)
        : await UserPageAdvertisementsService.getAdvertisementById(adId);

    for (const photoId of photosToDelete || []) {
        if (!photoId) continue;
        try { await UserPageVehiclePhotoService.deletePhoto(photoId); } catch (err) { console.warn(err); }
    }

    for (const vId of vehiclesToDelete || []) {
        if (!vId) continue;
        const photos = await fetchPhotosByVehicle(vId);
        for (const p of photos) { try { await UserPageVehiclePhotoService.deletePhoto(p.id); } catch {} }
        try { await UserPageVehicleService.deleteVehicle(vId); } catch {}
    }

    let currentVehicle = vehicle;
    if (vehicle) {
        if (vehicle.id) currentVehicle = await UserPageVehicleService.updateVehicle(vehicle.id, vehicle);
        else currentVehicle = await UserPageVehicleService.createVehicle({ ...vehicle, advertisementId: adId });
    }

    if (Array.isArray(photosToAdd) && photosToAdd.length) {
        const first = photosToAdd[0];
        const looksLikePerVehicle = first && (first.files || first.vehicleId !== undefined || first.vehicleIndex !== undefined);

        if (looksLikePerVehicle) {
            for (const pAdd of photosToAdd) {
                const { vehicleId, vehicleIndex, files = [] } = pAdd || {};
                let targetVehicleId = vehicleId ?? (vehicleIndex === 0 && currentVehicle?.id);
                if (!targetVehicleId) continue;

                const fileEntries = files
                    .map(normalizeFileEntry)
                    .filter(nf => nf?.file);

                if (!fileEntries.length) continue;

                const mainIndex = files.findIndex(f => normalizeFileEntry(f)?.isMain) >= 0
                    ? files.findIndex(f => normalizeFileEntry(f)?.isMain)
                    : 0;

                await UserPageVehiclePhotoService.addPhotoToVehicle(targetVehicleId, fileEntries.map(f => f.file), mainIndex);
            }
        } else {
            if (!currentVehicle) throw new Error('No target vehicle to add photos to (primary vehicle missing).');
            const fileEntries = photosToAdd
                .map(normalizeFileEntry)
                .filter(nf => nf?.file);

            if (fileEntries.length) {
                const mainIndex = photosToAdd.findIndex(f => normalizeFileEntry(f)?.isMain) >= 0
                    ? photosToAdd.findIndex(f => normalizeFileEntry(f)?.isMain)
                    : 0;

                await UserPageVehiclePhotoService.addPhotoToVehicle(currentVehicle.id, fileEntries.map(f => f.file), mainIndex, true);
            }
        }
    }

    const vehiclesList = await fetchVehiclesByAdvertisement(adId);
    const vehiclesWithPhotos = await Promise.all(vehiclesList.map(async v => ({ ...v, photos: await fetchPhotosByVehicle(v.id) })));

    return { advertisement: updatedAd, vehicles: vehiclesWithPhotos };
}

export async function deleteOffer(adId) {
    ensureUserAccess();
    if (!adId) throw new Error('advertisementId is required');

    const vehicles = await fetchVehiclesByAdvertisement(adId);
    for (const v of vehicles) {
        const vId = v?.id;
        const advertIdOnVehicle = v?.advertisementId ?? v?.advertisement?.id ?? null;
        if (String(advertIdOnVehicle) !== String(adId)) continue;

        const photos = await fetchPhotosByVehicle(vId);
        for (const p of (photos || [])) {
            const pId = p?.id;
            const photoVehicleId = p?.vehicleId ?? p?.vehicle?.id ?? null;
            if (String(photoVehicleId) !== String(vId)) continue;
            if (!pId) continue;
            try { await UserPageVehiclePhotoService.deletePhoto(pId); } catch {}
        }

        try { await UserPageVehicleService.deleteVehicle(vId); } catch {}
    }

    await UserPageAdvertisementsService.deleteAdvertisement(adId);
}

export async function addToFavorites(adId) {
    ensureUserAccess();
    return favoritesService.addToFavorites(tokenManager.getUsername(), adId);
}

export async function removeFromFavorites(adId) {
    ensureUserAccess();
    return favoritesService.removeFromFavorites(tokenManager.getUsername(), adId);
}

const UserPageOfferService = {
    getAllOffers,
    getOfferById,
    createOffer,
    updateOffer,
    deleteOffer,
    addToFavorites,
    removeFromFavorites
};

export default UserPageOfferService;
