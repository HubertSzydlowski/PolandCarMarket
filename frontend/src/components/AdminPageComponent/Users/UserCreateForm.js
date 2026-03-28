import React, { useState } from 'react';
import AdminPageUserService from '../../../services/AdminPageServices/AdminPageUserService';

const AdminUserCreateForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'USER',
        enabled: true,
    });

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await AdminPageUserService.createUser(formData);
            alert('User created successfully!');
        } catch (err) {
            console.error('Failed to create user:', err);
            alert('Failed to create user');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create User</h2>
            <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <select name="role" value={formData.role} onChange={handleChange}>
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
                <option value="GUEST">GUEST</option>
            </select>
            <label>
                Enabled:
                <input name="enabled" type="checkbox" checked={formData.enabled} onChange={handleChange} />
            </label>
            <button type="submit">Create</button>
        </form>
    );
};

export default AdminUserCreateForm;
