import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from '../../services/AdminPageServices/AdminPageDashboardService';

const AdminDashboardComponent = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        AdminDashboard()
            .then(data => setDashboardData(data))
            .catch(err => setError(err.message || 'Unknown error'));
    }, []);

    const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';

    const round = (num) => (num != null ? Math.round(num) : '—');

    if (error) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#fff" }}>
                <div style={{ backgroundColor: "#fff", padding: 24, borderRadius: 10, boxShadow: "0 6px 18px rgba(0,0,0,0.08)", maxWidth: 600, width: "100%", textAlign: "center" }}>
                    <h2 style={{ color: "red" }}>Error</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!dashboardData) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#fff" }}>
                <div style={{ backgroundColor: "#fff", padding: 24, borderRadius: 10, boxShadow: "0 6px 18px rgba(0,0,0,0.08)", maxWidth: 600, width: "100%", textAlign: "center" }}>
                    <h2>Loading admin dashboard...</h2>
                </div>
            </div>
        );
    }

    const SectionCard = ({ title, children }) => (
        <div style={{ marginBottom: 24, padding: 16, border: "1px solid #eee", borderRadius: 8, background: "#fafafa" }}>
            <h3 style={{ marginTop: 0, marginBottom: 12, color: "#8b0000" }}>{title}</h3>
            {children}
        </div>
    );

    const StatRow = ({ label, value }) => (
        <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #f0f0f0" }}>
            <span>{label}</span>
            <span style={{ fontWeight: "bold", color: "#333" }}>{value}</span>
        </div>
    );

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

            <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "100vh", backgroundColor: "#fff", padding: "40px 20px", boxSizing: "border-box" }}>
                <div style={{ width: "100%", maxWidth: 800, backgroundColor: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 6px 18px rgba(0,0,0,0.08)" }}>
                    <div style={{ backgroundColor: "#8b0000", color: "#fff", padding: "16px", fontWeight: 600, fontSize: "1.4rem", textAlign: "center" }}>
                        Admin Dashboard
                    </div>

                    <div style={{ padding: 24 }}>
                        <SectionCard title="Users">
                            <StatRow label="Total" value={dashboardData.totalUsers} />
                            <StatRow label="Active" value={dashboardData.activeUsersCount} />
                            <StatRow label="Admins" value={dashboardData.usersWithRoleAdmin} />
                            <StatRow label="Users" value={dashboardData.usersWithRoleUser} />
                            <StatRow label="Inactive" value={dashboardData.inactiveUsers} />
                        </SectionCard>

                        <SectionCard title="Advertisements and Vehicles">
                            <StatRow label="Total advertisements" value={dashboardData.totalAdvertisements} />
                            <StatRow label="Total vehicles" value={dashboardData.totalVehicles} />
                            <StatRow label="Avg ads per user" value={round(dashboardData.avgAdvertisementsPerUser)} />
                        </SectionCard>

                        <SectionCard title="Vehicles – Statistics">
                            <StatRow label="Avg price" value={`${round(dashboardData.avgVehiclePrice)} zł`} />
                            <StatRow label="Min price" value={`${round(dashboardData.minVehiclePrice)} zł`} />
                            <StatRow label="Max price" value={`${round(dashboardData.maxVehiclePrice)} zł`} />
                            <StatRow label="Median price" value={`${round(dashboardData.medianVehiclePrice)} zł`} />

                            <StatRow label="Min mileage" value={`${round(dashboardData.minVehicleMileage)} km`} />
                            <StatRow label="Max mileage" value={`${round(dashboardData.maxVehicleMileage)} km`} />
                            <StatRow label="Avg mileage" value={`${round(dashboardData.avgVehicleMileage)} km`} />

                            <StatRow label="With warranty" value={dashboardData.vehiclesWithWarranty} />
                            <StatRow label="New" value={dashboardData.newVehicles} />
                            <StatRow label="Used" value={dashboardData.usedVehicles} />
                        </SectionCard>

                        <SectionCard title="Top 5 Brands">
                            {dashboardData.top5Brands && dashboardData.top5Brands.length > 0 ? (
                                <ol>
                                    {dashboardData.top5Brands.map((brand, index) => (
                                        <li key={index}>{capitalize(brand)}</li>
                                    ))}
                                </ol>
                            ) : <p>No data</p>}
                        </SectionCard>

                        <SectionCard title="Top 5 Models">
                            {dashboardData.top5Models && dashboardData.top5Models.length > 0 ? (
                                <ol>
                                    {dashboardData.top5Models.map((model, index) => (
                                        <li key={index}>{capitalize(model)}</li>
                                    ))}
                                </ol>
                            ) : <p>No data</p>}
                        </SectionCard>

                        <SectionCard title="Users with most ads">
                            {dashboardData.usersWithMostAdvertisements && dashboardData.usersWithMostAdvertisements.length > 0 ? (
                                <ol>
                                    {dashboardData.usersWithMostAdvertisements.map((user, index) => (
                                        <li key={index}>{user}</li>
                                    ))}
                                </ol>
                            ) : <p>No data</p>}
                        </SectionCard>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardComponent;
