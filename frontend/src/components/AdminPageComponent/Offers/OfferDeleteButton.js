import React from "react";
import { useNavigate } from "react-router-dom";
import AdminPageOfferService from "../../../services/AdminPageServices/AdminPageOfferService";
import tokenManager from "../../../services/TokenManager";

const AdminOfferDeleteButton = ({ id }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (!window.confirm("Czy na pewno chcesz usunąć to ogłoszenie (admin)?")) return;
        try {
            if (!tokenManager.canAccessAdminPage()) {
                alert("Brak uprawnień do usuwania ogłoszenia.");
                return;
            }

            await AdminPageOfferService.deleteOffer(id);
            alert("Ogłoszenie zostało usunięte (admin).");
            navigate("/admin/offers");
        } catch (err) {
            console.error("Delete error (admin):", err);
            alert("Nie udało się usunąć ogłoszenia.");
        }
    };

    return (
        <button
            type="button"
            style={{ marginTop: 12, backgroundColor: "red", color: "white" }}
            onClick={handleDelete}
        >
            Usuń ogłoszenie (Admin)
        </button>
    );
};

export default AdminOfferDeleteButton;
