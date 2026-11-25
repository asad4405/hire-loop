import JobsContent from '@/components/browse-jobs/JobsContent';
import React, { Suspense } from 'react';

const BrowseJobsPage = ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8 text-zinc-100">
            <Suspense fallback={<div className="text-sm text-zinc-400 py-8">Loading jobs...</div>}>
                <JobsContent searchParams={searchParams} />
            </Suspense>
        </div>
    );
};

export default BrowseJobsPage;