import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import userService from '../../../services/UserServices/userService';

function UserDetails() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await userService.getUserById(userId);
                setUser(data);
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Failed to load user data.');
            }
        };

        fetchUser();
    }, [userId]);

    if (error) return <div style={{ color: 'red' }}>{error}</div>;
    if (!user) return <div>Loading user data...</div>;

    return (
        <div>
            <h2>User Details #{userId}</h2>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Account Active:</strong> {user.enabled ? 'Yes' : 'No'}</p>
        </div>
    );
}

export default UserDetails;
