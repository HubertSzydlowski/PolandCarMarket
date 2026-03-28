import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OfferService from "../../../services/OfferServices/OfferService";
import { brandModels } from "../../../services/VehicleServices/vehicleService";

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

const AdminOfferCreateForm = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [userId, setUserId] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [googlePlaceId, setGooglePlaceId] = useState("");

    const [vehicle, setVehicle] = useState(initialVehicle);

    const [files, setFiles] = useState([]);
    const [mainIndex, setMainIndex] = useState(null);

    const [uploader, setUploader] = useState("");

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [showTooltip, setShowTooltip] = useState(false);
    const [showPhotosTooltip, setShowPhotosTooltip] = useState(false);

    const brands = Object.keys(brandModels || {});

    const handleVehicleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setVehicle((prev) => {
            if (name === "brand") {
                return { ...prev, brand: value, model: "" };
            }
            if (type === "checkbox") return { ...prev, [name]: checked };
            return { ...prev, [name]: value };
        });
    };

    const handleFilesChange = (e) => {
        const selected = Array.from(e.target.files || []);
        if (selected.length === 0) return;

        setFiles((prev) => {
            const combined = [...prev, ...selected];
            if (mainIndex === null || mainIndex === undefined) {
                setMainIndex(0);
            } else if (mainIndex >= combined.length) {
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
            } else {
                if (mainIndex !== null) {
                    if (idx === mainIndex) {
                        setMainIndex(0);
                    } else if (idx < mainIndex) {
                        setMainIndex((mi) => mi - 1);
                    }
                }
            }
            return next;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const newErrors = {};
        if (!title.trim()) newErrors.general = "Title is required.";
        if (!userId || isNaN(Number(userId))) newErrors.general = "Valid User ID (number) is required.";
        if (!uploader || !uploader.trim()) newErrors.general = "Uploader (username) must be provided.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        try {
            const advertisementDto = {
                title: title.trim(),
                userId: Number(userId),
                phoneNumber: phoneNumber ? phoneNumber.trim() : null,
                googlePlaceId: googlePlaceId ? googlePlaceId.trim() : null,
            };

            const vehicleDto = {
                brand: vehicle.brand || null,
                model: vehicle.model || null,
                year: vehicle.year ? Number(vehicle.year) : null,
                price: vehicle.price ? Number(vehicle.price) : null,
                fuelType: vehicle.fuelType || null,
                transmission: vehicle.transmission || null,
                color: vehicle.color || null,
                mileage: vehicle.mileage ? Number(vehicle.mileage) : null,
                power: vehicle.power ? Number(vehicle.power) : null,
                seats: vehicle.seats ? Number(vehicle.seats) : null,
                description: vehicle.description || null,
                vin: vehicle.vin || null,
                condition: vehicle.condition || null,
                hasWarranty: !!vehicle.hasWarranty,
            };

            const effectiveMain = mainIndex === null && files.length > 0 ? 0 : mainIndex;
            const photos = files.map((f, idx) => ({
                file: f,
                isMain: effectiveMain === idx,
            }));

            const result = await OfferService.createOffer({
                advertisementDto,
                vehicle: vehicleDto,
                photos,
                uploader: uploader.trim(),
            });

            const adId = result?.advertisement?.id;
            if (adId) {
                navigate(`/admin/offers/${adId}`);
            } else {
                navigate("/admin/offers");
            }
        } catch (err) {
            console.error("Create offer error:", err);
            setErrors({ general: err?.message || "Error creating offer" });
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
                    onClick={() => navigate("/admin/offers")}
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
                    onClick={() => navigate("/admin/my-account")}
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
                            </div>

                            <div style={{ marginBottom: 12, display: "flex", flexDirection: "column" }}>
                                <label>User ID:</label>
                                <input
                                    type="number"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    required
                                    style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                                />
                            </div>

                            <div style={{ marginBottom: 12, display: "flex", flexDirection: "column" }}>
                                <label>Phone Number:</label>
                                <input
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
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
                            </div>

                            <div style={{ marginBottom: 12, display: "flex", flexDirection: "column" }}>
                                <label>Brand:</label>
                                <select
                                    name="brand"
                                    value={vehicle.brand}
                                    onChange={handleVehicleChange}
                                    style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                                >
                                    <option value="">-- select brand --</option>
                                    {brands.map((b) => (
                                        <option key={b} value={b}>{b}</option>
                                    ))}
                                </select>
                            </div>

                            <div style={{ marginBottom: 12, display: "flex", flexDirection: "column" }}>
                                <label>Model:</label>
                                <select
                                    name="model"
                                    value={vehicle.model}
                                    onChange={handleVehicleChange}
                                    disabled={!vehicle.brand}
                                    style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                                >
                                    <option value="">-- select model --</option>
                                    {vehicle.brand &&
                                        (brandModels[vehicle.brand] || []).map((m) => (
                                            <option key={m} value={m}>{m.replace(/_/g, " ")}</option>
                                        ))}
                                </select>
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
                                    onClick={() => document.getElementById("adminFileInput").click()}
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
                                    id="adminFileInput"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFilesChange}
                                    style={{ display: "none" }}
                                />

                                {errors.photos && <span style={{ color: "red" }}>{errors.photos}</span>}
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
                                    onClick={() => navigate("/admin/offers")}
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

export default AdminOfferCreateForm;