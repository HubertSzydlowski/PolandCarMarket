import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OfferService from "../../services/OfferServices/OfferService";
import tokenManager from "../../services/TokenManager";
import { brandModels } from "../../services/VehicleServices/vehicleService";
import OfferDeleteButton from "./OfferDeleteButton";
import vehiclePhotoService from "../../services/VehiclePhotoServices/vehiclePhotoService";

const BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

function authHeaders() {
    const token = tokenManager.getAccessToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
}

const colorOptions = [
    "Czarny", "Biały", "Srebrny", "Czerwony", "Niebieski",
    "Zielony", "Żółty", "Pomarańczowy", "Brązowy", "Granatowy"
];

const mapColor = (colorFromApi) => {
    if (!colorFromApi) return "";
    const normalized = colorFromApi.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const match = colorOptions.find(c =>
        c.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === normalized
    );
    return match || "";
};

async function fetchImageUrlAsFile(url, suggestedName) {
    const resp = await fetch(url, { credentials: "include" });
    if (!resp.ok) throw new Error(`Failed to fetch image ${url}: ${resp.status}`);
    const blob = await resp.blob();
    const ext = (blob.type && blob.type.split('/')[1]) || suggestedName?.split('.').pop() || 'jpg';
    const filename = suggestedName || `photo.${ext}`;
    return new File([blob], filename, { type: blob.type || 'image/jpeg' });
}

function buildFullPhotoUrl(photo) {
    if (!photo || !photo.photoUrl) return null;
    if (photo.photoUrl.startsWith("http")) return photo.photoUrl;
    return `${BASE}/photos/${photo.photoUrl}`;
}

async function tryFetchVehicleByAdvertisement(adId) {
    if (!adId) return null;
    try {
        const res = await fetch(`${BASE}/vehicles/by-advertisement/${adId}`, {
            credentials: "include",
            headers: { "Content-Type": "application/json", ...authHeaders() },
        });
        if (res.ok) {
            const json = await res.json();
            if (Array.isArray(json)) return json[0] || null;
            return json || null;
        }
    } catch {}
    try {
        const res2 = await fetch(`${BASE}/vehicles?advertisementId=${adId}`, {
            credentials: "include",
            headers: { "Content-Type": "application/json", ...authHeaders() },
        });
        if (!res2.ok) return null;
        const json = await res2.json();
        const arr = Array.isArray(json) ? json : json?.content || json?.items || null;
        if (!arr) return json && typeof json === "object" ? json : null;
        return arr.find(v => String(v?.advertisementId || v?.advertisement?.id) === String(adId)) || null;
    } catch {
        return null;
    }
}

async function tryFetchPhotosByVehicle(vehicleId) {
    if (!vehicleId) return [];
    try {
        const r1 = await fetch(`${BASE}/vehicle-photos/by-vehicle/${vehicleId}`, {
            credentials: "include",
            headers: { "Content-Type": "application/json", ...authHeaders() },
        });
        if (r1.ok) {
            const j = await r1.json();
            const arr = Array.isArray(j) ? j : j?.content || j?.items || [];
            return arr;
        }
    } catch {}
    try {
        const r2 = await fetch(`${BASE}/vehicle-photos?vehicleId=${vehicleId}`, {
            credentials: "include",
            headers: { "Content-Type": "application/json", ...authHeaders() },
        });
        if (!r2.ok) return [];
        const j = await r2.json();
        return Array.isArray(j) ? j : j?.content || j?.items || [];
    } catch {
        return [];
    }
}

const initialVehicle = {
    brand: "",
    model: "",
    year: "",
    price: "",
    fuelType: "PETROL",
    transmission: "MANUAL",
    color: "",
    mileage: "",
    power: "",
    seats: 1,
    description: "",
    vin: "",
    condition: "USED",
    hasWarranty: false,
    mainFileIndex: -1,
};

const normalize = (v) => (v ? v.trim().toUpperCase().replace(/\s+/g, "_") : null);

const OfferEditForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [advertisement, setAdvertisement] = useState(null);
    const [vehicle, setVehicle] = useState({ ...initialVehicle });
    const [photos, setPhotos] = useState([]);
    const [initialPhotoIds, setInitialPhotoIds] = useState([]);
    const [files, setFiles] = useState([]);
    const [uploader, setUploader] = useState("");

    const brands = Object.keys(brandModels || {});

    const removeExistingPhoto = (idx) => {
        setPhotos(prev => {
            const removed = prev[idx];
            const next = prev.filter((_, i) => i !== idx);
            if (removed?.isMain) {
                setVehicle(v => ({ ...v, mainFileIndex: -1 }));
                return next.map(p => ({ ...p, isMain: false }));
            }
            return next;
        });
    };

    const removeFileAt = (idx) => {
        setFiles(prev => {
            const next = prev.filter((_, i) => i !== idx);
            setVehicle(prevVeh => {
                const cur = prevVeh?.mainFileIndex;
                if (cur == null || cur === -1) return prevVeh;
                if (cur === idx) {
                    return { ...prevVeh, mainFileIndex: -1 };
                }
                if (cur > idx) {
                    return { ...prevVeh, mainFileIndex: cur - 1 };
                }
                return prevVeh;
            });
            return next;
        });
    };

    useEffect(() => {
        let mounted = true;

        const load = async () => {
            setLoading(true);
            setError(null);
            setAdvertisement(null);
            setVehicle({ ...initialVehicle });
            setPhotos([]);
            setFiles([]);
            setInitialPhotoIds([]);

            try {
                const adRes = await fetch(`${BASE}/advertisements/${id}`, {
                    credentials: "include",
                    headers: { "Content-Type": "application/json", ...authHeaders() },
                });
                if (!adRes.ok) throw new Error(`Advertisement fetch failed: ${adRes.status}`);
                const adJson = await adRes.json();

                const veh = await tryFetchVehicleByAdvertisement(id);

                let photosArr = [];
                if (veh?.id) {
                    photosArr = await tryFetchPhotosByVehicle(veh.id);
                    photosArr = photosArr.map(p => ({ ...p, fullPhotoUrl: buildFullPhotoUrl(p), isMain: !!p.isMain }));
                }

                if (!mounted) return;

                let displayModel = "";
                if (veh?.brand && veh?.model && brandModels[veh.brand]) {
                    const candidates = brandModels[veh.brand];
                    const found = candidates.find(c => normalize(c) === normalize(veh.model));
                    if (found) displayModel = found;
                }

                setAdvertisement(adJson);
                setVehicle(
                    veh
                        ? { ...initialVehicle, ...veh, model: displayModel || "", color: mapColor(veh.color), mainFileIndex: -1 }
                        : { ...initialVehicle }
                );                setPhotos(photosArr);
                setInitialPhotoIds(photosArr.map(p => p.id));
            } catch (e) {
                console.error("load error", e);
                if (mounted) setError(e.message || "Błąd ładowania oferty");
            } finally {
                if (mounted) setLoading(false);
            }
        };

        load();
        return () => { mounted = false; };
    }, [id]);

    const handleVehicleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setVehicle(prev => {
            if (name === "brand") return { ...prev, brand: value, model: "" };
            if (type === "checkbox") return { ...prev, [name]: checked };
            return { ...prev, [name]: value };
        });
    };

    const handleFilesChange = (e) => {
        const selected = Array.from(e.target.files || []);
        if (selected.length === 0) return;
        setFiles(prev => [...prev, ...selected]);
        e.target.value = null;
    };

    const deletePhotoById = async (photoId) => {
        try {
            const res = await fetch(`${BASE}/vehicle-photos/${photoId}`, {
                method: "DELETE",
                credentials: "include",
                headers: { "Content-Type": "application/json", ...authHeaders() },
            });
            if (!res.ok) console.warn("Delete photo failed", photoId, res.status);
        } catch (e) {
            console.error("Delete photo request failed", e);
        }
    };

    const uploadFilesToVehicle = async (vehicleId, uploaderName, filesArray, mainIndex = 0) => {
        if (!filesArray || filesArray.length === 0) return;

        for (let i = 0; i < filesArray.length; i++) {
            const file = filesArray[i];
            const fd = new FormData();
            fd.append("photo", file);
            fd.append("username", uploaderName);
            fd.append("vehicleId", vehicleId);
            fd.append("isMain", i === mainIndex ? "true" : "false");

            const res = await fetch(`${BASE}/vehicle-photos`, {
                method: "POST",
                credentials: "include",
                body: fd,
                headers: { ...authHeaders() }
            });
            if (!res.ok) {
                const txt = await res.text().catch(() => "");
                throw new Error(`Upload failed for ${file.name}: ${res.status} - ${txt || res.statusText}`);
            }
        }
    };

    const prepareFilesForUpload = () => {
        const existing = photos.map(p => ({
            file: null,
            isMain: !!p.isMain,
            name: p.photoUrl,
        }));

        const newFiles = files.map((f, idx) => ({
            file: f,
            isMain: vehicle.mainFileIndex === idx,
            name: f.name,
        }));

        return [...existing, ...newFiles];
    };

    const [showTooltip, setShowTooltip] = useState(false);
    const [showPhotosTooltip, setShowPhotosTooltip] = useState(false);
    const [mainIndex, setMainIndex] = useState(vehicle?.mainFileIndex ?? -1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (!advertisement) throw new Error("Brak danych ogłoszenia.");
            if (!uploader || !uploader.trim()) throw new Error("Pole Uploader jest wymagane.");

            const advertisementDto = {
                title: advertisement.title,
                userId: Number(advertisement.userId),
                phoneNumber: advertisement.phoneNumber || null,
                googlePlaceId: advertisement.googlePlaceId || null,
            };

            const vehicleDto = {
                ...vehicle,
                year: vehicle.year ? Number(vehicle.year) : null,
                price: vehicle.price ? Number(vehicle.price) : null,
                mileage: vehicle.mileage ? Number(vehicle.mileage) : null,
                power: vehicle.power ? Number(vehicle.power) : null,
                seats: vehicle.seats ? Number(vehicle.seats) : null,
            };

            const updateResult = await OfferService.updateOffer(id, {
                advertisementDto,
                vehicle: vehicleDto,
                uploader: uploader.trim()
            });

            const vehicleId = vehicle?.id || (updateResult && updateResult.vehicles && updateResult.vehicles[0] && updateResult.vehicles[0].id);
            if (!vehicleId) throw new Error("Nie udało się ustalić vehicleId po aktualizacji.");

            const reconstructedExisting = [];
            for (const p of photos) {
                if (p && p.fullPhotoUrl) {
                    try {
                        const suggested = (p.photoUrl || '').split('/').pop() || `existing_${p.id}.jpg`;
                        const file = await fetchImageUrlAsFile(p.fullPhotoUrl, suggested);
                        reconstructedExisting.push({ file, isMain: !!p.isMain, src: p.fullPhotoUrl });
                    } catch (err) {
                        throw new Error(`Nie udało się pobrać istniejącego zdjęcia: ${p.fullPhotoUrl}. Sprawdź CORS/autoryzację serwera.`);
                    }
                }
            }

            const remotePhotos = await vehiclePhotoService.getAllPhotos(vehicleId);
            for (const rp of remotePhotos) {
                try {
                    await vehiclePhotoService.deletePhoto(rp.id);
                } catch (err) {
                    console.warn("Nie udało się usunąć foto id=", rp.id, err);
                }
            }
            let uploads = [];

            for (let i = 0; i < reconstructedExisting.length; i++) {
                uploads.push({ file: reconstructedExisting[i].file, isMain: !!reconstructedExisting[i].isMain, debugSrc: reconstructedExisting[i].src });
            }

            for (let i = 0; i < files.length; i++) {
                uploads.push({ file: files[i], isMain: vehicle.mainFileIndex === i, debugSrc: files[i].name });
            }

            const existingMainIndex = photos.findIndex(p => !!p.isMain);
            const newMainIndex = (vehicle && typeof vehicle.mainFileIndex === 'number' && vehicle.mainFileIndex >= 0) ? vehicle.mainFileIndex : -1;

            let mainIdentifier = null;
            if (existingMainIndex !== -1) {
                mainIdentifier = { type: 'existing', indexInUploads: existingMainIndex };
            } else if (newMainIndex !== -1) {
                mainIdentifier = { type: 'new', indexInUploads: reconstructedExisting.length + newMainIndex };
            }

            let nonMainUploads = [];
            let mainUpload = null;
            uploads.forEach((u, idx) => {
                const isMainFlag = !!u.isMain;
                const isMarkedMain = mainIdentifier ? (idx === mainIdentifier.indexInUploads) : isMainFlag;
                if (isMarkedMain) {
                    mainUpload = { ...u, isMain: true, originalIdx: idx };
                } else {
                    nonMainUploads.push({ ...u, isMain: false, originalIdx: idx });
                }
            });

            const finalUploads = mainUpload ? [...nonMainUploads, mainUpload] : nonMainUploads;

            console.debug("Final upload queue:", finalUploads.map(f => ({ debugSrc: f.debugSrc, isMain: f.isMain, orig: f.originalIdx })));

            await new Promise(r => setTimeout(r, 200));

            for (const up of finalUploads) {
                try {
                    await vehiclePhotoService.addPhotoToVehicle(vehicleId, up.file, uploader.trim(), !!up.isMain);
                    console.debug("Uploaded:", up.debugSrc, "isMain=", !!up.isMain);
                } catch (err) {
                    const msg = (err && err.message) ? err.message : String(err);
                    console.error("Upload failed for", up.debugSrc, "isMain=", up.isMain, msg);
                    if (msg.includes("Main photo already exists") || msg.toLowerCase().includes("main")) {
                        console.warn("Backend reported main collision, retrying upload without isMain for", up.debugSrc);
                        try {
                            await vehiclePhotoService.addPhotoToVehicle(vehicleId, up.file, uploader.trim(), false);
                            console.debug("Fallback upload succeeded (no isMain) for", up.debugSrc);
                        } catch (e2) {
                            console.error("Fallback also failed for", up.debugSrc, e2);
                            throw e2;
                        }
                    } else {
                        throw err;
                    }
                }
            }

            navigate(`/offers/${id}`);
        } catch (e) {
            console.error(e);
            setError(e.message || "Błąd podczas zapisywania oferty.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Ładowanie oferty...</div>;
    if (error) return <div style={{ color: "red" }}>{error}</div>;

    return (
        <>
            <div
                style={{
                    width: "100%",
                    boxSizing: "border-box",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 24px",
                    backgroundColor: "#8b0000",
                    color: "white",
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                }}
            >
                <div
                    style={{ fontWeight: "bold", fontSize: "1.2rem", cursor: "pointer" }}
                    onClick={() => navigate("/offers")}
                >
                    PCM
                </div>
                <button
                    style={{
                        padding: "8px 16px",
                        fontWeight: "bold",
                        borderRadius: "6px",
                        border: "none",
                        cursor: "pointer",
                        backgroundColor: "white",
                        color: "#8b0000",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                    }}
                    onClick={() => navigate("/my-account")}
                >
                    My account
                    <img src="/icons/user.png" alt="user icon" style={{ width: 20, height: 20 }} />
                </button>
            </div>

            <div style={{ padding: "16px", maxWidth: 800, margin: "0 auto" }}>
                <div
                    style={{
                        borderRadius: 8,
                        overflow: "hidden",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                        marginTop: 20,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#8b0000",
                            color: "#fff",
                            padding: 12,
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                        }}
                    >
                        <img src="/icons/offer.png" alt="Offer" style={{ width: 20, height: 20 }} />
                        Edit Offer
                    </div>

                    <div style={{ backgroundColor: "#fff", padding: 16 }}>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: 12, display: "flex", flexDirection: "column" }}>
                                <label>Title:</label>
                                <input
                                    value={advertisement?.title || ""}
                                    onChange={e => setAdvertisement({ ...advertisement, title: e.target.value })}
                                    required
                                    style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                                />
                            </div>

                            <div style={{ marginBottom: 12, display: "flex", flexDirection: "column" }}>
                                <label>User ID:</label>
                                <input
                                    type="number"
                                    value={advertisement?.userId || ""}
                                    onChange={e => setAdvertisement({ ...advertisement, userId: e.target.value })}
                                    required
                                    style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                                />
                            </div>

                            <div style={{ marginBottom: 12, display: "flex", flexDirection: "column" }}>
                                <label>Phone Number:</label>
                                <input
                                    value={advertisement?.phoneNumber || ""}
                                    onChange={e => setAdvertisement({ ...advertisement, phoneNumber: e.target.value })}
                                    style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                                />
                            </div>

                            <div style={{ marginBottom: 12, display: "flex", flexDirection: "column", position: "relative" }}>
                                <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                    Google Place ID:
                                    <div style={{ position: "relative", display: "inline-block" }}>
                                        <img
                                            src="/icons/info.png"
                                            alt="info"
                                            style={{ width: 16, height: 16, cursor: "pointer" }}
                                            onMouseEnter={() => setShowTooltip(true)}
                                            onMouseLeave={() => setShowTooltip(false)}
                                        />
                                        {showTooltip && (
                                            <div
                                                style={{
                                                    width: 280,
                                                    backgroundColor: "#333",
                                                    color: "#fff",
                                                    textAlign: "left",
                                                    borderRadius: 6,
                                                    padding: "8px",
                                                    position: "absolute",
                                                    zIndex: 10,
                                                    bottom: "125%",
                                                    left: "50%",
                                                    transform: "translateX(-50%)",
                                                    fontSize: 12,
                                                    lineHeight: 1.4,
                                                    boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                                                }}
                                            >
                                                To get a Google Place URL in the correct format:
                                                <ol style={{ margin: "4px 0 0 16px", padding: 0 }}>
                                                    <li>Open Google Maps and find the location you want.</li>
                                                    <li>Click on the point or marker on the map.</li>
                                                    <li>Copy the URL from the browser’s address bar.</li>
                                                </ol>
                                            </div>
                                        )}
                                    </div>
                                </label>
                                <input
                                    value={advertisement?.googlePlaceId || ""}
                                    onChange={e => setAdvertisement({ ...advertisement, googlePlaceId: e.target.value })}
                                    style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc", marginTop: 4 }}
                                />
                            </div>

                            {[
                                { label: "Brand", type: "select", name: "brand", options: brands },
                                { label: "Model", type: "select", name: "model", options: vehicle.brand ? brandModels[vehicle.brand] : [], disabled: !vehicle.brand },
                                { label: "Year", type: "number", name: "year" },
                                { label: "Price", type: "number", name: "price", step: 0.01 },
                                { label: "Fuel Type", type: "select", name: "fuelType", options: ["PETROL", "DIESEL", "ELECTRIC", "HYBRID"] },
                                { label: "Transmission", type: "select", name: "transmission", options: ["MANUAL", "AUTOMATIC"] },
                                { label: "Color", type: "select", name: "color", options: colorOptions },
                                { label: "Mileage (km)", type: "number", name: "mileage" },
                                { label: "Power (HP)", type: "number", name: "power" },
                                { label: "Seats", type: "number", name: "seats", min: 1, max: 9 },
                                { label: "VIN", type: "text", name: "vin" },
                                { label: "Description", type: "textarea", name: "description", rows: 3 },
                                { label: "Condition", type: "select", name: "condition", options: ["NEW", "USED", "DAMAGED"] },
                                { label: "Warranty", type: "select", name: "hasWarranty", options: ["Yes", "No"] },
                            ].map((f, idx) => (
                                <div key={idx} style={{ marginBottom: 12, display: "flex", flexDirection: "column" }}>
                                    <label>{f.label}:</label>
                                    {f.type === "select" ? (
                                        <select
                                            name={f.name}
                                            value={vehicle[f.name] ?? ""}
                                            onChange={handleVehicleChange}
                                            disabled={f.disabled}
                                            style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                                        >
                                            <option value="">-- select --</option>
                                            {f.options.map(opt => <option key={opt} value={opt}>{opt.replace(/_/g, " ")}</option>)}
                                        </select>
                                    ) : f.type === "textarea" ? (
                                        <textarea
                                            name={f.name}
                                            value={vehicle[f.name] ?? ""}
                                            rows={f.rows || 3}
                                            onChange={handleVehicleChange}
                                            style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                                        />
                                    ) : (
                                        <input
                                            type={f.type}
                                            name={f.name}
                                            step={f.step}
                                            min={f.min}
                                            max={f.max}
                                            value={vehicle[f.name] ?? ""}
                                            onChange={handleVehicleChange}
                                            style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                                        />
                                    )}
                                </div>
                            ))}

                            <div style={{ marginBottom: 12, display: "flex", flexDirection: "column", position: "relative" }}>
                                <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                    Photos:
                                    <div style={{ position: "relative", display: "inline-block" }}>
                                        <img
                                            src="/icons/info.png"
                                            alt="info"
                                            style={{ width: 16, height: 16, cursor: "pointer" }}
                                            onMouseEnter={() => setShowPhotosTooltip(true)}
                                            onMouseLeave={() => setShowPhotosTooltip(false)}
                                        />
                                        {showPhotosTooltip && (
                                            <div
                                                style={{
                                                    width: 220,
                                                    backgroundColor: "#333",
                                                    color: "#fff",
                                                    borderRadius: 6,
                                                    padding: "6px 8px",
                                                    position: "absolute",
                                                    top: "125%",
                                                    left: "50%",
                                                    transform: "translateX(-50%)",
                                                    fontSize: 11,
                                                    lineHeight: 1.3,
                                                    boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                                                    zIndex: 10,
                                                    pointerEvents: "none",
                                                    textAlign: "center",
                                                }}
                                            >
                                                Use the checkboxes on each photo to mark it as the main image.
                                            </div>
                                        )}
                                    </div>
                                </label>

                                <div style={{ marginTop: 8 }}>
                                    <p>Existing Photos:</p>
                                    {photos.length === 0 && <p>Brak</p>}
                                    {photos.map((p, idx) => (
                                        <div key={p.id ?? idx} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                                            <div style={{ position: "relative" }}>
                                                <img
                                                    src={p.fullPhotoUrl}
                                                    alt=""
                                                    style={{
                                                        width: 200,
                                                        height: 140,
                                                        objectFit: "cover",
                                                        borderRadius: 4,
                                                        border: p.isMain ? "2px solid #8b0000" : "1px solid #ccc",
                                                    }}
                                                    onError={(e) => (e.currentTarget.style.display = "none")}
                                                />
                                                <input
                                                    type="checkbox"
                                                    checked={!!p.isMain}
                                                    onChange={() =>
                                                        setPhotos(prev => prev.map((ph, i) => ({ ...ph, isMain: i === idx })))
                                                    }
                                                    style={{
                                                        accentColor: "#8b0000",
                                                        position: "absolute",
                                                        top: "50%",
                                                        left: 8,
                                                        transform: "translateY(-50%)",
                                                        width: 20,
                                                        height: 20,
                                                        cursor: "pointer",
                                                    }}
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeExistingPhoto(idx)}
                                                style={{
                                                    padding: "4px 12px",
                                                    backgroundColor: "#555",
                                                    color: "#fff",
                                                    border: "none",
                                                    borderRadius: 4,
                                                    cursor: "pointer",
                                                    fontSize: 12,
                                                    height: 30,
                                                    alignSelf: "center",
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ marginTop: 12 }}>
                                    <p>New Files:</p>
                                    {files.map((f, idx) => (
                                        <div key={f.name + "_" + f.lastModified + "_" + idx} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                                            <div style={{ position: "relative" }}>
                                                <img
                                                    src={URL.createObjectURL(f)}
                                                    alt={f.name}
                                                    style={{
                                                        width: 200,
                                                        height: 140,
                                                        objectFit: "cover",
                                                        borderRadius: 4,
                                                        border: mainIndex === idx ? "2px solid #8b0000" : "1px solid #ccc",
                                                    }}
                                                />
                                                <input
                                                    type="checkbox"
                                                    checked={mainIndex === idx}
                                                    onChange={() => setMainIndex(idx)}
                                                    style={{
                                                        accentColor: "#8b0000",
                                                        position: "absolute",
                                                        top: "50%",
                                                        left: 8,
                                                        transform: "translateY(-50%)",
                                                        width: 20,
                                                        height: 20,
                                                        cursor: "pointer",
                                                    }}
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeFileAt(idx)}
                                                style={{
                                                    padding: "4px 12px",
                                                    backgroundColor: "#555",
                                                    color: "#fff",
                                                    border: "none",
                                                    borderRadius: 4,
                                                    cursor: "pointer",
                                                    fontSize: 12,
                                                    height: 30,
                                                    alignSelf: "center",
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}

                                    <input type="file" multiple accept="image/*" onChange={handleFilesChange} style={{ marginTop: 6 }} />
                                </div>
                            </div>

                            <div style={{ marginBottom: 12, display: "flex", flexDirection: "column" }}>
                                <label>Uploader:</label>
                                <input
                                    value={uploader}
                                    onChange={(e) => setUploader(e.target.value)}
                                    required
                                    style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                                />
                            </div>

                            {error && <p style={{ color: "red" }}>{error}</p>}

                            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                                <button
                                    type="submit"
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 6,
                                        padding: "8px 14px",
                                        borderRadius: 6,
                                        border: "none",
                                        backgroundColor: "#8b0000",
                                        color: "#fff",
                                        cursor: "pointer",
                                        fontWeight: 600,
                                    }}
                                    disabled={loading}
                                >
                                    <img src="/icons/save.png" alt="save" style={{ width: 16, height: 16 }} />
                                    {loading ? "Saving..." : "Save Changes"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => navigate("/offers")}
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 6,
                                        padding: "8px 14px",
                                        borderRadius: 6,
                                        border: "none",
                                        backgroundColor: "#555",
                                        color: "#fff",
                                        cursor: "pointer",
                                        fontWeight: 600,
                                    }}
                                >
                                    <img src="/icons/cancel.png" alt="cancel" style={{ width: 16, height: 16 }} />
                                    Cancel
                                </button>

                                <OfferDeleteButton id={id} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );

};

export default OfferEditForm;