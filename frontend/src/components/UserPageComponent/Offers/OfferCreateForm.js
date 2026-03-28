import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserPageOfferService from "../../../services/UserPageServices/UserPageOfferService";
import { brandModels } from "../../../services/UserPageServices/UserPageVehicleService";
import tokenManager from "../../../services/TokenManager";

const initialVehicle = {
    brand: "",
    model: "",
    year: "",
    price: "",
    fuelType: "",
    transmission: "",
    color: "",
    mileage: "",
    power: "",
    seats: 5,
    description: "",
    vin: "",
    condition: "",
    hasWarranty: null,
};

const colorOptions = [
    "Black", "White", "Silver", "Red", "Blue",
    "Green", "Yellow", "Orange", "Brown", "Navy"
];

function authHeaders() {
    const token = tokenManager.getAccessToken?.();
    return token ? { Authorization: `Bearer ${token}` } : {};
}

function decodeJwtPayload(token) {
    if (!token) return null;
    try {
        const payload = token.split('.')[1];
        const b64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        const json = atob(b64);
        return JSON.parse(json);
    } catch (e) {
        return null;
    }
}

const UserOfferCreateForm = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [googlePlaceId, setGooglePlaceId] = useState("");

    const [userId, setUserId] = useState("");
    const [uploader, setUploader] = useState("");

    const [vehicle, setVehicle] = useState(initialVehicle);

    const [files, setFiles] = useState([]);
    const [mainIndex, setMainIndex] = useState(null);

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [showTooltip, setShowTooltip] = useState(false);
    const [showPhotosTooltip, setShowPhotosTooltip] = useState(false);

    const brands = Object.keys(brandModels || {});

    useEffect(() => {
        try {
            const tmUser =
                tokenManager?.getUser?.() ||
                tokenManager?.getUserInfo?.() ||
                tokenManager?.getDecoded?.() ||
                decodeJwtPayload(tokenManager.getAccessToken?.()) ||
                null;

            const tmUserId =
                tmUser?.id ||
                tmUser?.userId ||
                tmUser?.sub ||
                tokenManager?.getUserId?.() ||
                null;

            const tmUsername =
                tmUser?.username ||
                tmUser?.preferred_username ||
                tmUser?.email ||
                tokenManager?.getUsername?.() ||
                null;

            if (tmUserId) setUserId(String(tmUserId));
            if (tmUsername) setUploader(String(tmUsername));
        } catch (err) {
            console.warn("tokenManager read failed:", err);
        }
    }, []);

    const handleVehicleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setVehicle((prev) => {
            if (name === "brand") return { ...prev, brand: value, model: "" };
            if (type === "checkbox") return { ...prev, [name]: checked };
            return { ...prev, [name]: value };
        });
    };

    const handleFilesChange = (e) => {
        const selected = Array.from(e.target.files || []);
        if (!selected.length) return;

        setFiles((prev) => {
            const combined = [...prev, ...selected];
            if (mainIndex === null || mainIndex === undefined || mainIndex >= combined.length) {
                setMainIndex(0);
            }
            return combined;
        });

        e.target.value = null;
    };

    const removeFileAt = (idx) => {
        setFiles((prev) => {
            const next = prev.filter((_, i) => i !== idx);
            if (next.length === 0) {
                setMainIndex(null);
            } else if (mainIndex !== null) {
                if (idx === mainIndex) setMainIndex(0);
                else if (idx < mainIndex) setMainIndex((mi) => mi - 1);
            }
            return next;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const newErrors = {};
        if (!title.trim()) newErrors.title = "Title is required.";
        if (!vehicle.brand) newErrors.brand = "Vehicle brand is required.";
        if (!vehicle.model) newErrors.model = "Vehicle model is required.";
        if (!vehicle.year) newErrors.year = "Vehicle year is required.";
        if (!vehicle.price) newErrors.price = "Vehicle price is required.";
        if (!vehicle.color) newErrors.color = "Vehicle color is required.";
        if (!vehicle.mileage) newErrors.mileage = "Vehicle mileage is required.";
        if (!vehicle.power) newErrors.power = "Vehicle power is required.";
        if (!vehicle.seats) newErrors.seats = "Number of seats is required.";
        if (!vehicle.vin) newErrors.vin = "VIN is required.";
        if (!vehicle.description) newErrors.description = "Description is required.";
        if (!files.length) newErrors.photos = "Add at least one photo.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        try {
            const vehicleDto = {
                brand: vehicle.brand,
                model: vehicle.model,
                year: Number(vehicle.year),
                price: Number(vehicle.price),
                fuelType: vehicle.fuelType || null,
                transmission: vehicle.transmission || null,
                color: vehicle.color,
                mileage: Number(vehicle.mileage),
                power: Number(vehicle.power),
                seats: Number(vehicle.seats),
                description: vehicle.description,
                vin: vehicle.vin,
                condition: vehicle.condition || null,
                hasWarranty: !!vehicle.hasWarranty,
            };

            const effectiveMain = (mainIndex === null || mainIndex === undefined) && files.length > 0 ? 0 : mainIndex;
            const photos = files.map((f, idx) => ({ file: f, isMain: effectiveMain === idx }));

            const createdOffer = await UserPageOfferService.createOffer({
                advertisementDto: { title: title.trim() },
                vehicle: vehicleDto,
                photos,
            });

            const adId = createdOffer?.advertisement?.id;
            if (!adId) throw new Error("Failed to create advertisement.");

            let vehicleId =
                createdOffer?.vehicle?.id ||
                createdOffer?.vehicleId ||
                createdOffer?.advertisement?.vehicle?.id ||
                createdOffer?.advertisement?.vehicleId ||
                null;

            if (!vehicleId && typeof UserPageOfferService.getOffer === "function") {
                try {
                    const fresh = await UserPageOfferService.getOffer(adId);
                    vehicleId = fresh?.vehicle?.id || fresh?.vehicleId || null;
                } catch (errGet) {
                    console.warn("Could not fetch created offer to obtain vehicleId:", errGet);
                }
            }

            if (!vehicleId) {
                console.warn("No vehicleId returned — skipping photo upload");
            } else if (photos.length > 0) {
                const token = tokenManager.getAccessToken?.();
                if (!token) {
                    console.warn("No access token available — cannot upload photos");
                } else {
                    const base = process.env.REACT_APP_API_BASE_URL || "";
                    const urlBase = `${base}/user-page/vehicles/${vehicleId}/photos`;

                    for (const [idx, p] of photos.entries()) {
                        const form = new FormData();
                        form.append("file", p.file);
                        form.append("isMain", String(p.isMain === true));

                        const res = await fetch(urlBase, {
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                            body: form,
                        });

                        if (!res.ok) {
                            const text = await res.text().catch(() => "");
                            console.error(`Photo upload failed (index ${idx})`, res.status, text);

                        } else {

                        }
                    }
                }
            }

            const updateAdDto = {
                title: title.trim(),
                phoneNumber: phoneNumber?.trim() || null,
                googlePlaceId: googlePlaceId?.trim() || null,
            };
            await UserPageOfferService.updateOffer(adId, {
                advertisementDto: updateAdDto,
            });

            navigate(`/user/offers/${adId}`);
        } catch (err) {
            console.error("Create user offer error:", err);
            setErrors({ general: err?.message || "Error creating user offer" });
        } finally {
            setLoading(false);
        }
    };

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
                        Create Offer
                    </div>
                    <div style={{ backgroundColor: "#fff", padding: 16 }}>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: 12, display: "flex", flexDirection: "column" }}>
                                <label>Title:</label>
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                                />
                                {errors.title && <span style={{ color: "red" }}>{errors.title}</span>}
                            </div>

                            <div style={{ marginBottom: 12, display: "flex", flexDirection: "column" }}>
                                <label>Phone Number:</label>
                                <input
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
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
                                    value={googlePlaceId}
                                    onChange={(e) => setGooglePlaceId(e.target.value)}
                                    style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc", marginTop: 4 }}
                                />
                                {errors.googlePlaceId && <span style={{ color: "red" }}>{errors.googlePlaceId}</span>}
                            </div>

                            <div style={{ marginBottom: 12, display: "flex", flexDirection: "column" }}>
                                <label>Brand:</label>
                                <select
                                    name="brand"
                                    value={vehicle.brand}
                                    onChange={handleVehicleChange}
                                    required
                                    style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                                >
                                    <option value="">-- select brand --</option>
                                    {brands.map((b) => (
                                        <option key={b} value={b}>{b}</option>
                                    ))}
                                </select>
                                {errors.brand && <span style={{ color: "red" }}>{errors.brand}</span>}
                            </div>

                            <div style={{ marginBottom: 12, display: "flex", flexDirection: "column" }}>
                                <label>Model:</label>
                                <select
                                    name="model"
                                    value={vehicle.model}
                                    onChange={handleVehicleChange}
                                    disabled={!vehicle.brand}
                                    required
                                    style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                                >
                                    <option value="">-- select model --</option>
                                    {vehicle.brand &&
                                        (brandModels[vehicle.brand] || []).map((m) => (
                                            <option key={m} value={m}>{m.replace(/_/g, " ")}</option>
                                        ))}
                                </select>
                                {errors.model && <span style={{ color: "red" }}>{errors.model}</span>}
                            </div>

                            <div style={{ marginBottom: 12, display: "flex", flexDirection: "column" }}>
                                <label>Year:</label>
                                <input
                                    type="number"
                                    name="year"
                                    value={vehicle.year}
                                    onChange={handleVehicleChange}
                                    style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                                />
                                {errors.year && <span style={{ color: "red" }}>{errors.year}</span>}
                            </div>

                            <div style={{ marginBottom: 12, display: "flex", flexDirection: "column" }}>
                                <label>Price:</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="price"
                                    value={vehicle.price}
                                    onChange={handleVehicleChange}
                                    style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                                />
                                {errors.price && <span style={{ color: "red" }}>{errors.price}</span>}
                            </div>

                            <div style={{ marginBottom: 12, display: "flex", flexDirection: "column" }}>
                                <label>Fuel Type:</label>
                                <select
                                    name="fuelType"
                                    value={vehicle.fuelType || ""}
                                    onChange={handleVehicleChange}
                                    style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                                >
                                    <option value="">-- select fuel type --</option>
                                    <option value="PETROL">Petrol</option>
                                    <option value="DIESEL">Diesel</option>
                                    <option value="ELECTRIC">Electric</option>
                                    <option value="HYBRID">Hybrid</option>
                                </select>
                            </div>

                            <div style={{ marginBottom: 12, display: "flex", flexDirection: "column" }}>
                                <label>Transmission:</label>
                                <select
                                    name="transmission"
                                    value={vehicle.transmission || ""}
                                    onChange={handleVehicleChange}
                                    style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                                >
                                    <option value="">-- select transmission --</option>
                                    <option value="MANUAL">Manual</option>
                                    <option value="AUTOMATIC">Automatic</option>
                                </select>
                            </div>

                            <div style={{ marginBottom: 12, display: "flex", flexDirection: "column" }}>
                                <label>Color:</label>
                                <select
                                    name="color"
                                    value={vehicle.color}
                                    onChange={handleVehicleChange}
                                    style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                                >
                                    <option value="">-- select color --</option>
                                    {colorOptions.map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                                {errors.color && <span style={{ color: "red" }}>{errors.color}</span>}
                            </div>

                            <div style={{ marginBottom: 12, display: "flex", flexDirection: "column" }}>
                                <label>Mileage (km):</label>
                                <input
                                    type="number"
                                    name="mileage"
                                    value={vehicle.mileage}
                                    onChange={handleVehicleChange}
                                    style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                                />
                                {errors.mileage && <span style={{ color: "red" }}>{errors.mileage}</span>}
                            </div>

                            <div style={{ marginBottom: 12, display: "flex", flexDirection: "column" }}>
                                <label>Power (HP):</label>
                                <input
                                    type="number"
                                    name="power"
                                    value={vehicle.power}
                                    onChange={handleVehicleChange}
                                    style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                                />
                                {errors.power && <span style={{ color: "red" }}>{errors.power}</span>}
                            </div>

                            <div style={{ marginBottom: 12, display: "flex", flexDirection: "column" }}>
                                <label>Seats:</label>
                                <input
                                    type="number"
                                    name="seats"
                                    value={vehicle.seats || 5}
                                    onChange={handleVehicleChange}
                                    min={1}
                                    max={9}
                                    style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                                />
                                {errors.seats && <span style={{ color: "red" }}>{errors.seats}</span>}
                            </div>

                            <div style={{ marginBottom: 12, display: "flex", flexDirection: "column" }}>
                                <label>VIN:</label>
                                <input
                                    type="text"
                                    name="vin"
                                    value={vehicle.vin}
                                    onChange={handleVehicleChange}
                                    style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                                />
                                {errors.vin && <span style={{ color: "red" }}>{errors.vin}</span>}
                            </div>

                            <div style={{ marginBottom: 12, display: "flex", flexDirection: "column" }}>
                                <label>Description:</label>
                                <textarea
                                    name="description"
                                    value={vehicle.description}
                                    rows={3}
                                    onChange={handleVehicleChange}
                                    style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                                />
                                {errors.description && <span style={{ color: "red" }}>{errors.description}</span>}
                            </div>

                            <div style={{ marginBottom: 12, display: "flex", flexDirection: "column" }}>
                                <label>Condition:</label>
                                <select
                                    name="condition"
                                    value={vehicle.condition || ""}
                                    onChange={handleVehicleChange}
                                    style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                                >
                                    <option value="">-- select condition --</option>
                                    <option value="NEW">New</option>
                                    <option value="USED">Used</option>
                                    <option value="DAMAGED">Damaged</option>
                                </select>
                            </div>

                            <div style={{ marginBottom: 12, display: "flex", flexDirection: "column" }}>
                                <label>Warranty:</label>
                                <select
                                    name="hasWarranty"
                                    value={vehicle.hasWarranty ? "Yes" : vehicle.hasWarranty === false ? "No" : ""}
                                    onChange={(e) => setVehicle(prev => ({ ...prev, hasWarranty: e.target.value === "Yes" }))}
                                    style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                                >
                                    <option value="">-- select warranty --</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>

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
                                                Use the checkbox on each photo to mark it as the main image.
                                            </div>
                                        )}
                                    </div>
                                </label>

                                {files.length === 0 ? (
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
                                            alt="No photos"
                                            style={{ width: 48, height: 48, opacity: 0.8 }}
                                        />
                                    </div>
                                ) : (
                                    <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
                                        {files.map((f, idx) => (
                                            <div key={idx} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                                <div style={{ position: "relative" }}>
                                                    <img
                                                        src={URL.createObjectURL(f)}
                                                        alt={`preview-${idx}`}
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
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        gap: 6,
                                                        padding: "4px 12px",
                                                        backgroundColor: "#8b0000",
                                                        color: "#fff",
                                                        border: "none",
                                                        borderRadius: 4,
                                                        cursor: "pointer",
                                                        fontSize: 12,
                                                        height: 30,
                                                        alignSelf: "center",
                                                    }}
                                                >
                                                    <img src="/icons/trash.png" alt="trash" style={{ width: 16, height: 16 }} />
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

                                {errors.photos && <span style={{ color: "red" }}>{errors.photos}</span>}
                            </div>

                            {errors.general && <p style={{ color: "red" }}>{errors.general}</p>}

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
                                    {loading ? "Creating..." : "Create Offer"}
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
                                    disabled={loading}
                                >
                                    <img src="/icons/cancel.png" alt="cancel" style={{ width: 16, height: 16 }} />
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserOfferCreateForm;