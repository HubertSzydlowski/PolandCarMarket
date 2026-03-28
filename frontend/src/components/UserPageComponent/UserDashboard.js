import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDashboard from '../../services/UserPageServices/UserPageDashboardService';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserDashboardComponent = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        UserDashboard()
            .then(data => setDashboardData(data))
            .catch(err => setError(err.message || 'Unknown error'));
    }, []);

    const capitalize = (str) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const parseTopList = (input) => {
        if (!input && input !== 0) return [];
        try {
            if (Array.isArray(input))
                return input.map(i => {
                    if (typeof i === 'string') {
                        const match = i.match(/(.+?)\s*\((\d+)\)$/);
                        return match
                            ? { name: capitalize(match[1]), value: parseInt(match[2]) }
                            : { name: capitalize(i), value: 0 };
                    }
                    return { name: capitalize(String(i)), value: 0 };
                });
            if (typeof input === 'object')
                return Object.entries(input).map(([k, v]) => ({ name: capitalize(k), value: v }));
            return String(input)
                .split(',')
                .map(item => item.trim())
                .filter(Boolean)
                .map(i => {
                    const match = i.match(/(.+?)\s*\((\d+)\)$/);
                    return match
                        ? { name: capitalize(match[1]), value: parseInt(match[2]) }
                        : { name: capitalize(i), value: 0 };
                });
        } catch {
            return [];
        }
    };

    const parseDistribution = (jsonStr) => {
        if (!jsonStr) return [];
        try {
            if (typeof jsonStr === 'object')
                return Object.entries(jsonStr).map(([k, v]) => ({ name: capitalize(k), value: v }));
            const parsed = JSON.parse(jsonStr);
            if (Array.isArray(parsed))
                return parsed.map(i => (typeof i === 'object' ? JSON.stringify(i) : { name: capitalize(String(i)), value: 0 }));
            if (typeof parsed === 'object')
                return Object.entries(parsed).map(([k, v]) => ({ name: capitalize(k), value: v }));
            return [{ name: capitalize(String(jsonStr)), value: 0 }];
        } catch {
            return [{ name: capitalize(String(jsonStr)), value: 0 }];
        }
    };

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
                    <h2>Loading user dashboard...</h2>
                </div>
            </div>
        );
    }

    const topBrands = parseTopList(dashboardData.top5Brands);
    const topModels = parseTopList(dashboardData.top5Models);
    const fuelTypes = parseDistribution(dashboardData.fuelTypeDistribution);
    const transmissions = parseDistribution(dashboardData.transmissionTypeDistribution);

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

    const ChartSection = ({ title, data }) => {
        if (!data || data.length === 0) return <p>No data</p>;

        const chartData = {
            labels: data.map(d => d.name),
            datasets: [
                {
                    label: title,
                    data: data.map(d => d.value),
                    backgroundColor: "#8b0000",
                },
            ],
        };

        return (
            <>
                {data.map((item, i) => (
                    <StatRow key={i} label={item.name} value={item.value} />
                ))}
                <div style={{ marginTop: 12 }}>
                    <Bar
                        data={chartData}
                        options={{
                            responsive: true,
                            plugins: { legend: { display: false } },
                            scales: {
                                x: { grid: { display: false } },
                                y: { beginAtZero: true, ticks: { precision: 0 } },
                            },
                        }}
                    />
                </div>
            </>
        );
    };

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
                        User Dashboard
                    </div>

                    <div style={{ padding: 24 }}>
                        <SectionCard title="Advertisement Prices">
                            <StatRow label="Average price" value={`${Math.round(dashboardData.avgAdvertisementPrice ?? 0)} zł`} />
                            <StatRow label="Minimum price" value={`${Math.round(dashboardData.minAdvertisementPrice ?? 0)} zł`} />
                            <StatRow label="Maximum price" value={`${Math.round(dashboardData.maxAdvertisementPrice ?? 0)} zł`} />
                            <StatRow label="Median price" value={`${Math.round(dashboardData.medianAdvertisementPrice ?? 0)} zł`} />
                        </SectionCard>

                        <SectionCard title="Vehicle Mileage">
                            <StatRow label="Average mileage" value={`${Math.round(dashboardData.avgVehicleMileage ?? 0)} km`} />
                            <StatRow label="Minimum mileage" value={`${Math.round(dashboardData.minVehicleMileage ?? 0)} km`} />
                            <StatRow label="Maximum mileage" value={`${Math.round(dashboardData.maxVehicleMileage ?? 0)} km`} />
                            <StatRow label="Vehicles with warranty" value={dashboardData.vehiclesWithWarranty ?? 0} />
                            <StatRow label="Used vehicles percentage" value={`${dashboardData.usedVsNewVehiclesPercentage ?? 0}%`} />
                        </SectionCard>

                        <SectionCard title="Top 5 Brands">
                            <ChartSection title="Top 5 Brands" data={topBrands} />
                        </SectionCard>

                        <SectionCard title="Top 5 Models">
                            <ChartSection title="Top 5 Models" data={topModels} />
                        </SectionCard>

                        <SectionCard title="Fuel Types">
                            <ChartSection title="Fuel Types" data={fuelTypes} />
                        </SectionCard>

                        <SectionCard title="Transmissions">
                            <ChartSection title="Transmissions" data={transmissions} />
                        </SectionCard>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboardComponent;
