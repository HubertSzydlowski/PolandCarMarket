import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserPageOfferService from "../../../services/UserPageServices/UserPageOfferService";

const UserPageOfferDeleteButton = ({ id, onDeleted }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!id) {
            alert("Brak id ogłoszenia do usunięcia.");
            return;
        }
        if (!window.confirm("Czy na pewno chcesz usunąć to ogłoszenie?")) return;

        setLoading(true);
        try {
            await UserPageOfferService.deleteOffer(Number(id));
            // sukces
            alert("Ogłoszenie zostało usunięte.");
            if (typeof onDeleted === "function") {
                try { onDeleted(id); } catch (err) { console.warn("onDeleted callback error", err); }
            }
            navigate("/user/offers");
        } catch (err) {
            console.error("Delete error (UserPageOfferDeleteButton):", err);
            const msg = (err && err.message) ? err.message : "Nie udało się usunąć ogłoszenia.";
            alert(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            style={{
                marginTop: 12,
                backgroundColor: "#c62828",
                color: "white",
                border: "none",
                padding: "8px 12px",
                cursor: loading ? "not-allowed" : "pointer"
            }}
            title="Usuń ogłoszenie (usuwa wszystkie powiązane pojazdy i zdjęcia)"
        >
            {loading ? "Usuwanie..." : "Usuń ogłoszenie"}
        </button>
    );
};

export default UserPageOfferDeleteButton;
