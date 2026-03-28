import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Generates an array of image paths to be used in the background grid.
const carImages = Array.from({ length: 6 }, (_, i) => `/images_home_page/${i + 1}.jpg`);

export default function WelcomePage() {
    // State to track if the current viewport width indicates a mobile device (< 768px).
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const navigate = useNavigate();

    // Effect to update the mobile state dynamically on window resize.
    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth < 768);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            style={{
                height: '100vh',
                width: '100vw',
                position: 'relative',
                overflow: 'hidden',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                backgroundColor: 'white',
                margin: 0,
                padding: 0,
            }}
        >
            {/* Background layer displaying a grid of car images. The grid layout changes based on the device width. */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                    gridTemplateRows: isMobile ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
                    justifyContent: 'center',
                    alignContent: 'center',
                    zIndex: 0,
                    backgroundColor: 'white',
                }}
            >
                {carImages.slice(0, isMobile ? 3 : 6).map((src, i) => (
                    <div
                        key={i}
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'white',
                        }}
                    >
                        <img
                            src={src}
                            alt={`Car ${i + 1}`}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain',
                            }}
                        />
                    </div>
                ))}

                {/* Semi-transparent white overlay placed on top of images to improve text readability. */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(255,255,255,0.4)',
                        pointerEvents: 'none',
                        zIndex: 1,
                    }}
                />
            </div>

            {/* Main content container positioned centrally over the background. Handles user interaction. */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 2,
                    height: '100vh',
                    width: '100%',
                    pointerEvents: 'auto',
                    userSelect: 'text',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        width: isMobile ? '90%' : '100%',
                        gap: isMobile ? '4rem' : '3rem',
                    }}
                >
                    {isMobile ? (
                        <>
                            <h1
                                style={{
                                    fontSize: '2.4rem',
                                    fontWeight: 'bold',
                                    color: '#8b0000',
                                    margin: 0,
                                    lineHeight: 1.2,
                                }}
                            >
                                Welcome to<br />Poland Car Market
                            </h1>

                            <p
                                style={{
                                    fontSize: '1.4rem',
                                    fontWeight: '500',
                                    color: 'white',
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                                    lineHeight: 1.4,
                                    margin: 0,
                                }}
                            >
                                The best place to find, buy <br /> and sell vehicles in Poland.
                            </p>

                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1.2rem',
                                    width: '100%',
                                }}
                            >
                                <button
                                    style={{
                                        padding: '1rem 0',
                                        fontSize: '1.2rem',
                                        fontWeight: '700',
                                        borderRadius: '8px',
                                        border: 'none',
                                        backgroundColor: '#8b0000',
                                        color: 'white',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                                        transition: 'all 0.3s ease',
                                        whiteSpace: 'nowrap',
                                        width: '100%',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'white';
                                        e.currentTarget.style.color = '#8b0000';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#8b0000';
                                        e.currentTarget.style.color = 'white';
                                    }}
                                    onClick={() => navigate('/offers')}
                                >
                                    Browse Offers
                                </button>

                                <button
                                    style={{
                                        padding: '1rem 0',
                                        fontSize: '1.2rem',
                                        fontWeight: '700',
                                        borderRadius: '8px',
                                        border: 'none',
                                        backgroundColor: 'white',
                                        color: '#8b0000',
                                        cursor: 'pointer',
                                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                                        transition: 'all 0.3s ease',
                                        whiteSpace: 'nowrap',
                                        width: '100%',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#8b0000';
                                        e.currentTarget.style.color = 'white';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'white';
                                        e.currentTarget.style.color = '#8b0000';
                                    }}
                                    onClick={() => navigate('/users/login')}
                                >
                                    Login / Register
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1
                                style={{
                                    fontSize: '4rem',
                                    fontWeight: 'bold',
                                    color: '#8b0000',
                                    textShadow: '1px 1px 3px rgba(255,255,255,0.9)',
                                    whiteSpace: 'nowrap',
                                    margin: 0,
                                }}
                            >
                                Welcome to Poland Car Market
                            </h1>

                            <p
                                style={{
                                    fontSize: '2.2rem',
                                    fontWeight: '500',
                                    color: 'white',
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                                    whiteSpace: 'nowrap',
                                    margin: 0,
                                }}
                            >
                                The best place to find, buy and sell vehicles in Poland.
                            </p>

                            <div
                                style={{
                                    display: 'flex',
                                    gap: '5rem',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <button
                                    style={{
                                        width: '18rem',
                                        padding: '1rem 0',
                                        fontSize: '1.3rem',
                                        fontWeight: '700',
                                        borderRadius: '8px',
                                        border: 'none',
                                        backgroundColor: '#8b0000',
                                        color: 'white',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                                        transition: 'all 0.3s ease',
                                        whiteSpace: 'nowrap',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'white';
                                        e.currentTarget.style.color = '#8b0000';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#8b0000';
                                        e.currentTarget.style.color = 'white';
                                    }}
                                    onClick={() => navigate('/offers')}
                                >
                                    Browse Offers
                                </button>

                                <button
                                    style={{
                                        width: '18rem',
                                        padding: '1rem 0',
                                        fontSize: '1.3rem',
                                        fontWeight: '700',
                                        borderRadius: '8px',
                                        border: 'none',
                                        backgroundColor: 'white',
                                        color: '#8b0000',
                                        cursor: 'pointer',
                                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                                        transition: 'all 0.3s ease',
                                        whiteSpace: 'nowrap',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#8b0000';
                                        e.currentTarget.style.color = 'white';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'white';
                                        e.currentTarget.style.color = '#8b0000';
                                    }}
                                    onClick={() => navigate('/users/login')}
                                >
                                    Login / Register
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Fixed footer containing credit information. */}
            <div
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    backgroundColor: '#000',
                    color: '#fff',
                    textAlign: 'center',
                    padding: '10px 0',
                    zIndex: 4,
                }}
            >
                <span style={{ color: '#fff' }}>
                    Made by{' '}
                    <a
                        href="https://github.com/HubertSzydlowski"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#fff', fontWeight: 700, textDecoration: 'underline' }}
                    >
                        Hubert Szydłowski
                    </a>
                </span>
            </div>
        </div>
    );
}