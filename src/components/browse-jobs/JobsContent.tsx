import React from 'react';
import { getJobs } from '@/lib/actions/job';
import { Card, CardContent } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import JobSearchBar from './JobSearchBar';
import JobFiltersSidebar from './JobFiltersSidebar';
import JobCard from './JobCard';

const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship'];
const CATEGORIES = [
    'Engineering & Tech',
    'Design & Product',
    'Marketing & Growth',
    'Operations & HR',
];
const FREQUENCIES = ['per hour', 'per month', 'per year'];

interface JobsContentProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const JobsContent = async ({ searchParams }: JobsContentProps) => {
    const search = await searchParams;
    const urlSearch = new URLSearchParams();

    Object.entries(search).forEach(([key, value]) => {
        if (typeof value === 'string' && value.trim() !== '') {
            urlSearch.set(key, value);
        }
    });

    const currentQuery = urlSearch.toString();

    const activeSearch = typeof search.search === 'string' ? search.search : '';
    const activeJobType = typeof search.jobType === 'string' ? search.jobType : '';
    const activeCategory = typeof search.category === 'string' ? search.category : '';
    const activeFrequency = typeof search.frequency === 'string' ? search.frequency : '';
    const activeIsRemote = typeof search.isRemote === 'string' ? search.isRemote : '';

    const [jobs, allJobs] = await Promise.all([
        getJobs(currentQuery),
        getJobs(''),
    ]);

    const typeCounts = JOB_TYPES.reduce<Record<string, number>>((acc, type) => {
        acc[type] = allJobs.filter(
            (item) => item.jobType?.toLowerCase() === type.toLowerCase()
        ).length;
        return acc;
    }, {});

    return (
        <div className="space-y-6">
            <JobSearchBar activeSearch={activeSearch} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <JobFiltersSidebar
                    jobTypes={JOB_TYPES}
                    categories={CATEGORIES}
                    frequencies={FREQUENCIES}
                    typeCounts={typeCounts}
                    activeJobType={activeJobType}
                    activeCategory={activeCategory}
                    activeFrequency={activeFrequency}
                    activeIsRemote={activeIsRemote}
                    activeSearch={activeSearch}
                    currentQuery={currentQuery}
                />

                <main className="lg:col-span-9 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <h1 className="text-lg sm:text-xl font-semibold text-white">
                            Found {jobs?.length ?? 0} Professional Jobs
                        </h1>

                        <div className="flex items-center gap-2.5">
                            <span className="text-xs text-zinc-400 shrink-0">Sort by:</span>
                            <Select defaultValue="most-recent">
                                <SelectTrigger className="h-9 w-36 bg-[#141418] border-white/10 rounded-lg text-xs text-zinc-200">
                                    <SelectValue placeholder="Most Recent" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#18181C] border-white/10 text-zinc-100">
                                    <SelectItem value="most-recent">Most Recent</SelectItem>
                                    <SelectItem value="salary-high">Salary: High to Low</SelectItem>
                                    <SelectItem value="salary-low">Salary: Low to High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-3.5">
                        {jobs && jobs.length > 0 ? (
                            jobs.map((job, idx) => (
                                <JobCard key={job._id ?? idx} job={job} />
                            ))
                        ) : (
                            <Card className="bg-[#121215] border border-white/10 rounded-2xl shadow-none">
                                <CardContent className="p-10 text-center text-sm text-zinc-400">
                                    No jobs found matching your criteria.
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default JobsContent;