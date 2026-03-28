import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import emailService from '../../services/EmailServices/EmailService';

const ResetPasswordForm = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
    });

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleShowNewPassword = () => setShowNewPassword(prev => !prev);
    const toggleShowConfirmPassword = () => setShowConfirmPassword(prev => !prev);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(null);
        setMessage('');

        const { newPassword, confirmPassword } = formData;

        if (newPassword.length < 6) {
            setStatus('error');
            setMessage('Password must be at least 6 characters long.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setStatus('error');
            setMessage('Password and confirmation must match.');
            return;
        }

        if (!token) {
            setStatus('error');
            setMessage('Missing token in URL.');
            return;
        }

        try {
            await emailService.resetPassword(token, newPassword);
            setStatus('success');
            setMessage('Password has been successfully changed.');
            setFormData({ newPassword: '', confirmPassword: '' });
        } catch (error) {
            setStatus('error');
            setMessage('Password reset failed. The token is invalid or has expired.');
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
        width: "100%"
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
                    Set New Password
                </div>

                <div style={{ padding: "20px" }}>
                    {status && (
                        <p style={{
                            color: status === 'success' ? 'green' : 'red',
                            marginBottom: 12
                        }}>
                            {message}
                        </p>
                    )}

                    <div style={{ position: 'relative', marginBottom: 12 }}>
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            name="newPassword"
                            placeholder="New password"
                            value={formData.newPassword}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: 10,
                                paddingRight: 40,
                                borderRadius: 6,
                                border: "1px solid #ccc",
                                boxSizing: "border-box"
                            }}
                        />
                        <button
                            type="button"
                            onClick={toggleShowNewPassword}
                            style={{
                                position: 'absolute',
                                right: 8,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0
                            }}
                            aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                        >
                            <img
                                src={showNewPassword ? "/icons/eye_lock.png" : "/icons/eye_open.png"}
                                alt={showNewPassword ? 'Hide password' : 'Show password'}
                                style={{ width: 24, height: 24 }}
                            />
                        </button>
                    </div>

                    <div style={{ position: 'relative', marginBottom: 12 }}>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            placeholder="Confirm new password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
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
                                position: 'absolute',
                                right: 8,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0
                            }}
                            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                        >
                            <img
                                src={showConfirmPassword ? "/icons/eye_lock.png" : "/icons/eye_open.png"}
                                alt={showConfirmPassword ? 'Hide password' : 'Show password'}
                                style={{ width: 24, height: 24 }}
                            />
                        </button>
                    </div>

                    <div style={{ marginTop: 16 }}>
                        <button type="submit" style={btnPrimary}>
                            Change password
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ResetPasswordForm;