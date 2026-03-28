import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import userService from '../../../services/UserServices/userService';

function UserEditForm() {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await userService.getUserById(userId);
                setFormData(data);
            } catch (err) {
                console.error('Error fetching user:', err);
                setError('Failed to load user data.');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToSend = { ...formData };

            if (!dataToSend.password) {
                delete dataToSend.password;
            }

            await userService.updateUser(userId, dataToSend);
            navigate('/users');
        } catch (err) {
            console.error('Error saving user data:', err);
            setError('An error occurred while saving.');
        }
    };

    if (loading) return <div>Loading user data for editing...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;
    if (!formData) return null;

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit User #{userId}</h2>

            <label>
                Username:
                <input
                    type="text"
                    name="username"
                    value={formData.username || ''}
                    onChange={handleChange}
                />
            </label>

            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                />
            </label>

            <label>
                Password (optional):
                <input
                    type="password"
                    name="password"
                    value={formData.password || ''}
                    onChange={handleChange}
                    placeholder="Leave empty to keep unchanged"
                />
            </label>

            <label>
                Role:
                <select
                    name="role"
                    value={formData.role || ''}
                    onChange={handleChange}
                >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="GUEST">GUEST</option>
                </select>
            </label>

            <label>
                Account Active:
                <input
                    type="checkbox"
                    name="enabled"
                    checked={formData.enabled || false}
                    onChange={handleChange}
                />
            </label>

            <button type="submit">Save</button>
        </form>
    );
}

export default UserEditForm;
