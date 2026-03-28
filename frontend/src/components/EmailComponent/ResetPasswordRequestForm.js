import React, { useState } from 'react';
import emailService from '../../services/EmailServices/EmailService';

const ResetPasswordRequestForm = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState('');

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(null);
        setMessage('');

        if (!validateEmail(email)) {
            setStatus('error');
            setMessage('Invalid email format.');
            return;
        }

        try {
            await emailService.resetPasswordRequest(email);
            setStatus('success');
            setMessage('If the email exists in our system, you will receive a password reset link.');
            setEmail('');
        } catch (error) {
            console.error(error);
            setStatus('error');
            setMessage('An error occurred while sending the reset request.');
        }
    };

    const btnBase = {
        padding: "10px 16px",
        borderRadius: 6,
        border: "1px solid #ddd",
        background: "#fff",
        cursor: "pointer",
        fontWeight: "bold",
        minWidth: 120,
    };
    const btnPrimary = {
        ...btnBase,
        background: "#8b0000",
        color: "#fff",
        border: "1px solid rgba(0,0,0,0.06)",
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#fff",
            boxSizing: "border-box"
        }}>
            <form
                onSubmit={handleSubmit}
                style={{
                    width: "100%",
                    maxWidth: 400,
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    overflow: "hidden",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                }}
            >
                <div style={{
                    backgroundColor: "#8b0000",
                    color: "#fff",
                    padding: "16px",
                    fontWeight: 600,
                    fontSize: "1.2rem",
                    textAlign: "center"
                }}>
                    Reset Password
                </div>

                <div style={{ padding: "20px" }}>
                    {status === 'error' && <p style={{ color: 'red', marginBottom: 12 }}>{message}</p>}
                    {status === 'success' && <p style={{ color: 'green', marginBottom: 12 }}>{message}</p>}

                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        style={{
                            width: "100%",
                            marginBottom: 12,
                            padding: 10,
                            borderRadius: 6,
                            border: "1px solid #ccc",
                            boxSizing: "border-box"
                        }}
                    />

                    <div style={{
                        marginTop: '16px',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <button type="submit" style={btnPrimary}>
                            Send reset link
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ResetPasswordRequestForm;
