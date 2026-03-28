import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserPageOfferService from "../../../services/UserPageServices/UserPageOfferService";
import { brandModels } from "../../../services/UserPageServices/UserPageVehicleService";
import OfferDeleteButton from "../../OffersComponent/OfferDeleteButton";
import tokenManager from "../../../services/TokenManager";

const BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

const colorOptions = [
    "Black", "White", "Silver", "Red", "Blue",
    "Green", "Yellow", "Orange", "Brown", "Navy"
];

const mapColor = (colorFromApi) => {
    if (!colorFromApi) return "";
    const normalized = colorFromApi.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const match = colorOptions.find(c =>
        c.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === normalized
    );
    return match || "";
};

function authHeaders() {
    const token = tokenManager.getAccessToken && tokenManager.getAccessToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
}

function buildFullPhotoUrl(photo) {
    if (!photo) return null;
    const url = photo.fullPhotoUrl || photo.photoUrl;
    if (!url) return null;
    if (url.startsWith("http")) return url;
    return `${BASE}/photos/${url}`;
}

const initialVehicle = {
    brand: "",
    model: "",
    year: null,
    price: null,
    fuelType: "PETROL",
    transmission: "MANUAL",
    color: "",
    mileage: null,
    power: null,
    seats: 1,
    description: "",
    vin: "",
    condition: "USED",
    hasWarranty: false,
    mainFileIndex: -1,
};

const normalize = (v) => (v ? v.trim().toUpperCase().replace(/\s+/g, "_") : null);

const normalizeEnum = (v) => {
    if (v == null) return v;
    return String(v).trim().toUpperCase().replace(/\s+/g, "_");
};

const formatOptionLabel = (val) => {
    if (val == null) return "";
    const s = String(val).replace(/_/g, " ").toLowerCase();
    return s.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
};

const UserPageOfferEditForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});

    const [advertisement, setAdvertisement] = useState(null);
    const [vehicle, setVehicle] = useState({ ...initialVehicle });
    const [photos, setPhotos] = useState([]);
    const [initialPhotoIds, setInitialPhotoIds] = useState([]);
    const [files, setFiles] = useState([]);
    const [showTooltip, setShowTooltip] = useState(false);
    const [showPhotosTooltip, setShowPhotosTooltip] = useState(false);

    const brands = Object.keys(brandModels || {});

    const tokenUserId = tokenManager.getUserId?.() || tokenManager.getUser?.()?.id || null;
    const tokenUsername = tokenManager.getUsername?.() || tokenManager.getUser?.()?.username || null;

    useEffect(() => {
        let mounted = true;

        const tryFetchVehicleByAdvertisement = async (adId) => {
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
        };

        const tryFetchPhotosByVehicle = async (vehicleId) => {
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
        };

        const load = async () => {
            setLoading(true);
            setError(null);
            setAdvertisement(null);
            setVehicle({ ...initialVehicle });
            setPhotos([]);
            setFiles([]);
            setInitialPhotoIds([]);

            try {
                const res = await fetch(`${BASE}/advertisements/${id}`, {
                    credentials: "include",
                    headers: { "Content-Type": "application/json", ...authHeaders() },
                });
                if (!res.ok) throw new Error(`Advertisement fetch failed: ${res.status}`);
                const adJson = await res.json();

                const veh = await tryFetchVehicleByAdvertisement(id);

                let photosArr = [];
                if (veh?.id) {
                    photosArr = await tryFetchPhotosByVehicle(veh.id);
                    photosArr = photosArr.map(p => ({ ...p, fullPhotoUrl: buildFullPhotoUrl(p), isMain: !!p.isMain }));
                    if (photosArr.length && !photosArr.some(p => p.isMain)) {
                        photosArr[0] = { ...photosArr[0], isMain: true };
                    }
                }

                if (!mounted) return;

                let displayModel = "";
                if (veh?.brand && veh?.model && brandModels[veh.brand]) {
                    const candidates = brandModels[veh.brand];
                    const found = candidates.find(c => normalize(c) === normalize(veh.model));
                    if (found) displayModel = found;
                }

                if (!adJson.userId && tokenUserId) {
                    adJson.userId = tokenUserId;
                }

                setAdvertisement(adJson);
                const rawHasWarranty = veh?.hasWarranty ?? veh?.warranty;
                const hasWarrantyBool =
                    rawHasWarranty === true ||
                    rawHasWarranty === "true" ||
                    rawHasWarranty === "True" ||
                    rawHasWarranty === 1 ||
                    rawHasWarranty === "1";

                setVehicle(veh
                    ? {
                        ...initialVehicle,
                        ...veh,
                        year: veh.year ? Number(veh.year) : null,
                        price: veh.price ? Number(veh.price) : null,
                        mileage: veh.mileage ? Number(veh.mileage) : null,
                        power: veh.power ? Number(veh.power) : null,
                        seats: veh.seats ? Number(veh.seats) : 1,
                        model: displayModel || "",
                        color: mapColor(veh.color),
                        hasWarranty: !!hasWarrantyBool,
                        mainFileIndex: -1,
                        fuelType: normalizeEnum(veh?.fuelType) || initialVehicle.fuelType,
                        transmission: normalizeEnum(veh?.transmission) || initialVehicle.transmission,
                        condition: normalizeEnum(veh?.condition) || initialVehicle.condition,
                    }
                    : { ...initialVehicle }
                );
                setPhotos(photosArr);
                setInitialPhotoIds(photosArr.map(p => p.id).filter(Boolean));
            } catch (err) {
                console.error("Load user offer error:", err);
                if (mounted) setError(err?.message || "Error loading offer");
            } finally {
                if (mounted) setLoading(false);
            }
        };

        load();
        return () => { mounted = false; };
    }, [id, tokenUserId]);

    const handleVehicleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "hasWarranty") {
            setVehicle(prev => ({ ...prev, hasWarranty: value === "Yes" }));
            return;
        }

        if (name === "fuelType" || name === "transmission" || name === "condition") {
            setVehicle(prev => ({ ...prev, [name]: normalizeEnum(value) }));
            return;
        }

        if (name === "brand") {
            setVehicle(prev => ({ ...prev, brand: value, model: "" }));
            return;
        }

        if (type === "checkbox") {
            setVehicle(prev => ({ ...prev, [name]: checked }));
            return;
        }

        setVehicle(prev => ({ ...prev, [name]: value }));
    };

    const handleFilesChange = (e) => {
        const selected = Array.from(e.target.files || []);
        if (selected.length === 0) return;

        setFiles(prev => {
            const combined = [...prev, ...selected];

            setVehicle(prevV => {
                const existingHasMain = photos.some(p => p.isMain);
                if (!existingHasMain && (prevV.mainFileIndex == null || prevV.mainFileIndex === -1)) {
                    return { ...prevV, mainFileIndex: 0 };
                }
                return prevV;
            });

            return combined;
        });

        e.target.value = null;
    };

    const removeExistingPhoto = (idx) => {
        setPhotos(prev => {
            const removed = prev[idx];
            const next = prev.filter((_, i) => i !== idx);

            if (removed?.isMain) {
                if (files.length > 0) {
                    setVehicle(v => ({ ...v, mainFileIndex: 0 }));
                    setPhotos(ar => ar.map(p => ({ ...p, isMain: false })));
                } else if (next.length > 0) {
                    next[0] = { ...next[0], isMain: true };
                } else {
                    setVehicle(v => ({ ...v, mainFileIndex: -1 }));
                }
            }

            return next;
        });
    };

    const removeFileAt = (idx) => {
        setFiles(prev => {
            const wasMain = vehicle?.mainFileIndex === idx;
            const next = prev.filter((_, i) => i !== idx);

            setVehicle(prevVeh => {
                const cur = prevVeh?.mainFileIndex;
                if (cur == null || cur === -1) {
                    return prevVeh;
                }
                if (wasMain) {
                    if (next.length > 0) {
                        return { ...prevVeh, mainFileIndex: 0 };
                    } else {
                        if (photos.length > 0) {
                            setPhotos(prevPhotos => prevPhotos.map((p, i) => ({ ...p, isMain: i === 0 })));
                        }
                        return { ...prevVeh, mainFileIndex: -1 };
                    }
                }
                if (cur > idx) {
                    return { ...prevVeh, mainFileIndex: cur - 1 };
                }
                return prevVeh;
            });

            return next;
        });
    };

    const uploadFileToVehicle = async (vehicleId, file, uploaderName) => {
        const fd = new FormData();
        fd.append("photo", file);
        if (uploaderName) fd.append("username", uploaderName);
        if (vehicleId != null) fd.append("vehicleId", String(vehicleId));
        fd.append("isMain", "false");

        const res = await fetch(`${BASE}/vehicle-photos`, {
            method: "POST",
            credentials: "include",
            body: fd,
            headers: { ...authHeaders() },
        });

        if (!res.ok) {
            const txt = await res.text().catch(() => "");
            throw new Error(`Upload failed for ${file.name}: ${res.status} ${txt || ""}`);
        }
        const created = await res.json();
        return { ...created, fullPhotoUrl: buildFullPhotoUrl(created) };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setErrors({});

        const newErrors = {};
        if (!advertisement?.title || !advertisement.title.trim()) newErrors.title = "Title is required.";
        if (!advertisement?.phoneNumber || !advertisement.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required.";
        if (!advertisement?.googlePlaceId || !advertisement.googlePlaceId.trim()) newErrors.googlePlaceId = "Google Place ID is required.";

        if (!vehicle.brand || !vehicle.brand.trim()) newErrors.brand = "Vehicle brand is required.";
        if (!vehicle.model || !vehicle.model.trim()) newErrors.model = "Vehicle model is required.";
        if (vehicle.year == null || vehicle.year === "") newErrors.year = "Year is required.";
        if (vehicle.price == null || vehicle.price === "") newErrors.price = "Price is required.";
        if (!vehicle.color || !vehicle.color.trim()) newErrors.color = "Color is required.";
        if (vehicle.mileage == null || vehicle.mileage === "") newErrors.mileage = "Mileage is required.";
        if (vehicle.power == null || vehicle.power === "") newErrors.power = "Power is required.";
        if (vehicle.seats == null || vehicle.seats === "") newErrors.seats = "Seats are required.";
        if (!vehicle.vin || !vehicle.vin.trim()) newErrors.vin = "VIN is required.";
        if (!vehicle.description || !vehicle.description.trim()) newErrors.description = "Description is required.";

        if (!photos.length && !files.length) newErrors.photos = "Add at least one photo.";

        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        try {
            const advertisementDto = {
                title: advertisement.title.trim(),
                phoneNumber: advertisement.phoneNumber?.trim() || null,
                googlePlaceId: advertisement.googlePlaceId?.trim() || null,
            };

            const vehicleDto = {
                ...vehicle,
                year: vehicle.year != null ? Number(vehicle.year) : null,
                price: vehicle.price != null ? Number(vehicle.price) : null,
                mileage: vehicle.mileage != null ? Number(vehicle.mileage) : null,
                power: vehicle.power != null ? Number(vehicle.power) : null,
                seats: vehicle.seats != null ? Number(vehicle.seats) : null,
                hasWarranty: !!vehicle.hasWarranty,
            };

            const removedIds = initialPhotoIds.filter(pid => !photos.some(p => p.id === pid));
            const photosToDelete = removedIds.slice();

            await UserPageOfferService.updateOffer(Number(id), {
                advertisementDto,
                vehicle: vehicleDto,
                photosToDelete
            });

            const vehicleIdForPhotos = vehicle?.id || vehicle?.vehicleId || null;
            const uploadedPhotos = [];
            for (let i = 0; i < files.length; i++) {
                const f = files[i];
                try {
                    const created = await uploadFileToVehicle(vehicleIdForPhotos, f, tokenUsername);
                    const shouldBeMain = vehicle.mainFileIndex === i;
                    uploadedPhotos.push({ ...created, isMain: !!shouldBeMain });
                } catch (err) {
                    throw err;
                }
            }

            const combinedPhotos = [...photos, ...uploadedPhotos];

            let selectedMainId = null;
            const existingSelected = combinedPhotos.find(p => p && p.id && p.isMain);
            if (existingSelected) selectedMainId = existingSelected.id;
            else {
                const uploadedSelected = combinedPhotos.find(p => p && p.id && p.isMain);
                if (uploadedSelected) selectedMainId = uploadedSelected.id;
            }
            if (!selectedMainId && combinedPhotos.length) {
                selectedMainId = combinedPhotos[0].id;
            }

            const photosPayload = combinedPhotos
                .filter(p => p && p.id)
                .map(p => ({ id: p.id, isMain: p.id === selectedMainId }));

            if (photosPayload.length) {
                await UserPageOfferService.updateOffer(Number(id), { photos: photosPayload });
            }

            if (uploadedPhotos.length) {
                setPhotos(prev => {
                    const uploadedAsLocal = uploadedPhotos.map(up => ({ ...up, isMain: up.id === selectedMainId }));
                    const existingUpdated = prev.map(p => ({ ...p, isMain: p.id === selectedMainId }));
                    return [...existingUpdated, ...uploadedAsLocal];
                });
            } else {
                setPhotos(prev => prev.map(p => ({ ...p, isMain: p.id === selectedMainId })));
            }

            navigate(`/user/offers/${id}`);
        } catch (err) {
            console.error("Update error:", err);
            setError(err?.message || String(err) || "Error updating offer");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading offer...</div>;
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
                    onClick={() => navigate("/user/my-account")}
                >
                    My account
                    <img src="/icons/user.png" alt="user icon" style={{ width: 20, height: 20 }} />
                </button>
            </div>

            <div style={{ padding: "16px", maxWidth: 900, margin: "0 auto" }}>
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
                        Edit Offer {advertisement?.id ? `${advertisement.id}` : ""}
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
                                {errors.title && <span style={{ color: "red" }}>{errors.title}</span>}
                            </div>

                            <div style={{ marginBottom: 12, display: "flex", flexDirection: "column" }}>
                                <label>Phone Number:</label>
                                <input
                                    value={advertisement?.phoneNumber || ""}
                                    onChange={e => setAdvertisement({ ...advertisement, phoneNumber: e.target.value })}
                                    style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                                />
                                {errors.phoneNumber && <span style={{ color: "red" }}>{errors.phoneNumber}</span>}
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
                                                    top: "50%",
                                                    left: "100%",
                                                    marginLeft: 8,
                                                    transform: "translateY(-50%)",
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
                                {errors.googlePlaceId && <span style={{ color: "red" }}>{errors.googlePlaceId}</span>}
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
                                            value={f.name === "hasWarranty" ? (vehicle.hasWarranty ? "Yes" : "No") : (vehicle[f.name] ?? "")}
                                            onChange={handleVehicleChange}
                                            disabled={f.disabled}
                                            style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                                        >
                                            <option value="">-- select --</option>
                                            {(f.options || []).map(opt => <option key={opt} value={opt}>{formatOptionLabel(opt)}</option>)}
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
                                    {errors[f.name] && <span style={{ color: "red" }}>{errors[f.name]}</span>}
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
                                                    top: "50%",
                                                    left: "100%",
                                                    marginLeft: 8,
                                                    transform: "translateY(-50%)",
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

                                {photos.length === 0 && files.length === 0 && (
                                    <div
                                        style={{
                                            marginTop: 8,
                                            width: 200,
                                            height: 120,
                                            background: "#fff",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: 6,
                                            overflow: "hidden"
                                        }}
                                    >
                                        <img
                                            src="/icons/camera.png"
                                            alt="No existing photos"
                                            style={{ width: 48, height: 48, opacity: 0.8 }}
                                        />
                                    </div>
                                )}

                                {photos.map((p, idx) => (
                                    <div key={p.id ?? idx} style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12 }}>
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
                                                onError={e => e.currentTarget.style.display = 'none'}
                                            />
                                            <input
                                                type="checkbox"
                                                checked={!!p.isMain}
                                                onChange={() => {
                                                    setPhotos(prev => prev.map((ph, i) => ({ ...ph, isMain: i === idx })));
                                                    setVehicle(v => ({ ...v, mainFileIndex: -1 }));
                                                }}
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
                                                height: 30,
                                            }}
                                        >
                                            <img src="/icons/trash.png" alt="Remove" style={{ width: 16, height: 16 }} />
                                            Remove
                                        </button>
                                    </div>
                                ))}

                                {files.length > 0 && (
                                    <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
                                        {files.map((f, idx) => (
                                            <div key={f.name + "_" + f.lastModified + "_" + idx} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                                <div style={{ position: "relative" }}>
                                                    <img
                                                        src={URL.createObjectURL(f)}
                                                        alt={f.name}
                                                        style={{
                                                            width: 200,
                                                            height: 140,
                                                            objectFit: "cover",
                                                            borderRadius: 4,
                                                            border: vehicle.mainFileIndex === idx ? "2px solid #8b0000" : "1px solid #ccc",
                                                        }}
                                                    />
                                                    <input
                                                        type="checkbox"
                                                        checked={vehicle.mainFileIndex === idx}
                                                        onChange={() => {
                                                            setVehicle(v => ({ ...v, mainFileIndex: idx }));
                                                            setPhotos(prev => prev.map(p => ({ ...p, isMain: false })));
                                                        }}
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
                                                        height: 30,
                                                    }}
                                                >
                                                    <img src="/icons/trash.png" alt="Remove" style={{ width: 16, height: 16 }} />
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <button
                                    type="button"
                                    onClick={() => document.getElementById("fileInput").click()}
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
                                        marginTop: 12,
                                        width: 120,
                                        justifyContent: "left",
                                    }}
                                >
                                    <img src="/icons/plus.png" alt="add" style={{ width: 16, height: 16 }} />
                                    Add photo
                                </button>
                                <input
                                    id="fileInput"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFilesChange}
                                    style={{ display: "none" }}
                                />

                                {errors.photos && <div style={{ color: "red" }}>{errors.photos}</div>}
                            </div>

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
                                    onClick={() => navigate("/user/offers")}
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

export default UserPageOfferEditForm;
