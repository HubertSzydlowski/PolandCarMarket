import React from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../UserComponent/Auth/LogoutButton";

const UserMyAccount = () => {
    const navigate = useNavigate();

    const buttonStyle = {
        backgroundColor: "#8b0000",
        color: "white",
        border: "none",
        padding: "0.75rem 1.5rem",
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "1.25rem",
        marginBottom: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        minWidth: "250px",
    };

    return (
        <div>
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

                <LogoutButton>
                    {(handleLogout) => (
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
                                gap: 6,
                            }}
                            onClick={handleLogout}
                        >
                            Logout
                            <img
                                src="/icons/logout.png"
                                alt="logout"
                                style={{ width: 20, height: 20 }}
                            />
                        </button>
                    )}
                </LogoutButton>
            </div>

            <div
                style={{
                    padding: "2rem",
                    fontSize: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                }}
            >
                <button
                    style={{ ...buttonStyle, justifyContent: "flex-start", gap: 12 }}
                    onClick={() => navigate("/user/dashboard")}
                >
                    <img src="/icons/dashboard.png" alt="dashboard" style={{ width: 24, height: 24 }} />
                    <span>User Dashboard</span>
                </button>
                <button
                    style={{ ...buttonStyle, justifyContent: "flex-start", gap: 12 }}
                    onClick={() => navigate("/user/favorites")}
                >
                    <img src="/icons/star.png" alt="favorites" style={{ width: 24, height: 24 }} />
                    <span>Favourites Offers</span>
                </button>
                <button
                    style={{ ...buttonStyle, justifyContent: "flex-start", gap: 12 }}
                    onClick={() => navigate("/user/offers")}
                >
                    <img src="/icons/offer.png" alt="offers" style={{ width: 24, height: 24 }} />
                    <span>Offer Management</span>
                </button>
            </div>
        </div>
    );
};

export default UserMyAccount;
