import React from 'react';

const BrowseJobsPage = async({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
    const search = await searchParams;
    const urlSearch = new URLSearchParams(search as Record<string, string>);
    return (
        <div>
            <h2>Browse Jobs</h2>
        </div>
    );
};

export default BrowseJobsPage;