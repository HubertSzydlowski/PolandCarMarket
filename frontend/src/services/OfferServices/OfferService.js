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
async function urlToFile(url, filename) {
    if (!url) throw new Error('urlToFile: url is required');
    const res = await fetch(url, { credentials: 'include', headers: { ...authHeaders() } });
    if (!res.ok) throw new Error(`Failed to fetch image for reupload: ${res.status}`);
    const blob = await res.blob();
    const ext = (blob.type && blob.type.split('/')[1]) || 'jpg';
    const name = filename || `reupload.${ext}`;
    try {
        return new File([blob], name, { type: blob.type || 'image/jpeg' });
    } catch (e) {
        blob.name = name;
        return blob;
    }
}

async function fetchVehiclesByAdvertisement(advertisementId) {
    const res = await fetch(`${BASE}/vehicles?advertisementId=${advertisementId}`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', ...authHeaders() }
    });
    if (!res.ok) throw new Error(`Failed to fetch vehicles for advertisement ${advertisementId}: ${res.status}`);
    return res.json();
}

async function fetchPhotosByVehicle(vehicleId) {
    const res = await fetch(`${BASE}/vehicle-photos?vehicleId=${vehicleId}`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', ...authHeaders() }
    });
    if (!res.ok) throw new Error(`Failed to fetch photos for vehicle ${vehicleId}: ${res.status}`);
    const photos = await res.json();
    return photos.map(photo => ({ ...photo, fullPhotoUrl: `${BASE}/photos/${photo.photoUrl}` }));
}

function normalizeFileEntry(entry) {
    if (!entry) return null;
    if (entry.file) {
        return {
            file: entry.file,
            isMain: !!entry.isMain,
            username: entry.username || null
        };
    }

    if (typeof File !== 'undefined' && entry instanceof File) {
        return { file: entry, isMain: false, username: null };
    }
    return null;
}

function ensureUploader(uploaderName, context = 'photo upload') {
    if (!uploaderName) throw new Error(`Uploader (username) required for ${context}`);
}

export async function getAllOffers(page = 0, size = 50) {
    return advertisementService.getAllAdvertisements(page, size);
}

export async function getOfferById(advertisementId, options = {}) {
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

            const normalizedFiles = files
                .map(f => normalizeFileEntry(f))
                .filter(nf => nf && nf.file);

            const mainIndex = normalizedFiles.findIndex(nf => nf.isMain);
            await vehiclePhotoService.addPhotosToVehicle(
                targetVehicleId,
                normalizedFiles.map(nf => nf.file),
                mainIndex,
                uploaderName,
                true
            );
        }
    } else if (Array.isArray(photos) && photos.length && createdVehicle) {
        const normalizedFiles = photos
            .map(f => normalizeFileEntry(f) || (f && typeof f === 'object' && f.file ? { file: f.file, isMain: !!f.isMain, username: f.username } : null))
            .filter(nf => nf && nf.file);

        const mainIndex = normalizedFiles.findIndex(nf => nf.isMain);
        for (let i = 0; i < normalizedFiles.length; i++) {
            const nf = normalizedFiles[i];
            const uploaderName = nf.username || uploader;
            ensureUploader(uploaderName, 'photos');
            await vehiclePhotoService.addPhotoToVehicle(createdVehicle.id, nf.file, uploaderName, i === mainIndex);
        }
    }

    const vehiclesWithPhotos = createdVehicle ? [{ ...createdVehicle, photos: await fetchPhotosByVehicle(createdVehicle.id) }] : [];

    return { advertisement: createdAd, vehicles: vehiclesWithPhotos };
}

