import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import adminAdService from '../../../services/AdminPageServices/AdminPageAdvertisementsService';
import TokenManager from '../../../services/TokenManager';

function AdminAdvertisementList() {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const pageSize = 50;

    useEffect(() => {
        loadPage(0);
    }, []);

    const loadPage = (pageNumber) => {
        setLoading(true);
        adminAdService.getAllAdvertisements(pageNumber, pageSize)
            .then(dto => {
                setContent(dto.content || []);
                setTotalPages(dto.totalPages);
                setPage(dto.number);
            })
            .catch(err => {
                console.error('Error fetching advertisements:', err);
                setContent([]);
            })
            .finally(() => setLoading(false));
    };

    if (!TokenManager.canAccessAdminPage()) {
        return <Navigate to="/unauthorized" replace />;
    }

    if (loading) return <p>Loading advertisements…</p>;

    return (
        <div>
            <h2>Admin Advertisement List (Page {page + 1} of {totalPages})</h2>
            {content.length > 0 ? (
                <>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>User ID</th>
                            <th>Phone Number</th>
                            <th>Google Place ID</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {content.map(ad => (
                            <tr key={ad.id}>
                                <td>{ad.id}</td>
                                <td>{ad.title}</td>
                                <td>{ad.userId}</td>
                                <td>{ad.phoneNumber || '—'}</td>
                                <td>{ad.googlePlaceId || '—'}</td>
                                <td>
                                    <Link to={`/admin/advertisements/${ad.id}`}>Details</Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div>
                        <button onClick={() => loadPage(page - 1)} disabled={page <= 0}>Previous</button>
                        <button onClick={() => loadPage(page + 1)} disabled={page >= totalPages - 1}>Next</button>
                    </div>
                </>
            ) : <p>No advertisements to display.</p>}
        </div>
    );
}

export default AdminAdvertisementList;
