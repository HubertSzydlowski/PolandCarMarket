import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../../../services/UserServices/userService';

const UserCreateForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'USER',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            if (name === 'email') {
                return { ...prev, email: value, username: value };
            }
            return { ...prev, [name]: value };
        });
    };

    const toggleShowPassword = () => setShowPassword(prev => !prev);
    const toggleShowConfirmPassword = () => setShowConfirmPassword(prev => !prev);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Password and confirmation password must match.');
            return;
        }

        try {
            const { username, email, password, role } = formData;
            await userService.createUser({ username, email, password, role });

            setSuccess('Registration successful!');

            setFormData({
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                role: 'USER',
            });

        } catch (err) {
            console.error('Failed to create user', err);
            setError('Registration failed. Please try again.');
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
                    Register
                </div>

                <div style={{ padding: "20px" }}>
                    {error && <p style={{ color: 'red', marginBottom: 12, fontWeight: 600 }}>{error}</p>}
                    {success && <p style={{ color: 'green', marginBottom: 12, fontWeight: 600 }}>{success}</p>}

                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
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
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
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

                    <div style={{ position: "relative", marginBottom: 12 }}>
                        <input
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
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
                            onClick={toggleShowConfirmPassword}
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
                            aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                        >
                            <img
                                src={showConfirmPassword ? "/icons/eye_lock.png" : "/icons/eye_open.png"}
                                alt={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
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
                        <button type="submit" style={btnPrimary}>Register</button>
                        <button
                            type="button"
                            onClick={() => navigate('/users/login')}
                            style={btnSecondary}
                        >
                            Go to Login
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UserCreateForm;
