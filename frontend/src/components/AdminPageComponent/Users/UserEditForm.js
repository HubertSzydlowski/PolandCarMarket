import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminPageUserService from "../../../services/AdminPageServices/AdminPageUserService";

const AdminUserEditForm = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await AdminPageUserService.getUserById(userId);
                setFormData(data);
            } catch (err) {
                console.error("Error fetching user:", err);
                setError("Failed to load user data.");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData, enabled: !!formData.enabled };
            if (!payload.password) delete payload.password;

            await AdminPageUserService.updateUser(userId, payload);

            navigate(`/admin/users/${userId}`);
        } catch (err) {
            console.error("Error saving user data:", err);
            setError("An error occurred while saving.");
        }
    };

    if (loading) return <div style={{ padding: 16 }}>Loading user data...</div>;
    if (error) return <div style={{ color: "red", padding: 16 }}>{error}</div>;
    if (!formData) return null;

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

    const formRow = { marginBottom: 12, display: "flex", flexDirection: "column" };
    const inputStyle = { padding: "8px", borderRadius: 4, border: "1px solid #ccc" };
    const buttonRow = { display: "flex", gap: 12, marginTop: 16 };
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
            <div style={{
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
                zIndex: 10
            }}>
                <div style={{ fontWeight: "bold", fontSize: "1.2rem", cursor: "pointer" }}
                     onClick={() => navigate("/offers")}>PCM</div>
                <button style={{
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
                }} onClick={() => navigate("/my-account")}>
                    My account
                    <img src="/icons/user.png" alt="user icon" style={{ width: 20, height: 20 }} />
                </button>
            </div>

            <div style={{ padding: "16px", maxWidth: 1100, margin: "0 auto" }}>
                <div style={containerStyle}>
                    <div style={headerStyle}>
                        <img src="/icons/user.png" alt="User" style={{ width: 20, height: 20 }} />
                        Edit User {userId}
                    </div>
                    <div style={bodyStyle}>
                        <form onSubmit={handleSubmit}>
                            <div style={formRow}>
                                <label>Email:</label>
                                <input type="email" name="email" value={formData.email || ""} onChange={handleChange} required style={inputStyle}/>
                            </div>
                            <div style={formRow}>
                                <label>Username:</label>
                                <input type="text" name="username" value={formData.username || ""} onChange={handleChange} required style={inputStyle}/>
                            </div>
                            <div style={formRow}>
                                <label>Role:</label>
                                <select name="role" value={formData.role || ""} onChange={handleChange} style={inputStyle}>
                                    <option value="ADMIN">ADMIN</option>
                                    <option value="USER">USER</option>
                                    <option value="GUEST">GUEST</option>
                                </select>
                            </div>
                            <div style={formRow}>
                                <label>
                                    <input type="checkbox" name="enabled" checked={!!formData.enabled} onChange={handleChange}/>
                                    Active account
                                </label>
                            </div>
                            <div style={buttonRow}>
                                <button type="submit" style={buttonStyle}>
                                    <img src="/icons/save.png" alt="save" style={{ width: 16, height: 16 }}/>
                                    Save
                                </button>
                                <button type="button" onClick={() => navigate(`/admin/users/details/${userId}`)}
                                        style={{ ...buttonStyle, backgroundColor: "#555" }}>
                                    <img src="/icons/cancel.png" alt="cancel" style={{ width: 16, height: 16 }}/>
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

export default AdminUserEditForm;
