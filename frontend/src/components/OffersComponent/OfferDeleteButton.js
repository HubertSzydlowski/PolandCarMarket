import React from "react";
import { useNavigate } from "react-router-dom";
import tokenManager from "../../services/TokenManager";

const BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

function authHeaders() {
    const token = tokenManager.getAccessToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
}

const OfferDeleteButton = ({ id }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (!window.confirm("Czy na pewno chcesz usunąć to ogłoszenie?")) return;
        try {
            const res = await fetch(`${BASE}/advertisements/${id}`, {
                method: "DELETE",
                credentials: "include",
                headers: { "Content-Type": "application/json", ...authHeaders() },
            });
            if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
            alert("Ogłoszenie zostało usunięte.");
            navigate("/offers");
        } catch (err) {
            console.error("Delete error:", err);
            alert("Nie udało się usunąć ogłoszenia.");
        }
    };

    return (
        <button
            type="button"
            onClick={handleDelete}
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
        >
            <img src="/icons/trash.png" alt="delete" style={{ width: 16, height: 16 }} />
            Delete Offer
        </button>
    );
};

export default OfferDeleteButton;
