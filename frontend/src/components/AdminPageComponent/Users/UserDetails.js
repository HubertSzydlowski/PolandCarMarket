import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminPageUserService from "../../../services/AdminPageServices/AdminPageUserService";

const AdminUserDetails = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await AdminPageUserService.getUserById(userId);
                setUser(data);
            } catch (err) {
                console.error("Failed to load user data:", err);
                setError("Failed to load user data.");
            }
        };
        fetchUser();
    }, [userId]);

    if (error) return <div style={{ color: "red", padding: 16 }}>{error}</div>;
    if (!user) return <div style={{ padding: 16 }}>Loading user...</div>;

    const containerStyle = {
        borderRadius: 8,
        overflow: "hidden",
        boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
        marginTop: 20,
    };

    const headerStyle = {
        backgroundColor: "#8b0000",
        color: "#fff",
        padding: 12,
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        gap: 8,
    };

    const bodyStyle = {
        backgroundColor: "#fff",
        padding: 16,
    };

    const buttonRow = {
        display: "flex",
        gap: 12,
        marginTop: 16,
    };

    const buttonStyle = {
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

            <div style={{ padding: "16px", maxWidth: 1100, margin: "0 auto" }}>
                <div style={containerStyle}>
                    <div style={headerStyle}>
                        <img src="/icons/user.png" alt="User" style={{ width: 20, height: 20 }} />
                        User Details {userId}
                    </div>
                    <div style={bodyStyle}>
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                        <p><strong>Enabled:</strong> {user.enabled ? "Yes" : "No"}</p>

                        <div style={buttonRow}>
                            <button
                                onClick={() => navigate(`/admin/users/${userId}/edit`)}
                                style={buttonStyle}
                            >
                                <img src="/icons/edit.png" alt="edit" style={{ width: 16, height: 16 }} />
                                Edit user
                            </button>
                            <button
                                onClick={() => navigate(`/admin/users/${userId}/favorites`)}
                                style={buttonStyle}
                            >
                                <img src="/icons/star.png" alt="favourites" style={{ width: 16, height: 16 }} />
                                Favourites
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminUserDetails;
