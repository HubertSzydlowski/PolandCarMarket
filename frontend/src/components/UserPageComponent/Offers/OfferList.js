import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { brandModels } from "../../../services/UserPageServices/UserPageVehicleService";
import tokenManager from "../../../services/TokenManager";
import UserPageOfferService from "../../../services/UserPageServices/UserPageOfferService";

const BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

const colorOptions = ["Black","White","Gray","Red","Blue","Green","Yellow","Orange","Brown","Silver"];
const seatsOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const warrantyOptions = ["YES", "NO"];

function authHeaders() {
    const token = tokenManager.getAccessToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
}

function buildFullPhotoUrl(photo) {
    if (!photo || !photo.photoUrl) return null;
    if (photo.photoUrl.startsWith("http")) return photo.photoUrl;
    return `${BASE}/photos/${photo.photoUrl}`;
}

async function tryFetchVehicleByAdvertisement(adId) {
    try {
        const res1 = await fetch(`${BASE}/vehicles/by-advertisement/${adId}`, {
            credentials: "include",
            headers: { "Content-Type": "application/json", ...authHeaders() },
        });
        if (res1.ok) {
            const json = await res1.json();
            return Array.isArray(json) ? json[0] || null : json || null;
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
        if (!arr) return typeof json === "object" ? json : null;
        return (
            arr.find((vv) => {
                const advertIdFromVehicle = vv?.advertisementId || vv?.advertisement?.id;
                return String(advertIdFromVehicle) === String(adId);
            }) || null
        );
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
            return Array.isArray(j) ? j : j?.content || j?.items || [];
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

const UserOfferList = () => {
    const [allOffersRaw, setAllOffersRaw] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [page, setPage] = useState(0);
    const pageSize = 5;

    const [filters, setFilters] = useState({
        brand: "", model: "", year: "", minPrice: "", maxPrice: "", minMileage: "", maxMileage: "",
        fuelType: "", transmission: "", color: "", powerFrom: "", powerTo: "", seats: "", condition: "", warranty: ""
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
        setPage(0);
    };

    const [sortBy, setSortBy] = useState("");
    const [order, setOrder] = useState("asc");

    const handleSortChange = (e) => { setSortBy(e.target.value); setPage(0); };
    const handleOrderChange = (e) => { setOrder(e.target.value); setPage(0); };

    const loadAllOffers = async () => {
        setLoading(true);
        setError(null);
        try {
            const ads = await UserPageOfferService.getAllOffers(0, 1000) || [];
            const adsArray = Array.isArray(ads) ? ads : ads.content || ads.items || ads.advertisements || [];

            const resolved = await Promise.all(
                adsArray.map(async (ad) => {
                    const vehicle = await tryFetchVehicleByAdvertisement(ad.id);
                    let photos = [];
                    let mainPhoto = null;
                    if (vehicle?.id) {
                        photos = await tryFetchPhotosByVehicle(vehicle.id);
                        mainPhoto = photos.find(p => p.isMain) || photos[0] || null;
                        vehicle.photos = photos.map(p => ({ ...p, fullPhotoUrl: buildFullPhotoUrl(p) }));
                        vehicle.mainPhoto = mainPhoto ? { ...mainPhoto, fullPhotoUrl: buildFullPhotoUrl(mainPhoto) } : null;
                    }
                    return { advertisement: ad, vehicle: vehicle || null };
                })
            );

            setAllOffersRaw(resolved);
        } catch (err) {
            console.error(err);
            setError("Błąd ładowania ofert użytkownika");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadAllOffers(); }, []);

    const filteredSortedOffers = useMemo(() => {
        let arr = allOffersRaw.slice();
        const f = filters || {};

        arr = arr.filter((item) => {
            const v = item.vehicle;
            if (!v) return true;
            if (f.brand && String(v.brand) !== String(f.brand)) return false;
            if (f.model && String(v.model) !== String(f.model)) return false;
            if (f.year && Number(v.year) !== Number(f.year)) return false;
            if (f.minPrice && Number(v.price) < Number(f.minPrice)) return false;
            if (f.maxPrice && Number(v.price) > Number(f.maxPrice)) return false;
            if (f.minMileage && Number(v.mileage) < Number(f.minMileage)) return false;
            if (f.maxMileage && Number(v.mileage) > Number(f.maxMileage)) return false;
            if (f.fuelType && String(v.fuelType) !== String(f.fuelType)) return false;
            if (f.transmission && String(v.transmission) !== String(f.transmission)) return false;
            if (f.color && String(v.color) !== String(f.color)) return false;
            if (f.powerFrom && Number(v.power) < Number(f.powerFrom)) return false;
            if (f.powerTo && Number(v.power) > Number(f.powerTo)) return false;
            if (f.seats && Number(v.seats) !== Number(f.seats)) return false;
            if (f.condition && String(v.condition) !== String(f.condition)) return false;
            if (f.warranty) {
                const warrantyValue = (v.warranty === true || v.warranty === "YES") ? "YES" : "NO";
                if (warrantyValue !== f.warranty) return false;
            }
            return true;
        });

        if (sortBy) {
            arr.sort((a, b) => {
                const va = a.vehicle ? a.vehicle[sortBy] : null;
                const vb = b.vehicle ? b.vehicle[sortBy] : null;
                const na = va == null ? -Infinity : Number(va);
                const nb = vb == null ? -Infinity : Number(vb);
                if (na < nb) return order === "asc" ? -1 : 1;
                if (na > nb) return order === "asc" ? 1 : -1;
                return 0;
            });
        }

        return arr;
    }, [allOffersRaw, filters, sortBy, order]);

    const totalPages = Math.max(1, Math.ceil(filteredSortedOffers.length / pageSize));
    const pagedOffers = filteredSortedOffers.slice(page * pageSize, (page + 1) * pageSize);

    const openDetailsInNewTab = (id) => window.open(`/user/offers/${id}`, "_blank");

    useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

    const handleDeleteOffer = async (e, id) => {
        e.stopPropagation();
        if (!window.confirm("Czy na pewno chcesz usunąć to ogłoszenie?")) return;
        try {
            await UserPageOfferService.deleteOffer(id);
            setAllOffersRaw(prev => prev.filter(item => String(item.advertisement.id) !== String(id)));
            alert("Ogłoszenie zostało usunięte.");
        } catch (err) {
            console.error(err);
            alert("Nie udało się usunąć ogłoszenia.");
        }
    };

    const handleEdit = (e, id) => { e.stopPropagation(); window.open(`/user/offers/${id}/edit`, "_blank"); };

    const btnBase = {
        padding: "8px 12px",
        borderRadius: 6,
        border: "1px solid #ddd",
        background: "#fff",
        cursor: "pointer",
        minWidth: 44,
    };
    const btnPrimary = {
        ...btnBase,
        background: "#8b0000",
        color: "#fff",
        border: "1px solid rgba(0,0,0,0.06)"
    };
    const pageBtn = (active) => ({
        ...btnBase,
        fontWeight: active ? "bold" : "normal",
        textDecoration: active ? "underline" : "none",
        background: active ? "#f8f2f2" : "#fff"
    });

    const actionBtnStyle = { padding: "6px 8px", borderRadius: 6, border: "1px solid #ddd", background: "#fff", cursor: "pointer", fontSize: 14 };
    const deleteBtnStyle = { ...actionBtnStyle, background: "#8b0000", color: "#fff", border: "1px solid rgba(0,0,0,0.08)" };

    const normalizeKey = (s) => s?.toString().replace(/[_\s]+/g, "").toLowerCase();

    const capitalizeWords = (str) => {
        if (!str) return "—";
        return str
            .replace(/_/g, " ")
            .split(" ")
            .filter(Boolean)
            .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(" ");
    };

    const formatBrand = (rawBrand) => {
        if (!rawBrand) return "—";
        const foundKey = Object.keys(brandModels).find(k => normalizeKey(k) === normalizeKey(rawBrand));
        if (foundKey) return capitalizeWords(foundKey);
        return capitalizeWords(rawBrand);
    };

    const formatModel = (rawModel, rawBrand) => {
        if (!rawModel) return "—";
        const brandKey = Object.keys(brandModels).find(k => normalizeKey(k) === normalizeKey(rawBrand));
        if (brandKey && Array.isArray(brandModels[brandKey])) {
            const foundModel = brandModels[brandKey].find(m => normalizeKey(m) === normalizeKey(rawModel));
            if (foundModel) return capitalizeWords(foundModel);
        }
        return capitalizeWords(rawModel);
    };

    return (
        <div style={{ boxSizing: "border-box" }}>
            <div style={{ width: "100%", boxSizing: "border-box", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px", backgroundColor: "#8b0000", color: "white", position: "sticky", top: 0, zIndex: 10 }}>
                <div style={{ fontWeight: "bold", fontSize: "1.2rem", cursor: "pointer" }} onClick={() => navigate("/offers")}>PCM</div>
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
                        gap: 10
                    }}
                    onClick={() => navigate("/my-account")}
                >
                    My account
                    <img src="/icons/user.png" alt="user icon" style={{ width: 20, height: 20 }} />
                </button>
            </div>

            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", boxSizing: "border-box" }}>
                <div style={{ height: 16 }} />

                {(() => {
                    const cardOuter = {
                        marginBottom: 16,
                        borderRadius: 8,
                        overflow: "hidden",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.04)"
                    };
                    const header = {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#8b0000",
                        color: "#fff",
                        padding: 12,
                        fontWeight: 600
                    };
                    const inner = {
                        background: "#ffffff",
                        padding: 12,
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                        border: "1px solid rgba(0,0,0,0.04)"
                    };
                    const labelStyle = { display: "flex", alignItems: "center", gap: 8, fontSize: "0.95rem", color: "#222" };
                    const fieldBase = {
                        padding: "8px 10px",
                        borderRadius: 8,
                        border: "1px solid #000",
                        backgroundColor: "#ffffff",
                        boxShadow: "none",
                        transition: "box-shadow 180ms ease, border-color 180ms ease",
                        fontSize: "0.95rem",
                        outline: "none"
                    };
                    const smallWidth = { width: 100 };
                    const midWidth = { width: 110 };
                    const brandWidth = { width: 150 };

                    const onFocus = (e) => {
                        e.currentTarget.style.boxShadow = "0 6px 18px rgba(139,0,0,0.12)";
                        e.currentTarget.style.borderColor = "#8b0000";
                    };
                    const onBlur = (e) => {
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.borderColor = "#000";
                    };

                    return (
                        <div style={cardOuter}>
                            <div style={header}>
                                <span>Filters</span>
                                <img src="/icons/filter.png" alt="filter icon" style={{ width: 20, height: 20 }} />
                            </div>

                            <div style={inner}>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
                                    <label style={labelStyle}>
                                        Brand:
                                        <select
                                            name="brand"
                                            value={filters.brand}
                                            onChange={handleFilterChange}
                                            style={{ ...fieldBase, ...brandWidth }}
                                            onFocus={onFocus}
                                            onBlur={onBlur}
                                        >
                                            <option value="">--</option>
                                            {Object.keys(brandModels).map(b => <option key={b} value={b}>{capitalizeWords(b)}</option>)}
                                        </select>
                                    </label>

                                    <label style={labelStyle}>
                                        Model:
                                        <select
                                            name="model"
                                            value={filters.model}
                                            onChange={handleFilterChange}
                                            disabled={!filters.brand}
                                            style={{ ...fieldBase, ...brandWidth, opacity: filters.brand ? 1 : 0.6 }}
                                            onFocus={onFocus}
                                            onBlur={onBlur}
                                        >
                                            <option value="">--</option>
                                            {filters.brand && brandModels[filters.brand].map(m => <option key={m} value={m}>{capitalizeWords(m)}</option>)}
                                        </select>
                                    </label>
                                </div>

                                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
                                    <label style={labelStyle}>
                                        Year from:
                                        <input
                                            name="minYear"
                                            type="number"
                                            value={filters.minYear}
                                            onChange={handleFilterChange}
                                            style={{ ...fieldBase, ...smallWidth }}
                                            onFocus={onFocus}
                                            onBlur={onBlur}
                                        />
                                    </label>

                                    <label style={labelStyle}>
                                        Year to:
                                        <input
                                            name="maxYear"
                                            type="number"
                                            value={filters.maxYear}
                                            onChange={handleFilterChange}
                                            style={{ ...fieldBase, ...smallWidth }}
                                            onFocus={onFocus}
                                            onBlur={onBlur}
                                        />
                                    </label>

                                    <label style={labelStyle}>
                                        Price from:
                                        <input
                                            name="minPrice"
                                            type="number"
                                            value={filters.minPrice}
                                            onChange={handleFilterChange}
                                            style={{ ...fieldBase, ...midWidth }}
                                            onFocus={onFocus}
                                            onBlur={onBlur}
                                        />
                                    </label>

                                    <label style={labelStyle}>
                                        Price to:
                                        <input
                                            name="maxPrice"
                                            type="number"
                                            value={filters.maxPrice}
                                            onChange={handleFilterChange}
                                            style={{ ...fieldBase, ...midWidth }}
                                            onFocus={onFocus}
                                            onBlur={onBlur}
                                        />
                                    </label>
                                </div>

                                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
                                    <label style={labelStyle}>
                                        Mileage from:
                                        <input
                                            name="minMileage"
                                            type="number"
                                            value={filters.minMileage}
                                            onChange={handleFilterChange}
                                            style={{ ...fieldBase, ...midWidth }}
                                            onFocus={onFocus}
                                            onBlur={onBlur}
                                        />
                                    </label>

                                    <label style={labelStyle}>
                                        Mileage to:
                                        <input
                                            name="maxMileage"
                                            type="number"
                                            value={filters.maxMileage}
                                            onChange={handleFilterChange}
                                            style={{ ...fieldBase, ...midWidth }}
                                            onFocus={onFocus}
                                            onBlur={onBlur}
                                        />
                                    </label>

                                    <label style={labelStyle}>
                                        Power from:
                                        <input
                                            name="powerFrom"
                                            type="number"
                                            value={filters.powerFrom}
                                            onChange={handleFilterChange}
                                            style={{ ...fieldBase, ...midWidth }}
                                            onFocus={onFocus}
                                            onBlur={onBlur}
                                        />
                                    </label>

                                    <label style={labelStyle}>
                                        Power to:
                                        <input
                                            name="powerTo"
                                            type="number"
                                            value={filters.powerTo}
                                            onChange={handleFilterChange}
                                            style={{ ...fieldBase, ...midWidth }}
                                            onFocus={onFocus}
                                            onBlur={onBlur}
                                        />
                                    </label>
                                </div>

                                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
                                    <label style={labelStyle}>
                                        Color:
                                        <select
                                            name="color"
                                            value={filters.color}
                                            onChange={handleFilterChange}
                                            style={{ ...fieldBase, ...smallWidth }}
                                            onFocus={onFocus}
                                            onBlur={onBlur}
                                        >
                                            <option value="">--</option>
                                            {colorOptions.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </label>

                                    <label style={labelStyle}>
                                        Seats:
                                        <select
                                            name="seats"
                                            value={filters.seats}
                                            onChange={handleFilterChange}
                                            style={{ ...fieldBase, ...smallWidth }}
                                            onFocus={onFocus}
                                            onBlur={onBlur}
                                        >
                                            <option value="">--</option>
                                            {seatsOptions.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </label>

                                    <label style={labelStyle}>
                                        Fuel:
                                        <select
                                            name="fuelType"
                                            value={filters.fuelType}
                                            onChange={handleFilterChange}
                                            style={{ ...fieldBase, ...smallWidth }}
                                            onFocus={onFocus}
                                            onBlur={onBlur}
                                        >
                                            <option value="">--</option>
                                            <option value="PETROL">Petrol</option>
                                            <option value="DIESEL">Diesel</option>
                                            <option value="ELECTRIC">Electric</option>
                                            <option value="HYBRID">Hybrid</option>
                                        </select>
                                    </label>

                                    <label style={labelStyle}>
                                        Transmission:
                                        <select
                                            name="transmission"
                                            value={filters.transmission}
                                            onChange={handleFilterChange}
                                            style={{ ...fieldBase, ...smallWidth }}
                                            onFocus={onFocus}
                                            onBlur={onBlur}
                                        >
                                            <option value="">--</option>
                                            <option value="MANUAL">Manual</option>
                                            <option value="AUTOMATIC">Automatic</option>
                                        </select>
                                    </label>

                                    <label style={labelStyle}>
                                        Condition:
                                        <select
                                            name="condition"
                                            value={filters.condition}
                                            onChange={handleFilterChange}
                                            style={{ ...fieldBase, ...smallWidth }}
                                            onFocus={onFocus}
                                            onBlur={onBlur}
                                        >
                                            <option value="">--</option>
                                            <option value="NEW">New</option>
                                            <option value="USED">Used</option>
                                            <option value="DAMAGED">Damaged</option>
                                        </select>
                                    </label>

                                    <label style={labelStyle}>
                                        Warranty:
                                        <select
                                            name="warranty"
                                            value={filters.warranty}
                                            onChange={handleFilterChange}
                                            style={{ ...fieldBase, ...smallWidth }}
                                            onFocus={onFocus}
                                            onBlur={onBlur}
                                        >
                                            <option value="">--</option>
                                            {warrantyOptions.map(w => (
                                                <option key={w} value={w.toLowerCase()}>
                                                    {w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                            </div>
                        </div>
                    );
                })()}

                {(() => {
                    const cardOuter = {
                        marginBottom: 16,
                        borderRadius: 8,
                        overflow: "hidden",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.04)"
                    };
                    const header = {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#8b0000",
                        color: "#fff",
                        padding: 12,
                        fontWeight: 600
                    };
                    const inner = {
                        background: "#ffffff",
                        padding: 12,
                        display: "flex",
                        gap: 12,
                        alignItems: "center",
                        border: "1px solid rgba(0,0,0,0.04)"
                    };
                    const fieldBase = {
                        padding: "8px 10px",
                        borderRadius: 8,
                        border: "1px solid #000",
                        backgroundColor: "#ffffff",
                        boxShadow: "none",
                        transition: "box-shadow 180ms ease, border-color 180ms ease",
                        fontSize: "0.95rem",
                        outline: "none"
                    };
                    const onFocus = (e) => {
                        e.currentTarget.style.boxShadow = "0 6px 18px rgba(139,0,0,0.12)";
                        e.currentTarget.style.borderColor = "#8b0000";
                    };
                    const onBlur = (e) => {
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.borderColor = "#000";
                    };

                    return (
                        <div style={cardOuter}>
                            <div style={header}>
                                <span>Sorting</span>
                                <img src="/icons/sort.png" alt="sort icon" style={{ width: 20, height: 20 }} />
                            </div>

                            <div style={inner}>
                                <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    Sort by:
                                    <select
                                        value={sortBy}
                                        onChange={handleSortChange}
                                        style={{ ...fieldBase, minWidth: 160 }}
                                        onFocus={onFocus}
                                        onBlur={onBlur}
                                    >
                                        <option value="">--</option>
                                        <option value="price">Price</option>
                                        <option value="mileage">Mileage</option>
                                        <option value="year">Year</option>
                                        <option value="power">Power</option>
                                    </select>
                                </label>

                                <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    Direction:
                                    <select
                                        value={order}
                                        onChange={handleOrderChange}
                                        style={{ ...fieldBase, minWidth: 140 }}
                                        onFocus={onFocus}
                                        onBlur={onBlur}
                                    >
                                        <option value="">--</option>
                                        <option value="asc">Ascending</option>
                                        <option value="desc">Descending</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                    );
                })()}

                {loading && <p>Loading...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {!loading && pagedOffers.length === 0 && <p>No offers.</p>}

                <div style={{ marginBottom: 20 }}>
                    <button
                        type="button"
                        onClick={() => navigate("/user/offers/create")}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            padding: "10px 18px",
                            fontWeight: "bold",
                            borderRadius: 6,
                            border: "none",
                            cursor: "pointer",
                            backgroundColor: "#8b0000",
                            color: "white",
                        }}
                    >
                        <img src="/icons/plus.png" alt="Add" style={{ width: 16, height: 16 }} />
                        Add new offer
                    </button>
                </div>

                <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:"18px", boxSizing:"border-box" }}>
                    {pagedOffers.map(({ advertisement, vehicle }) => {
                        const mainPhoto = vehicle?.mainPhoto;
                        return (
                            <li
                                key={advertisement.id}
                                role="button"
                                tabIndex={0}
                                onClick={() => openDetailsInNewTab(advertisement.id)}
                                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openDetailsInNewTab(advertisement.id); } }}
                                style={{ display:"flex", gap:"16px", alignItems:"center", border:"1px solid #ddd", borderRadius:"10px", padding:"12px", background:"#fff", width:"100%", boxSizing:"border-box", cursor:"pointer", transition:"transform 180ms ease, box-shadow 180ms ease", boxShadow:"0 1px 4px rgba(0,0,0,0.06)", transformOrigin:"center" }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.12)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)"; }}
                            >
                                <div style={{ width: 280, maxWidth: "35%", height: 160, minWidth: 140, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, borderRadius: 6, overflow: "hidden" }}>
                                    {mainPhoto ? (
                                        <img
                                            src={mainPhoto.fullPhotoUrl}
                                            alt="main"
                                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                                        />
                                    ) : (
                                        <img
                                            src="/icons/picture.png"
                                            alt="No photo"
                                            style={{ width: 48, height: 48, opacity: 0.8 }}
                                        />
                                    )}
                                </div>
                                <div style={{ flex: 1, boxSizing: "border-box" }}>
                                    <h3 style={{ margin: "0 0 6px 0", fontSize: "1.1rem" }}>{advertisement.title}</h3>
                                    <p style={{ margin: "6px 0", color: "#333" }}>
                                        {vehicle
                                            ? `${formatBrand(vehicle.brand)} ${formatModel(vehicle.model, vehicle.brand)} — Year: ${vehicle.year ?? "—"} • Price: ${vehicle.price ? `${vehicle.price} PLN` : "—"} • Mileage: ${vehicle.mileage ?? "—"} km • Fuel: ${vehicle.fuelType?.charAt(0).toUpperCase() + vehicle.fuelType?.slice(1).toLowerCase() || "—"}`
                                            : "No associated vehicle"}
                                    </p>
                                </div>
                                <div style={{ display:"flex", gap:8, alignItems:"center", flexShrink:0 }}>
                                    <button type="button" title="Edit advertisement" aria-label="Edit" onClick={(e) => handleEdit(e, advertisement.id)} style={actionBtnStyle}><img src="/icons/edit.png" alt="Edit" style={{ width: 16, height: 16 }} /></button>
                                    <button type="button" title="Delete advertisement" aria-label="Delete" onClick={(e) => handleDeleteOffer(e, advertisement.id)} style={deleteBtnStyle}><img src="/icons/trash.png" alt="Delete" style={{ width: 16, height: 16 }} /></button>
                                </div>
                            </li>
                        );
                    })}
                </ul>

                <div style={{ marginTop:20, display:"flex", justifyContent:"center", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                    <button onClick={() => setPage(0)} disabled={page <= 0} style={page <= 0 ? { ...btnBase, opacity: 0.5, cursor: "not-allowed" } : btnBase}>First</button>
                    <button onClick={() => setPage(page - 1)} disabled={page <= 0} style={page <= 0 ? { ...btnBase, opacity: 0.5, cursor: "not-allowed" } : btnBase}>Previous</button>

                    {(() => {
                        const pagesToShow = 5;
                        const half = Math.floor(pagesToShow / 2);
                        let start = Math.max(0, page - half);
                        let end = Math.min(totalPages - 1, start + pagesToShow - 1);

                        if (end - start < pagesToShow - 1) {
                            start = Math.max(0, end - pagesToShow + 1);
                        }

                        const pageButtons = [];
                        if (start > 0) pageButtons.push(<span key="start-ellipsis" style={{ padding: "6px 8px" }}>...</span>);

                        for (let i = start; i <= end; i++) {
                            pageButtons.push(
                                <button
                                    key={i}
                                    onClick={() => setPage(i)}
                                    style={pageBtn(i === page)}
                                >
                                    {i + 1}
                                </button>
                            );
                        }

                        if (end < totalPages - 1) pageButtons.push(<span key="end-ellipsis" style={{ padding: "6px 8px" }}>...</span>);

                        return pageButtons;
                    })()}

                    <button onClick={() => setPage(page + 1)} disabled={page >= totalPages - 1} style={page >= totalPages - 1 ? { ...btnBase, opacity: 0.5, cursor: "not-allowed" } : btnBase}>Next</button>
                    <button onClick={() => setPage(totalPages - 1)} disabled={page >= totalPages - 1} style={page >= totalPages - 1 ? { ...btnBase, opacity: 0.5, cursor: "not-allowed" } : btnBase}>Last</button>
                </div>

                <div style={{ height: 40 }} />
            </div>
        </div>
    );
};

export default UserOfferList;
