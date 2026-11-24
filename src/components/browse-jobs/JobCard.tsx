import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Bookmark,
    Briefcase,
    Clock,
    DollarSign,
    Zap,
} from 'lucide-react';
import { jobType } from '@/types/jobType';

interface JobCardProps {
    job: jobType;
}

const JobCard = ({ job }: JobCardProps) => {
    return (
        <Card className="bg-[#121215] border border-white/10 hover:border-white/20 transition-colors rounded-2xl shadow-none">
            <CardContent className="p-4 sm:p-5 flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-[#18181C] border border-white/10 flex items-center justify-center text-sm font-bold text-indigo-400 shrink-0">
                        {job.company?.charAt(0)?.toUpperCase() || 'J'}
                    </div>

                    <div className="space-y-2 min-w-0">
                        <div>
                            <Link
                                href={job._id ? `/jobs/${job._id}` : '/jobs'}
                                className="text-base font-semibold text-white hover:text-indigo-400 transition-colors line-clamp-1"
                            >
                                {job.title}
                            </Link>
                            <p className="text-xs text-zinc-400 mt-0.5 truncate">
                                {job.company} • {job.location}
                                {job.isRemote ? ' (Remote)' : ''}
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 pt-0.5">
                            <Badge
                                variant="outline"
                                className="bg-[#18181C] border-white/10 text-zinc-300 font-normal text-xs rounded-md px-2.5 py-1 gap-1.5"
                            >
                                <DollarSign className="w-3.5 h-3.5 text-zinc-400" />
                                ${job.minSalary} - ${job.maxSalary}
                                {job.frequency ? ` / ${job.frequency}` : ''}
                            </Badge>

                            <Badge
                                variant="outline"
                                className="bg-[#18181C] border-white/10 text-zinc-300 font-normal text-xs rounded-md px-2.5 py-1 gap-1.5"
                            >
                                {job.jobType === 'Full-time' ? (
                                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                                ) : (
                                    <Briefcase className="w-3.5 h-3.5 text-zinc-400" />
                                )}
                                {job.jobType}
                            </Badge>

                            {job.isRemote && (
                                <Badge
                                    variant="outline"
                                    className="bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-normal text-xs rounded-md px-2.5 py-1 gap-1"
                                >
                                    <Zap className="w-3.5 h-3.5" />
                                    Easy Apply
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    aria-label="Save job"
                    className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer shrink-0"
                >
                    <Bookmark className="w-4 h-4" />
                </button>
            </CardContent>
        </Card>
    );
};

export default JobCard;