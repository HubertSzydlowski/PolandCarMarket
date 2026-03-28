import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPageUserService from '../../../services/AdminPageServices/AdminPageUserService';
import tokenManager from '../../../services/TokenManager';

const BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

function authHeaders() {
    const token = tokenManager.getAccessToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
}

const AdminUserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await AdminPageUserService.getAllUsers();
            setUsers(data);
        } catch (err) {
            console.error('Failed to load users:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        if (!window.confirm('Czy na pewno chcesz usunąć tego użytkownika?')) return;
        try {
            await AdminPageUserService.deleteUser(userId);
            setUsers(prev => prev.filter(u => u.id !== userId));
        } catch (err) {
            console.error('Failed to delete user:', err);
            alert('Nie udało się usunąć użytkownika');
        }
    };

    const openUserDetails = (userId) => navigate(`/admin/users/${userId}`);
    const openUserEdit = (userId) => navigate(`/admin/users/${userId}/edit`);
    const openUserFavorites = (userId) => navigate(`/admin/users/${userId}/favorites`);

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
                <h2>User list</h2>

                {loading && <p>Loading...</p>}
                {!loading && users.length === 0 && <p>Brak użytkowników.</p>}

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                    {users.map(user => (
                        <li
                            key={user.id}
                            onClick={() => openUserDetails(user.id)}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                border: "1px solid #ddd",
                                borderRadius: "10px",
                                padding: "12px 16px",
                                background: "#fff",
                                width: "100%",
                                boxSizing: "border-box",
                                cursor: "pointer",
                                transition: "transform 180ms ease, box-shadow 180ms ease"
                            }}
                            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.12)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)"; }}
                        >
                            <span style={{ fontWeight: 500 }}>{user.email}</span>

                            <div style={{ display: "flex", gap: "10px" }} onClick={e => e.stopPropagation()}>
                                <img
                                    src="/icons/edit.png"
                                    alt="edit"
                                    title="Edytuj użytkownika"
                                    style={{ width: 24, height: 24, cursor: "pointer" }}
                                    onClick={() => openUserEdit(user.id)}
                                />
                                <img
                                    src="/icons/trash.png"
                                    alt="delete"
                                    title="Usuń użytkownika"
                                    style={{ width: 24, height: 24, cursor: "pointer" }}
                                    onClick={() => handleDelete(user.id)}
                                />
                                <img
                                    src="/icons/star.png"
                                    alt="favorites"
                                    title="Ulubione użytkownika"
                                    style={{ width: 24, height: 24, cursor: "pointer" }}
                                    onClick={() => openUserFavorites(user.id)}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminUserList;
