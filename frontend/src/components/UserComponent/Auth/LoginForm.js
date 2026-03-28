import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../../services/UserServices/authService';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await authService.login({ username, password });
            setSuccess('Login successful!');
            setTimeout(() => {
                navigate('/offers', { replace: true });
            }, 1000);
        } catch (err) {
            console.error(err);
            setError('Login failed. Please check your credentials.');
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(prev => !prev);
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
    const btnSecondary = {
        ...btnBase,
        background: "#fff",
        color: "#8b0000",
        border: "1px solid #8b0000",
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
                    Login
                </div>

                <div style={{ padding: "20px" }}>
                    {error && <p style={{ color: 'red', marginBottom: 12 }}>{error}</p>}
                    {success && <p style={{ color: 'green', marginBottom: 12 }}>{success}</p>}

                    <input
                        type="text"
                        placeholder="Email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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

                    <div style={{ position: "relative", marginBottom: 12 }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: "100%",
                                padding: 10,
                                paddingRight: 40,
                                borderRadius: 6,
                                border: "1px solid #ccc",
                                boxSizing: "border-box"
                            }}
                        />
                        <button
                            type="button"
                            onClick={toggleShowPassword}
                            style={{
                                position: "absolute",
                                right: 10,
                                top: "50%",
                                transform: "translateY(-50%)",
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                padding: 0
                            }}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            <img
                                src={showPassword ? "/icons/eye_lock.png" : "/icons/eye_open.png"}
                                alt={showPassword ? "Hide password" : "Show password"}
                                style={{ width: 24, height: 24 }}
                            />
                        </button>
                    </div>

                    <div style={{
                        marginTop: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                    }}>
                        <button type="submit" style={btnPrimary}>Login</button>

                        <button
                            type="button"
                            onClick={() => navigate('/users/register')}
                            style={btnSecondary}
                        >
                            Don't have an account? Register
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate('/reset-password-request')}
                            style={btnSecondary}
                        >
                            Forgot password?
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
