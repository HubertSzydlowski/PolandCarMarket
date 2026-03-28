import React from "react";

const ServerError = () => {
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

    const emailStyle = {
        marginTop: 18,
        display: "block",
        textDecoration: "none",
        color: "#8b0000",
        fontWeight: "bold",
        fontSize: 16
    };

    return (
        <div style={wrapperStyle}>
            <div style={cardStyle}>
                <div style={headerStyle}>500 — Server Error</div>
                <div style={bodyStyle}>
                    <p style={{ margin: 0, fontSize: 16 }}>
                        Something went wrong on our side.<br />
                        Please contact support:
                    </p>

                    <div style={{ marginTop: 18 }}>
                        <a href="mailto:pcmemail123@gmail.com" style={emailStyle}>pcmemail123@gmail.com</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServerError;
