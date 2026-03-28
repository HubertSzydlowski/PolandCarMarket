import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminPageFavouritesService from '../../../../services/AdminPageServices/AdminPageFavouritesService';
import tokenManager from '../../../../services/TokenManager';

const BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

function authHeaders() {
    const token = tokenManager.getAccessToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
}

async function tryFetchVehicleByAdvertisement(adId) {
    try {
        const res = await fetch(`${BASE}/vehicles/by-advertisement/${adId}`, {
            credentials: "include",
            headers: { "Content-Type": "application/json", ...authHeaders() },
        });
        if (!res.ok) return null;
        const json = await res.json();
        return Array.isArray(json) ? json[0] || null : json || null;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function tryFetchPhotosByVehicle(vehicleId) {
    if (!vehicleId) return [];
    try {
        const res = await fetch(`${BASE}/vehicle-photos/by-vehicle/${vehicleId}`, {
            credentials: "include",
            headers: { "Content-Type": "application/json", ...authHeaders() },
        });
        if (!res.ok) return [];
        const json = await res.json();
        return Array.isArray(json) ? json : json?.content || json?.items || [];
    } catch (err) {
        console.error(err);
        return [];
    }
}

function buildFullPhotoUrl(photo) {
    if (!photo || !photo.photoUrl) return null;
    if (photo.photoUrl.startsWith("http")) return photo.photoUrl;
    return `${BASE}/photos/${photo.photoUrl}`;
}

const AdminFavoritesList = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    const [allData, setAllData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newAdId, setNewAdId] = useState('');

    const normalizeFavorites = (data) => {
        if (!Array.isArray(data)) return [];
        return data.map(item => (typeof item === 'object' ? (item.id ?? item.advertisementId ?? item) : item));
    };

    const fetchFavorites = async () => {
        if (!userId) return;
        setLoading(true);
        try {
            const favData = await AdminPageFavouritesService.getFavorites(userId);
            const favIds = normalizeFavorites(favData);
            setFavorites(favIds);

            const promises = favIds.map(async (adId) => {
                const vehicle = await tryFetchVehicleByAdvertisement(adId);
                if (vehicle) {
                    const photos = await tryFetchPhotosByVehicle(vehicle.id);
                    const mainPhoto = photos.find(p => p.isMain) || photos[0] || null;
                    return {
                        advertisement: { id: adId },
                        vehicle: { ...vehicle, photos: photos.map(p => ({ ...p, fullPhotoUrl: buildFullPhotoUrl(p) })), mainPhoto: mainPhoto ? { ...mainPhoto, fullPhotoUrl: buildFullPhotoUrl(mainPhoto) } : null }
                    };
                }
                return { advertisement: { id: adId }, vehicle: null };
            });

            const resolved = await Promise.all(promises);
            setAllData(resolved);

        } catch (err) {
            console.error(err);
            setAllData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchFavorites(); }, [userId]);

    const handleRemove = async (adId) => {
        if (!window.confirm('Czy na pewno chcesz usunąć to ogłoszenie z ulubionych?')) return;
        try {
            await AdminPageFavouritesService.removeFromFavorites(userId, adId);
            await fetchFavorites();
        } catch (err) {
            console.error(err);
            alert('Nie udało się usunąć z ulubionych');
        }
    };

    const handleAdd = async () => {
        const id = (newAdId || '').toString().trim();
        if (!id) return;
        try {
            await AdminPageFavouritesService.addToFavorites(userId, id);
            setNewAdId('');
            await fetchFavorites();
        } catch (err) {
            console.error(err);
            alert('Nie udało się dodać do ulubionych');
        }
    };

    const openOffer = (adId) => window.open(`/admin/offers/${adId}`, "_blank");

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

            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px", boxSizing: "border-box" }}>
                <h2>User Favorites (ID: {userId})</h2>

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', alignItems: 'center' }}>
                    <input type="text" placeholder="Offer ID" value={newAdId} onChange={(e) => setNewAdId(e.target.value)} style={{ padding: '0.5rem', flex: 1 }} />
                    <button onClick={handleAdd} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}>
                        <img src="/icons/plus.png" alt="add icon" style={{ width: 32, height: 32 }} />
                    </button>
                </div>

                {loading && <p>Loading...</p>}
                {!loading && allData.length === 0 && <p>No favorites yet.</p>}

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "18px" }}>
                    {allData.map(({ advertisement, vehicle }) => {
                        const mainPhoto = vehicle?.mainPhoto;
                        return (
                            <li key={advertisement.id} onClick={() => openOffer(advertisement.id)}
                                style={{
                                    display: "flex",
                                    gap: "16px",
                                    alignItems: "center",
                                    border: "1px solid #ddd",
                                    borderRadius: "10px",
                                    padding: "12px",
                                    background: "#fff",
                                    width: "100%",
                                    boxSizing: "border-box",
                                    cursor: "pointer",
                                    transition: "transform 180ms ease, box-shadow 180ms ease"
                                }}
                                onMouseEnter={e => { e.currentTarget.style.transform="scale(1.03)"; e.currentTarget.style.boxShadow="0 6px 18px rgba(0,0,0,0.12)"; }}
                                onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,0.06)"; }}
                            >
                                <div style={{
                                    width: 280, maxWidth: "35%", height: 160, minWidth: 140,
                                    background: "#000", display: "flex", alignItems: "center", justifyContent: "center",
                                    flexShrink: 0, borderRadius: 6, overflow: "hidden"
                                }}>
                                    {mainPhoto ? <img src={mainPhoto.fullPhotoUrl} alt="main" style={{ width: "100%", height: "100%", objectFit: "cover" }}/> : <span style={{ color: "#fff" }}>No photo</span>}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ margin: "0 0 6px 0", fontSize: "1.1rem" }}>{vehicle ? `${vehicle.brand} ${vehicle.model}` : "—"}</h3>
                                    <p style={{ margin: "6px 0", color: "#333" }}>
                                        {vehicle
                                            ? `Rok: ${vehicle.year ?? "—"} • Cena: ${vehicle.price ? `${vehicle.price} PLN` : "—"} • Przebieg: ${vehicle.mileage ?? "—"} km • Paliwo: ${vehicle.fuelType ?? "—"}`
                                            : "No associated vehicle"}
                                    </p>
                                </div>
                                <button onClick={(e) => { e.stopPropagation(); handleRemove(advertisement.id); }} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}>
                                    <img src="/icons/trash.png" alt="delete icon" style={{ width: 28, height: 28 }} />
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default AdminFavoritesList;
