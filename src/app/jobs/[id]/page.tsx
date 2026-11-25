import React, { Suspense } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    ArrowLeft,
    Bookmark,
    Briefcase,
    Building2,
    Calendar,
    CheckCircle2,
    Clock,
    DollarSign,
    Globe,
    Laptop,
    MapPin,
    ShieldCheck,
} from 'lucide-react';
import { getJobById } from '@/lib/actions/job';
import { jobType } from '@/types/jobType';

interface JobDetailsPageProps {
    params: Promise<{ id: string }>;
}

const JobDetailsContent = async ({ params }: JobDetailsPageProps) => {
    const { id } = await params;
    const job: jobType | null = await getJobById(id);

    if (!job) {
        return (
            <Card className="bg-[#121215] border border-white/10 rounded-2xl shadow-none">
                <CardContent className="p-10 text-center space-y-4">
                    <p className="text-base font-medium text-zinc-200">
                        Job post not found.
                    </p>
                    <Link
                        href="/browse-jobs"
                        className="inline-flex items-center gap-2 text-xs text-indigo-400 hover:underline"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Browse Jobs
                    </Link>
                </CardContent>
            </Card>
        );
    }

    const responsibilitiesList = job.responsibilities
        ? job.responsibilities
            .split(/\n|\.\s+/)
            .map((item) => item.trim())
            .filter(Boolean)
        : [];

    const requirementsList = job.requirements
        ? job.requirements
            .split(/\n|\.\s+/)
            .map((item) => item.trim())
            .filter(Boolean)
        : [];

    const skillTags = requirementsList.slice(0, 4).map((req) =>
        req.length > 24 ? `${req.slice(0, 24)}...` : req
    );

    return (
        <div className="space-y-5">
            <Link
                href="/browse-jobs"
                className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors"
            >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Jobs
            </Link>

            {/* Top Job Header Card */}
            <Card className="bg-[#121215] border border-white/10 rounded-2xl shadow-none">
                <CardContent className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-[#18181C] border border-white/10 flex items-center justify-center text-base font-bold text-indigo-400 shrink-0">
                            {job.company?.charAt(0)?.toUpperCase() || 'J'}
                        </div>

                        <div className="min-w-0 space-y-1">
                            <h1 className="text-xl sm:text-2xl font-semibold text-white truncate">
                                {job.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                                <span className="font-medium text-zinc-300">{job.company}</span>
                                <span>•</span>
                                <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    Verified Employer
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                        <button
                            type="button"
                            aria-label="Bookmark job"
                            className="h-10 w-10 rounded-xl bg-[#18181C] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:border-white/20 transition-colors cursor-pointer"
                        >
                            <Bookmark className="w-4 h-4" />
                        </button>
                        <Button
                            type="button"
                            className="h-10 px-5 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 font-semibold text-xs sm:text-sm cursor-pointer"
                        >
                            Apply Now
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Main Grid: Left Details + Right Company Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8 space-y-5">
                    {/* 4 Stat Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                        <Card className="bg-[#121215] border border-white/10 rounded-2xl shadow-none">
                            <CardContent className="p-4 space-y-2">
                                <DollarSign className="w-4 h-4 text-zinc-400" />
                                <p className="text-[10px] font-semibold tracking-wider uppercase text-zinc-500">
                                    Salary Range
                                </p>
                                <p className="text-xs sm:text-sm font-semibold text-white">
                                    ${job.minSalary} - ${job.maxSalary}
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-[#121215] border border-white/10 rounded-2xl shadow-none">
                            <CardContent className="p-4 space-y-2">
                                <MapPin className="w-4 h-4 text-zinc-400" />
                                <p className="text-[10px] font-semibold tracking-wider uppercase text-zinc-500">
                                    Location
                                </p>
                                <p className="text-xs sm:text-sm font-semibold text-white truncate">
                                    {job.isRemote ? `Remote (${job.location})` : job.location}
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-[#121215] border border-white/10 rounded-2xl shadow-none">
                            <CardContent className="p-4 space-y-2">
                                <Clock className="w-4 h-4 text-zinc-400" />
                                <p className="text-[10px] font-semibold tracking-wider uppercase text-zinc-500">
                                    Job Type
                                </p>
                                <p className="text-xs sm:text-sm font-semibold text-white">
                                    {job.jobType}
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-[#121215] border border-white/10 rounded-2xl shadow-none">
                            <CardContent className="p-4 space-y-2">
                                <Calendar className="w-4 h-4 text-zinc-400" />
                                <p className="text-[10px] font-semibold tracking-wider uppercase text-zinc-500">
                                    Deadline
                                </p>
                                <p className="text-xs sm:text-sm font-semibold text-white truncate">
                                    {job.deadline || 'Open'}
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Job Description, Responsibilities, Requirements & Benefits */}
                    <Card className="bg-[#121215] border border-white/10 rounded-2xl shadow-none">
                        <CardContent className="p-5 sm:p-6 space-y-7">
                            <section className="space-y-2.5">
                                <h2 className="text-base font-semibold text-white">
                                    Job Description
                                </h2>
                                <p className="text-xs sm:text-sm leading-relaxed text-zinc-400">
                                    {job.company} is hiring a{' '}
                                    <span className="text-zinc-200 font-medium">{job.title}</span>{' '}
                                    in the <span className="text-zinc-200">{job.category}</span>{' '}
                                    domain ({job.frequency || 'standard compensation'}). Join the
                                    team to build reliable, high-impact solutions and collaborate
                                    across product engineering.
                                </p>
                            </section>

                            <section className="space-y-3 pt-5 border-t border-white/10">
                                <h2 className="text-base font-semibold text-white">
                                    Responsibilities
                                </h2>
                                <ul className="space-y-2.5 list-disc pl-5 text-xs sm:text-sm text-zinc-400">
                                    {responsibilitiesList.length > 0 ? (
                                        responsibilitiesList.map((item, idx) => (
                                            <li key={idx} className="leading-relaxed">
                                                {item}
                                            </li>
                                        ))
                                    ) : (
                                        <li>{job.responsibilities}</li>
                                    )}
                                </ul>
                            </section>

                            <section className="space-y-3 pt-5 border-t border-white/10">
                                <h2 className="text-base font-semibold text-white">
                                    Requirements
                                </h2>

                                {skillTags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 pb-1">
                                        {skillTags.map((tag, idx) => (
                                            <Badge
                                                key={idx}
                                                variant="outline"
                                                className="bg-[#18181C] border-white/10 text-zinc-300 font-normal text-xs rounded-md px-2.5 py-1"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                )}

                                <ul className="space-y-2.5 list-disc pl-5 text-xs sm:text-sm text-zinc-400">
                                    {requirementsList.length > 0 ? (
                                        requirementsList.map((item, idx) => (
                                            <li key={idx} className="leading-relaxed">
                                                {item}
                                            </li>
                                        ))
                                    ) : (
                                        <li>{job.requirements}</li>
                                    )}
                                </ul>
                            </section>

                            <section className="space-y-4 pt-5 border-t border-white/10">
                                <h2 className="text-base font-semibold text-white">Benefits</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-zinc-300">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#18181C] border border-white/10 flex items-center justify-center shrink-0">
                                            <ShieldCheck className="w-4 h-4 text-zinc-400" />
                                        </div>
                                        <span>Health &amp; Wellness Support</span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#18181C] border border-white/10 flex items-center justify-center shrink-0">
                                            <DollarSign className="w-4 h-4 text-zinc-400" />
                                        </div>
                                        <span>Competitive {job.frequency || 'Pay'}</span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#18181C] border border-white/10 flex items-center justify-center shrink-0">
                                            <Laptop className="w-4 h-4 text-zinc-400" />
                                        </div>
                                        <span>Modern Work Equipment</span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#18181C] border border-white/10 flex items-center justify-center shrink-0">
                                            <Briefcase className="w-4 h-4 text-zinc-400" />
                                        </div>
                                        <span>
                                            {job.isRemote ? 'Flexible Remote Culture' : 'Collaborative Office Environment'}
                                        </span>
                                    </div>
                                </div>
                            </section>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Sidebar: Company Overview */}
                <aside className="lg:col-span-4">
                    <Card className="bg-[#121215] border border-white/10 rounded-2xl shadow-none">
                        <CardContent className="p-5 space-y-5">
                            <h2 className="text-base font-semibold text-white">
                                Company Overview
                            </h2>

                            <div className="h-36 w-full rounded-xl bg-[#18181C] border border-white/10 flex flex-col items-center justify-center gap-2 text-zinc-400">
                                <Building2 className="w-8 h-8 text-indigo-400" />
                                <span className="text-xs font-medium text-zinc-300">
                                    {job.company}
                                </span>
                            </div>

                            <div className="space-y-3 text-xs">
                                <div className="flex items-center justify-between py-2 border-b border-white/10">
                                    <span className="uppercase tracking-wider text-[10px] font-semibold text-zinc-500">
                                        Location
                                    </span>
                                    <span className="text-zinc-200 font-medium">
                                        {job.location}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between py-2 border-b border-white/10">
                                    <span className="uppercase tracking-wider text-[10px] font-semibold text-zinc-500">
                                        Category
                                    </span>
                                    <span className="text-zinc-200 font-medium">
                                        {job.category}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between py-2">
                                    <span className="uppercase tracking-wider text-[10px] font-semibold text-zinc-500">
                                        Work Mode
                                    </span>
                                    <span className="text-zinc-200 font-medium">
                                        {job.isRemote ? 'Remote' : 'On-site'}
                                    </span>
                                </div>
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                className="w-full h-10 rounded-xl bg-[#18181C] border-white/10 text-zinc-200 hover:bg-white/5 hover:text-white text-xs font-medium gap-2 cursor-pointer"
                            >
                                <Globe className="w-3.5 h-3.5" />
                                Visit Website
                            </Button>
                        </CardContent>
                    </Card>
                </aside>
            </div>
        </div>
    );
};

const JobDetailsPage = ({ params }: JobDetailsPageProps) => {
    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8 text-zinc-100">
            <Suspense fallback={<div className="text-sm text-zinc-400 py-8">Loading job details...</div>}>
                <JobDetailsContent params={params} />
            </Suspense>
        </div>
    );
};

export default JobDetailsPage;