export async function updateOffer(advertisementId, {
    advertisementDto,
    vehicle = null,
    vehicles = null,
    vehiclesToDelete = [],
    photosToAdd = [],
    photosToDelete = [],
    photos = undefined,
    replacePhotos = false,
    uploader = null
} = {}) {
    if (!advertisementId) throw new Error('advertisementId is required');

    const updatedAd = advertisementDto
        ? await advertisementService.updateAdvertisement(advertisementId, advertisementDto)
        : await advertisementService.getAdvertisementById(advertisementId);

    for (const photoId of photosToDelete || []) {
        try { await vehiclePhotoService.deletePhoto(photoId); } catch (e) { /* ignore */ }
    }

    for (const vId of vehiclesToDelete || []) {
        const photos = await vehiclePhotoService.getAllPhotos(vId);
        for (const p of photos) {
            try { await vehiclePhotoService.deletePhoto(p.id); } catch (e) { /* ignore */ }
        }
        try { await vehicleService.deleteVehicle(vId); } catch (e) { /* ignore */ }
    }

    let vehicleDto = vehicle || (Array.isArray(vehicles) && vehicles.length ? vehicles[0] : null);
    let resultVehicle = null;
    if (vehicleDto) {
        if (vehicleDto.id) {
            resultVehicle = await vehicleService.updateVehicle(vehicleDto.id, vehicleDto);
        } else {
            const dtoWithAd = { ...vehicleDto, advertisementId };
            resultVehicle = await vehicleService.createVehicle(dtoWithAd);
        }
    }

    if (replacePhotos && Array.isArray(photos)) {
        if (!resultVehicle || !resultVehicle.id) throw new Error('No primary vehicle to replace photos for.');

        const filesToUpload = [];
        let mainIndex = -1;
        let mainConversionFailed = false;

        for (let i = 0; i < photos.length; i++) {
            const entry = photos[i];
            if (!entry) continue;

            if ((entry.file && (typeof File !== 'undefined' && entry.file instanceof File)) ||
                (typeof Blob !== 'undefined' && entry.file instanceof Blob)) {
                filesToUpload.push(entry.file);
                if (entry.isMain) mainIndex = filesToUpload.length - 1;
            } else if (entry instanceof File) {
                filesToUpload.push(entry);
                if (entry.isMain) mainIndex = filesToUpload.length - 1;
            } else if (entry.fullPhotoUrl || entry.photoUrl) {
                const url = entry.fullPhotoUrl || entry.photoUrl;
                try {
                    const file = await urlToFile(url, `photo-${entry.id || i}.jpg`);
                    filesToUpload.push(file);
                    if (entry.isMain) mainIndex = filesToUpload.length - 1;
                } catch (err) {
                    console.error(`replacePhotos: failed to fetch/convert existing photo (index ${i}) url=${url}`, err);
                    if (entry.isMain) {
                        mainConversionFailed = true;
                        break;
                    }
                }
            } else {
            }
        }

        if (mainConversionFailed) {
            throw new Error('Failed to download the image marked as main. Ensure the server allows fetching the image (auth/CORS) or provide the image file directly.');
        }

        const uploaderName = uploader || null;
        ensureUploader(uploaderName, 'replacePhotos');

        await vehiclePhotoService.addPhotosToVehicle(resultVehicle.id, filesToUpload, mainIndex, uploaderName, true)

    } else {
        if (Array.isArray(photosToAdd) && photosToAdd.length) {
            const first = photosToAdd[0];
            const looksLikePerVehicle = first && (first.files || first.vehicleId !== undefined || first.vehicleIndex !== undefined);

            if (looksLikePerVehicle) {
                for (const entry of photosToAdd) {
                    const { vehicleId, vehicleIndex, files = [], username } = entry;
                    let targetVehicleId = vehicleId;
                    if ((vehicleIndex === 0 || vehicleIndex === '0') && resultVehicle) targetVehicleId = resultVehicle.id;
                    if (!targetVehicleId && resultVehicle) targetVehicleId = resultVehicle.id;
                    if (!targetVehicleId) continue;

                    const uploaderName = username || uploader;
                    ensureUploader(uploaderName, 'photosToAdd entry');

                    const normalizedFiles = files
                        .map(f => normalizeFileEntry(f))
                        .filter(nf => nf && nf.file);

                    const existingPhotos = await vehiclePhotoService.getAllPhotos(targetVehicleId);
                    const existingMain = existingPhotos.find(p => p && p.isMain);

                    const newMainIndex = normalizedFiles.findIndex(nf => nf.isMain);
                    const wantsNewMain = newMainIndex >= 0;

                    if (wantsNewMain && existingMain && existingMain.id) {
                        try {
                            await vehiclePhotoService.updatePhoto(existingMain.id, { isMain: false });
                        } catch (err) {
                            console.warn('Failed to unset existing main before uploading new main', err);
                        }
                    }

                    let uploadedPhotos = [];
                    if (normalizedFiles.length) {
                        uploadedPhotos = await vehiclePhotoService.addPhotosToVehicle(
                            targetVehicleId,
                            normalizedFiles.map(nf => nf.file),
                            -1,
                            uploaderName,
                            false
                        );
                    }

                    if (wantsNewMain) {
                        const uploadedChosen = uploadedPhotos[newMainIndex];
                        if (uploadedChosen && uploadedChosen.id) {
                            try {
                                await vehiclePhotoService.updatePhoto(uploadedChosen.id, { isMain: true });
                            } catch (err) {
                                console.warn('Failed to set uploaded photo as main', err);
                            }
                        }
                    }
                }
            } else {
                if (!resultVehicle) throw new Error('No primary vehicle to add photos to.');

                const normalizedFiles = photosToAdd
                    .map(f => normalizeFileEntry(f) || { file: f, isMain: false, username: uploader })
                    .filter(nf => nf && nf.file);

                const existingPhotos = await vehiclePhotoService.getAllPhotos(resultVehicle.id);
                const existingMain = existingPhotos.find(p => p && p.isMain);

                const newMainIndex = normalizedFiles.findIndex(nf => nf.isMain);
                const wantsNewMain = newMainIndex >= 0;

                if (wantsNewMain && existingMain && existingMain.id) {
                    try {
                        await vehiclePhotoService.updatePhoto(existingMain.id, { isMain: false });
                    } catch (err) {
                        console.warn('Failed to unset existing main before uploading new main', err);
                    }
                }

                let uploadedPhotos = [];
                if (normalizedFiles.length) {
                    const uploaderName = normalizedFiles[0].username || uploader;
                    ensureUploader(uploaderName, 'photosToAdd (flat)');

                    uploadedPhotos = await vehiclePhotoService.addPhotosToVehicle(
                        resultVehicle.id,
                        normalizedFiles.map(nf => nf.file),
                        -1,
                        uploaderName,
                        false
                    );
                }

                if (wantsNewMain) {
                    const uploadedChosen = uploadedPhotos[newMainIndex];
                    if (uploadedChosen && uploadedChosen.id) {
                        try {
                            await vehiclePhotoService.updatePhoto(uploadedChosen.id, { isMain: true });
                        } catch (err) {
                            console.warn('Failed to set uploaded photo as main', err);
                        }
                    }
                }
            }
        }
    }

    const externalPhotosPayload = arguments[1] && arguments[1].photos;
    if (!replacePhotos && Array.isArray(externalPhotosPayload)) {
        const photosPayload = externalPhotosPayload;
        for (const entry of photosPayload) {
            if (!entry || !entry.id) continue;
            let photoObj = null;
            try {
                photoObj = await vehiclePhotoService.getPhotoById(entry.id);
            } catch (err) {
                console.warn('Failed to fetch photo by id while applying photos payload', entry.id, err);
                continue;
            }
            const vid = photoObj?.vehicleId || photoObj?.vehicle?.id;
            if (!vid) continue;

            let currentPhotos = [];
            try {
                currentPhotos = await vehiclePhotoService.getAllPhotos(vid);
            } catch (err) {
                console.warn('Failed to fetch photos for vehicle while applying photos payload', vid, err);
            }
            const currentMain = currentPhotos.find(p => p && p.isMain);

            if (entry.isMain) {
                if (currentMain && currentMain.id && currentMain.id !== entry.id) {
                    try { await vehiclePhotoService.updatePhoto(currentMain.id, { isMain: false }); } catch (e) { console.warn('Failed to unset currentMain', e); }
                }
                try { await vehiclePhotoService.updatePhoto(entry.id, { isMain: true }); } catch (e) { console.warn('Failed to set payload photo as main', e); }
            } else {
                try { await vehiclePhotoService.updatePhoto(entry.id, { isMain: false }); } catch (e) { /* non-critical */ }
            }
        }
    }

    const allVehicles = await fetchVehiclesByAdvertisement(advertisementId);
    const vehiclesWithPhotos = await Promise.all(allVehicles.map(async v => {
        const photos = await vehiclePhotoService.getAllPhotos(v.id);
        return { ...v, photos };
    }));

    return { advertisement: updatedAd, vehicles: vehiclesWithPhotos };
}

export async function deleteOffer(advertisementId) {
    if (!advertisementId) throw new Error('advertisementId is required');

    const vehicles = await fetchVehiclesByAdvertisement(advertisementId);

    for (const v of vehicles) {
        const photos = await fetchPhotosByVehicle(v.id);
        for (const p of photos) {
            try { await vehiclePhotoService.deletePhoto(p.id); } catch (e) { /* ignore individual failures */ }
        }
        try { await vehicleService.deleteVehicle(v.id); } catch (e) { /* ignore */ }
    }

    await advertisementService.deleteAdvertisement(advertisementId);
}

export async function addToFavorites(userId, advertisementId) {
    if (!userId) throw new Error('userId is required to add to favorites in base OfferService');
    return favoritesService.addToFavorites(userId, advertisementId);
}

export async function removeFromFavorites(userId, advertisementId) {
    if (!userId) throw new Error('userId is required to remove from favorites in base OfferService');
    return favoritesService.removeFromFavorites(userId, advertisementId);
}

const OfferService = {
    getAllOffers,
    getOfferById,
    createOffer,
    updateOffer,
    deleteOffer,
    addToFavorites,
    removeFromFavorites
};

export default OfferService;