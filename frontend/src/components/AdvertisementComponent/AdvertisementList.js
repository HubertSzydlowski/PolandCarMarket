import React, { useEffect, useState } from 'react';
import advertisementService from '../../services/AdvertisementServices/advertisementService';

function AdvertisementList() {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const pageSize = 50;

    const loadPage = (pageNumber) => {
        setLoading(true);
        advertisementService.getAllAdvertisements(pageNumber, pageSize)
            .then(dto => {
                setContent(dto.content || []);
                setTotalPages(dto.totalPages);
                setPage(dto.number);
            })
            .catch(err => {
                console.error('Error fetching advertisements:', err);
                setContent([]);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        loadPage(0);
    }, []);

    if (loading) {
        return <p>Loading advertisements…</p>;
    }

    return (
        <div>
            <h2>Advertisement List (Page {page + 1} of {totalPages})</h2>

            {content.length > 0 ? (
                <>
                    <ul>
                        {content.map(ad => (
                            <li key={ad.id}>
                                <strong>{ad.title}</strong>
                                {ad.phoneNumber && <> – {ad.phoneNumber}</>}
                                {ad.googlePlaceId && <> – {ad.googlePlaceId}</>}
                            </li>
                        ))}
                    </ul>

                    <div>
                        <button
                            onClick={() => loadPage(page - 1)}
                            disabled={page <= 0}
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => loadPage(page + 1)}
                            disabled={page >= totalPages - 1}
                        >
                            Next
                        </button>
                    </div>
                </>
            ) : (
                <p>No advertisements to display.</p>
            )}
        </div>
    );
}

export default AdvertisementList;
