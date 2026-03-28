import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import tokenManager from "../../services/TokenManager";
import { useNavigate } from "react-router-dom";
import { brandModels } from "../../services/VehicleServices/vehicleService";


const BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

function buildFullPhotoUrl(photo) {
    if (!photo || !photo.photoUrl) return null;
    if (photo.photoUrl.startsWith("http")) return photo.photoUrl;
    return `${BASE}/photos/${photo.photoUrl}`;
}

function capitalize(str) {
    if (!str) return "—";
    return String(str).charAt(0).toUpperCase() + String(str).slice(1).toLowerCase();
}

async function tryFetchVehicleByAdvertisement(adId) {
    if (!adId) return null;

    try {
        const res = await fetch(`${BASE}/vehicles/by-advertisement/${adId}`, {
            credentials: "include",
            headers: { "Content-Type": "application/json"},
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
            headers: { "Content-Type": "application/json"},
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
            headers: { "Content-Type": "application/json"},
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
            headers: { "Content-Type": "application/json"},
        });
        if (!r2.ok) return [];
        const j = await r2.json();
        return Array.isArray(j) ? j : j?.content || j?.items || [];
    } catch {
        return [];
    }
}

async function tryFetchUserById(userId) {
    if (!userId) return null;

    try {
        const r = await fetch(`${BASE}/users/${encodeURIComponent(userId)}`, {
            credentials: "include",
            headers: {"Content-Type": "application/json"},
        });
        if (r.ok) {
            const j = await r.json();
            return j || null;
        }
    } catch (e) {
    }

    try {
        const r2 = await fetch(`${BASE}/users?userId=${encodeURIComponent(userId)}`, {
            credentials: "include",
            headers: {"Content-Type": "application/json"},
        });
        if (r2.ok) {
            const j2 = await r2.json();
            if (Array.isArray(j2)) return j2[0] || null;
            const arr = Array.isArray(j2) ? j2 : j2?.content || j2?.items;
            if (Array.isArray(arr)) return arr[0] || null;
            return (j2 && typeof j2 === "object") ? j2 : null;
        }
    } catch (e) {
    }

    return null;
}

const OfferDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [advertisement, setAdvertisement] = useState(null);
    const [vehicle, setVehicle] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [mainPhoto, setMainPhoto] = useState(null);
    const [lightboxSrc, setLightboxSrc] = useState(null);
    const [ownerEmail, setOwnerEmail] = useState(null);

    const mapRef = useRef(null);
    const thumbsRef = useRef(null);

    useEffect(() => {
        let mounted = true;

        const load = async () => {
            setLoading(true);
            setError(null);
            setAdvertisement(null);
            setVehicle(null);
            setPhotos([]);
            setMainPhoto(null);
            setLightboxSrc(null);

            try {
                const adRes = await fetch(`${BASE}/advertisements/${id}`, {
                    credentials: "include",
                    headers: { "Content-Type": "application/json"},
                });
                if (!adRes.ok) throw new Error(`Advertisement fetch failed: ${adRes.status}`);
                const adJson = await adRes.json();

                const veh = await tryFetchVehicleByAdvertisement(id);

                let photosArr = [];
                if (veh?.id) {
                    photosArr = await tryFetchPhotosByVehicle(veh.id);
                    photosArr = photosArr.map(p => ({ ...p, fullPhotoUrl: buildFullPhotoUrl(p) }));
                }

                let resolvedOwnerEmail = null;
                if (adJson && adJson.user && adJson.user.email) {
                    resolvedOwnerEmail = adJson.user.email;
                } else {
                    const possibleUserId = adJson?.userId ?? adJson?.user?.id ?? adJson?.ownerId ?? null;
                    if (possibleUserId) {
                        try {
                            const userObj = await tryFetchUserById(possibleUserId);
                            if (userObj && (userObj.email || userObj.username || userObj.mail)) {
                                resolvedOwnerEmail = userObj.email || userObj.mail || null;
                            }
                        } catch (e) {
                            console.warn("Failed to fetch owner user for email", e);
                        }
                    }
                }
                if (mounted) setOwnerEmail(resolvedOwnerEmail);

                if (!mounted) return;
                setAdvertisement(adJson);
                setVehicle(veh);
                setPhotos(photosArr);
            } catch (e) {
                console.error(e);
                if (mounted) setError(e.message || "Error loading offer");
            } finally {
                if (mounted) setLoading(false);
            }
        };

        load();
        return () => { mounted = false; };
    }, [id]);

    useEffect(() => {
        if (!photos || photos.length === 0) {
            setMainPhoto(null);
            return;
        }
        const main = photos.find(p => p.isMain) || photos[0];
        setMainPhoto(main);
        setTimeout(() => {
            if (!thumbsRef.current || !main) return;
            const thumbNode = thumbsRef.current.querySelector(`[data-photo-id="${main.id ?? main.fullPhotoUrl}"]`);
            if (thumbNode) {
            }
        }, 100);
    }, [photos]);

    useEffect(() => {
        if (!advertisement?.googlePlaceId) return;

        const match = advertisement.googlePlaceId.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
        if (!match) return;

        const lat = parseFloat(match[1]);
        const lng = parseFloat(match[2]);

        if (!window.google || !mapRef.current) return;

        const map = new window.google.maps.Map(mapRef.current, {
            center: { lat, lng },
            zoom: window.innerWidth <= 768 ? 13 : 14,
        });

        new window.google.maps.Marker({
            map,
            position: { lat, lng },
            title: advertisement.title || "Location",
        });

        map.addListener("click", () => {
            const destination = `${lat},${lng}`;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(pos => {
                    const origin = `${pos.coords.latitude},${pos.coords.longitude}`;
                    window.open(`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`, "_blank");
                }, () => {
                    window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`, "_blank");
                });
            } else {
                window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`, "_blank");
            }
        });
    }, [advertisement]);

    if (loading) return <div style={{ padding: 16 }}>Loading offer...</div>;
    if (error) return <div style={{ color: "red", padding: 16 }}>{error}</div>;
    if (!advertisement) return <div style={{ padding: 16 }}>Offer not found.</div>;

    const copyId = async () => { try { await navigator.clipboard.writeText(String(advertisement.id)); alert("ID copied!"); } catch { alert("Failed to copy ID"); } };
    const copyPhone = async () => { try { await navigator.clipboard.writeText(String(advertisement.phoneNumber)); alert("Phone number copied!"); } catch { alert("Failed to copy phone number"); } };
    const copyEmail = async () => {
        if (!ownerEmail) { alert("No email available"); return; }
        try {
            await navigator.clipboard.writeText(String(ownerEmail));
            alert("Email copied!");
        } catch {
            alert("Failed to copy email");
        }
    };

    const currentIndex = mainPhoto ? photos.findIndex(p => (p.id ?? p.fullPhotoUrl) === (mainPhoto.id ?? mainPhoto.fullPhotoUrl)) : -1;
    const goPrev = () => { if (!photos || photos.length === 0) return; setMainPhoto(photos[(currentIndex <= 0) ? photos.length - 1 : currentIndex - 1]); };
    const goNext = () => { if (!photos || photos.length === 0) return; setMainPhoto(photos[(currentIndex < 0 || currentIndex >= photos.length - 1) ? 0 : currentIndex + 1]); };

    const normalizeKey = (s) => s?.toString().replace(/[_\s]+/g, "").toLowerCase();

    const capitalizeWords = (str) => {
        if (!str) return "—";
        return String(str)
            .replace(/_/g, " ")
            .split(" ")
            .filter(Boolean)
            .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(" ");
    };

    const formatBrand = (rawBrand) => {
        if (!rawBrand) return "—";
        const foundKey = Object.keys(brandModels || {}).find(k => normalizeKey(k) === normalizeKey(rawBrand));
        if (foundKey) return capitalizeWords(foundKey);
        return capitalizeWords(rawBrand);
    };

    const formatModel = (rawModel, rawBrand) => {
        if (!rawModel) return "—";
        const brandKey = Object.keys(brandModels || {}).find(k => normalizeKey(k) === normalizeKey(rawBrand));
        if (brandKey && Array.isArray(brandModels[brandKey])) {
            const foundModel = brandModels[brandKey].find(m => normalizeKey(m) === normalizeKey(rawModel));
            if (foundModel) return capitalizeWords(foundModel);
        }
        return capitalizeWords(rawModel);
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
                    onClick={() => navigate("/my-account")}
                >
                    My account
                    <img src="/icons/user.png" alt="user icon" style={{ width: 20, height: 20 }} />
                </button>
            </div>

            <div style={{ padding: "0 16px 16px 16px", maxWidth: 1100, margin: "0 auto" }}>
                <header style={{ margin: "16px 0 12px 0", borderRadius: 8, overflow: "hidden" }}>
                    <div style={{ backgroundColor: "#8b0000", color: "#fff", padding: 12, fontWeight: 600, fontSize: "1.5rem" }}>
                        {advertisement.title || "No title"}
                    </div>
                    <div style={{ backgroundColor: "#fff", padding: 12, display: "flex", gap: 8, alignItems: "center", border: "1px solid #e6e6e6" }}>
                        <div>Offer ID: <strong>{advertisement.id}</strong></div>
                        <button onClick={copyId} style={{ backgroundColor: '#8b0000', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: 6, cursor: 'pointer', fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                            <img src="/icons/copy.png" alt="Copy" style={{ width: 16, height: 16 }} />
                            Copy ID
                        </button>
                    </div>
                </header>

                <section style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-start" }}>
                    <div style={{ flex: "1 1 560px", minWidth: 300 }}>
                        <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", background: "#f5f5f5", boxShadow: "0 6px 18px rgba(0,0,0,0.06)" }}>
                            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", background: "#000" }}>
                                {mainPhoto ? (
                                    <>
                                        <img src={mainPhoto.fullPhotoUrl} alt="main" onClick={() => setLightboxSrc(mainPhoto.fullPhotoUrl)} style={{ width: "100%", height: 420, objectFit: "cover", display: "block", cursor: "zoom-in" }} />
                                        <button aria-label="Previous" onClick={(e) => { e.stopPropagation(); goPrev(); }} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.35)", color: "#fff", border: "none", width: 40, height: 40, borderRadius: "50%", cursor: "pointer", display: window.innerWidth <= 600 ? "none" : "inline-flex", alignItems: "center", justifyContent: "center" }}>‹</button>
                                        <button aria-label="Next" onClick={(e) => { e.stopPropagation(); goNext(); }} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.35)", color: "#fff", border: "none", width: 40, height: 40, borderRadius: "50%", cursor: "pointer", display: window.innerWidth <= 600 ? "none" : "inline-flex", alignItems: "center", justifyContent: "center" }}>›</button>
                                    </>
                                ) : <div
                                    style={{
                                        width: "100%",
                                        height: 420,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        background: "#fff",
                                        borderRadius: 6,
                                        overflow: "hidden"
                                    }}
                                >
                                    <img
                                        src="/icons/picture.png"
                                        alt="No photo"
                                        style={{ width: 64, height: 64, opacity: 0.8 }}
                                    />
                                </div>
                                }
                            </div>
                            <div ref={thumbsRef} style={{ display: "flex", gap: 8, overflowX: "auto", padding: 10, background: "#fff" }}>
                                {photos.map((p, idx) => {
                                    const key = p.id ?? p.fullPhotoUrl;
                                    const isActive = mainPhoto && ((mainPhoto.id ?? mainPhoto.fullPhotoUrl) === key);
                                    return (
                                        <div key={key} data-photo-id={key} onClick={() => setMainPhoto(p)} style={{ minWidth: 100, height: 66, borderRadius: 6, overflow: "hidden", cursor: "pointer", boxShadow: isActive ? "0 4px 12px rgba(139,0,0,0.2)" : "0 1px 3px rgba(0,0,0,0.08)", border: isActive ? "2px solid #8b0000" : "1px solid #e6e6e6", flex: "0 0 auto" }}>
                                            <img src={p.fullPhotoUrl} alt={`thumb-${idx}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <aside style={{ width: 320, minWidth: 240 }}>
                        <div style={{ borderRadius: 8, overflow: "hidden", boxShadow: "0 6px 18px rgba(0,0,0,0.04)" }}>
                            <div style={{ backgroundColor: "#8b0000", color: "#fff", padding: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                                <img src="/icons/car.png" alt="Car" style={{ width: 20, height: 20 }} />
                                Vehicle details
                            </div>
                            <div style={{ backgroundColor: "#fff", padding: 12 }}>
                                {!vehicle ? <div style={{ color: "#666" }}><em>No associated vehicle</em></div> :
                                    <ul style={{ paddingLeft: 14, margin: 0, color: "#333" }}>
                                        <li><strong>Brand:</strong> {formatBrand(vehicle.brand)}</li>
                                        <li><strong>Model:</strong> {formatModel(vehicle.model, vehicle.brand)}</li>
                                        {vehicle.year !== undefined && <li><strong>Year:</strong> {vehicle.year}</li>}
                                        {vehicle.mileage !== undefined && <li><strong>Mileage:</strong> {vehicle.mileage} km</li>}
                                        {vehicle.price !== undefined && <li><strong>Price:</strong> {vehicle.price} PLN</li>}
                                        {vehicle.fuelType && <li><strong>Fuel:</strong> {capitalize(vehicle.fuelType)}</li>}
                                        {vehicle.transmission && <li><strong>Transmission:</strong> {capitalize(vehicle.transmission)}</li>}
                                        {vehicle.color && <li><strong>Color:</strong> {capitalize(vehicle.color)}</li>}
                                        {vehicle.seats !== undefined && <li><strong>Seats:</strong> {vehicle.seats}</li>}
                                        {vehicle.power !== undefined && <li><strong>Power:</strong> {vehicle.power} HP</li>}
                                        {vehicle.vin && <li><strong>VIN:</strong> {vehicle.vin}</li>}
                                        {vehicle.condition && <li><strong>Condition:</strong> {capitalize(vehicle.condition)}</li>}
                                        <li><strong>Warranty:</strong> {vehicle.hasWarranty ? "Yes" : "No"}</li>
                                    </ul>
                                }
                            </div>
                        </div>
                    </aside>
                </section>

                {vehicle?.description && (
                    <section style={{ marginTop: 20, borderRadius: 8, overflow: "hidden" }}>
                        <div style={{ backgroundColor: "#8b0000", color: "#fff", padding: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                            <img src="/icons/description.png" alt="Description" style={{ width: 20, height: 20 }} />
                            Vehicle description
                        </div>
                        <div style={{ backgroundColor: "#fff", padding: 12 }}>
                            <p style={{ margin: 0, whiteSpace: "pre-wrap", color: "#333" }}>{vehicle.description}</p>
                        </div>
                    </section>
                )}

                {(advertisement.phoneNumber || ownerEmail) && (
                    <section style={{ marginTop: 20, borderRadius: 8, overflow: "hidden" }}>
                        <div style={{ backgroundColor: "#8b0000", color: "#fff", padding: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                            <img src="/icons/phone.png" alt="Phone" style={{ width: 20, height: 20 }} />
                            Contact
                        </div>
                        <div
                            style={{
                                backgroundColor: "#fff",
                                padding: 12,
                                border: "1px solid #e6e6e6",
                                display: "flex",
                                flexDirection: "column",
                                gap: 10,
                            }}
                        >
                            {advertisement.phoneNumber && (
                                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                                    <div>
                                        Phone number: <strong>{advertisement.phoneNumber}</strong>
                                    </div>
                                    <button
                                        onClick={copyPhone}
                                        style={{
                                            backgroundColor: "#8b0000",
                                            color: "#fff",
                                            border: "none",
                                            padding: "6px 10px",
                                            borderRadius: 6,
                                            cursor: "pointer",
                                            fontWeight: 600,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 4,
                                        }}
                                    >
                                        <img src="/icons/copy.png" alt="Copy" style={{ width: 16, height: 16 }} />
                                        Copy number
                                    </button>
                                </div>
                            )}

                            {ownerEmail && (
                                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                                    <div>
                                        Email:{" "}
                                        <a
                                            href={`mailto:${ownerEmail}`}
                                            style={{ color: "#8b0000", fontWeight: 600, textDecoration: "none" }}
                                        >
                                            {ownerEmail}
                                        </a>
                                    </div>
                                    <button
                                        onClick={copyEmail}
                                        style={{
                                            backgroundColor: "#8b0000",
                                            color: "#fff",
                                            border: "none",
                                            padding: "6px 10px",
                                            borderRadius: 6,
                                            cursor: "pointer",
                                            fontWeight: 600,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 4,
                                        }}
                                    >
                                        <img src="/icons/copy.png" alt="Copy" style={{ width: 16, height: 16 }} />
                                        Copy email
                                    </button>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {advertisement.googlePlaceId && (
                    <section style={{ marginTop: 20, borderRadius: 8, overflow: "hidden" }}>
                        <div style={{ backgroundColor: "#8b0000", color: "#fff", padding: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                            <img src="/icons/location.png" alt="Location" style={{ width: 20, height: 20 }} />
                            Location
                        </div>
                        <div style={{ backgroundColor: "#fff", padding: 0 }}>
                            <div ref={mapRef} style={{ width: "100%", height: 300 }} />
                        </div>
                    </section>
                )}

                {lightboxSrc && (
                    <div onClick={() => setLightboxSrc(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, cursor: "zoom-out" }}>
                        <img src={lightboxSrc} alt="photo large" style={{ maxWidth: "92%", maxHeight: "92%", objectFit: "contain" }} />
                    </div>
                )}
            </div>
        </>
    );
};

export default OfferDetails;



