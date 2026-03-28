import React from "react";
import { useNavigate } from "react-router-dom";

const Forbidden = () => {
    const navigate = useNavigate();

    const wrapperStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#fff",
        boxSizing: "border-box",
        padding: 16,
    };

    const cardStyle = {
        width: "100%",
        maxWidth: 420,
        backgroundColor: "#fff",
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    };

    const headerStyle = {
        backgroundColor: "#8b0000",
        color: "#fff",
        padding: "16px",
        fontWeight: 600,
        fontSize: "1.2rem",
        textAlign: "center"
    };

    const bodyStyle = {
        padding: 20,
        textAlign: "center"
    };

    const btnSingle = {
        padding: "10px 16px",
        borderRadius: 6,
        border: "none",
        background: "#8b0000",
        color: "#fff",
        cursor: "pointer",
        fontWeight: "bold",
        minWidth: 160,
    };

    return (
        <div style={wrapperStyle}>
            <div style={cardStyle}>
                <div style={headerStyle}>403 — Access Denied</div>
                <div style={bodyStyle}>
                    <p style={{ margin: 0, fontSize: 16 }}>You do not have permission to view this page.</p>

                    <div style={{ marginTop: 22, display: "flex", justifyContent: "center" }}>
                        <button style={btnSingle} onClick={() => navigate("/")}>Home page</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forbidden;
