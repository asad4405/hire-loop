import { Suspense } from 'react';
import Link from 'next/link';
import {
    Plus,
    Briefcase,
    MapPin,
    Globe,
    Users,
    Pencil,
    MoreVertical,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { jobType } from '@/types/jobType';
import { getJobs } from '../../../../lib/actions/job';
import { DeleteJobDialog } from '@/app/components/jobs/DeleteJobDialog';

type JobWithStatus = jobType & { isExpired: boolean };

const formatCompensation = (job: jobType) => {
    const min = job.minSalary ? `$${job.minSalary}` : '';
    const max = job.maxSalary ? `$${job.maxSalary}` : '';
    const range = min && max ? `${min} – ${max}` : min || max || 'Negotiable';
    return job.frequency ? `${range} / ${job.frequency.replace(/^per\s+/i, '')}` : range;
};

async function loadJobsWithStatus(): Promise<{ jobs: JobWithStatus[]; error: string | null }> {
    try {
        const data = await getJobs();
        const now = Date.now();
        const jobs = Array.isArray(data)
            ? data.map((job) => {
                  const parsedDeadline = job.deadline ? new Date(job.deadline).getTime() : NaN;
                  const isExpired = !Number.isNaN(parsedDeadline) && parsedDeadline < now;
                  return { ...job, isExpired };
              })
            : [];
        return { jobs, error: null };
    } catch (err) {
        return {
            jobs: [],
            error: err instanceof Error ? err.message : 'Something went wrong',
        };
    }
}

const ManageJobsContent = async () => {
    const { jobs, error } = await loadJobsWithStatus();

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8 text-zinc-100 space-y-6">
            {/* Top Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1.5">
                        <span>Manage Jobs</span>
                        <span>&gt;</span>
                        <span className="text-indigo-400 font-medium">Job Listings &amp; Postings</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                        Manage Job Posts
                    </h1>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                        Review live listings, monitor applicants, and update job details across your organization.
                    </p>
                </div>

                <Link href="/dashboard/recruiter/jobs/new">
                    <Button className="h-10 px-4 rounded-xl bg-linear-to-r from-[#5B52FF] to-[#6D65FF] hover:opacity-95 text-white font-medium text-sm shadow-lg shadow-indigo-600/25 cursor-pointer shrink-0">
                        <Plus className="w-4 h-4 mr-1.5" />
                        New Job Post
                    </Button>
                </Link>
            </div>

            {/* Table Card */}
            <Card className="bg-[#121215] border border-white/10 rounded-2xl shadow-none overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 bg-[#151519]">
                                <th className="py-3.5 px-4">Job Title &amp; Dept</th>
                                <th className="py-3.5 px-4">Company &amp; Location</th>
                                <th className="py-3.5 px-4">Type</th>
                                <th className="py-3.5 px-4">Compensation</th>
                                <th className="py-3.5 px-4">Applicants</th>
                                <th className="py-3.5 px-4">Status</th>
                                <th className="py-3.5 px-4">Deadline</th>
                                <th className="py-3.5 px-4 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-white/10 text-sm">
                            {error ? (
                                <tr>
                                    <td colSpan={8} className="py-10 text-center text-red-400 text-xs sm:text-sm">
                                        {error}
                                    </td>
                                </tr>
                            ) : jobs.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="py-10 text-center text-zinc-400 text-xs sm:text-sm">
                                        No job posts found. Click &ldquo;+ New Job Post&rdquo; to create one.
                                    </td>
                                </tr>
                            ) : (
                                jobs.map((job, index) => (
                                    <tr
                                        key={job._id ?? index}
                                        className="hover:bg-white/[0.02] transition-colors"
                                    >
                                        {/* Job Title & Category/Dept */}
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                                                    <Briefcase className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-zinc-100 leading-snug">
                                                        {job.title}
                                                    </p>
                                                    <p className="text-xs text-indigo-400/90 mt-0.5">
                                                        {job.category || 'General'}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Company & Location */}
                                        <td className="py-4 px-4">
                                            <p className="text-xs sm:text-sm font-medium text-zinc-200">
                                                {job.company}
                                            </p>
                                            <div className="flex items-center gap-1 text-xs text-zinc-400 mt-0.5">
                                                {job.isRemote ? (
                                                    <Globe className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                                                ) : (
                                                    <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                                                )}
                                                <span>
                                                    {job.isRemote && job.location
                                                        ? `Remote (${job.location})`
                                                        : job.isRemote
                                                        ? 'Remote'
                                                        : job.location || 'N/A'}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Job Type */}
                                        <td className="py-4 px-4">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#1C1C22] text-zinc-300 border border-white/10">
                                                {job.jobType || 'Full-time'}
                                            </span>
                                        </td>

                                        {/* Compensation */}
                                        <td className="py-4 px-4 text-xs sm:text-sm text-zinc-200 whitespace-nowrap">
                                            {formatCompensation(job)}
                                        </td>

                                        {/* Applicants */}
                                        <td className="py-4 px-4 whitespace-nowrap">
                                            <div className="inline-flex items-center gap-1.5 text-xs text-zinc-300">
                                                <Users className="w-3.5 h-3.5 text-zinc-400" />
                                                <span>0 Candidates</span>
                                            </div>
                                        </td>

                                        {/* Status */}
                                        <td className="py-4 px-4 whitespace-nowrap">
                                            {job.isExpired ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-800/80 text-zinc-400 border border-white/10">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                                                    Expired
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                                    Active
                                                </span>
                                            )}
                                        </td>

                                        {/* Deadline */}
                                        <td className="py-4 px-4 text-xs text-zinc-300 whitespace-nowrap">
                                            {job.deadline || '—'}
                                        </td>

                                        {/* Actions */}
                                        <td className="py-4 px-4 text-right whitespace-nowrap">
                                            <div className="inline-flex items-center gap-1.5">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-8 px-2.5 rounded-lg bg-[#18181D] border-white/10 text-zinc-200 hover:bg-white/5 text-xs cursor-pointer"
                                                >
                                                    <Pencil className="w-3.5 h-3.5 mr-1" />
                                                    Update
                                                </Button>
                                                <DeleteJobDialog job={job} />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-white/5 cursor-pointer"
                                                    aria-label="More options"
                                                >
                                                    <MoreVertical className="w-3.5 h-3.5" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

const ManageJobsPage = () => (
    <Suspense
        fallback={
            <div className="w-full max-w-6xl mx-auto px-4 py-8 text-sm text-zinc-400" role="status">
                Loading job listings...
            </div>
        }
    >
        <ManageJobsContent />
    </Suspense>
);

export default ManageJobsPage;