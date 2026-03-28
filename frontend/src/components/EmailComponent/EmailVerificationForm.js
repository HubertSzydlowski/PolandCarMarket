import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import emailService from '../../services/EmailServices/EmailService';

const EmailVerificationForm = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [status, setStatus] = useState('pending');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setMessage('No token found in the URL.');
            return;
        }

        const verify = async () => {
            try {
                await emailService.verifyEmail(token);
                setStatus('success');
                setMessage('Email address has been successfully verified.');
            } catch (error) {
                setStatus('error');
                setMessage('Verification failed. The token is invalid or has expired.');
            }
        };

        verify();
    }, [token]);

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#fff",
            boxSizing: "border-box"
        }}>
            <div style={{
                width: "100%",
                maxWidth: 400,
                backgroundColor: "#fff",
                borderRadius: 10,
                overflow: "hidden",
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                textAlign: "center"
            }}>
                <div style={{
                    backgroundColor: "#8b0000",
                    color: "#fff",
                    padding: "16px",
                    fontWeight: 600,
                    fontSize: "1.2rem"
                }}>
                    Email Verification
                </div>

                <div style={{ padding: "20px" }}>
                    {status === 'pending' && (
                        <p style={{ marginBottom: 12 }}>Verifying your email address...</p>
                    )}
                    {status === 'success' && (
                        <p style={{ color: 'green', marginBottom: 12 }}>{message}</p>
                    )}
                    {status === 'error' && (
                        <p style={{ color: 'red', marginBottom: 12 }}>{message}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmailVerificationForm;
