import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

interface JobFiltersSidebarProps {
    jobTypes: string[];
    categories: string[];
    frequencies: string[];
    typeCounts: Record<string, number>;
    activeJobType: string;
    activeCategory: string;
    activeFrequency: string;
    activeIsRemote: string;
    activeSearch: string;
    currentQuery: string;
}

const JobFiltersSidebar = ({
    jobTypes,
    categories,
    frequencies,
    typeCounts,
    activeJobType,
    activeCategory,
    activeFrequency,
    activeIsRemote,
    activeSearch,
    currentQuery,
}: JobFiltersSidebarProps) => {
    const toggleQueryParam = (key: string, value: string) => {
        const params = new URLSearchParams(currentQuery);
        const currentVal = params.get(key) || '';

        if (currentVal.toLowerCase() === value.toLowerCase()) {
            params.delete(key);
        } else {
            params.set(key, value);
        }

        const qs = params.toString();
        return qs ? `/browse-jobs?${qs}` : '/browse-jobs';
    };

    const hasAnyFilter =
        activeJobType || activeCategory || activeFrequency || activeIsRemote || activeSearch;

    return (
        <aside className="lg:col-span-3">
            <Card className="bg-[#121215] border border-white/10 rounded-2xl shadow-none">
                <CardContent className="p-5 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-base font-semibold text-white">Filters</h2>
                        {hasAnyFilter && (
                            <Link
                                href="/browse-jobs"
                                className="text-xs text-indigo-400 hover:underline"
                            >
                                Reset All
                            </Link>
                        )}
                    </div>

                    {/* 1. Job Type */}
                    <div className="space-y-3">
                        <p className="text-xs font-medium text-zinc-400">Job Type</p>
                        <div className="space-y-2.5">
                            {jobTypes.map((type) => {
                                const isSelected =
                                    activeJobType.toLowerCase() === type.toLowerCase();
                                return (
                                    <Link
                                        key={type}
                                        href={toggleQueryParam('jobType', type)}
                                        className={`flex items-center justify-between text-xs transition-colors ${
                                            isSelected
                                                ? 'text-white font-medium'
                                                : 'text-zinc-400 hover:text-zinc-200'
                                        }`}
                                    >
                                        <span className="flex items-center gap-2.5">
                                            <span
                                                className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold ${
                                                    isSelected
                                                        ? 'bg-white text-zinc-900'
                                                        : 'border border-white/15 bg-[#18181C]'
                                                }`}
                                            >
                                                {isSelected ? '✓' : ''}
                                            </span>
                                            <span>{type}</span>
                                        </span>
                                        <span className="text-zinc-500">
                                            {typeCounts[type] ?? 0}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* 2. Work Mode (isRemote) */}
                    <div className="space-y-3 pt-4 border-t border-white/10">
                        <p className="text-xs font-medium text-zinc-400">Work Mode</p>
                        <Link
                            href={toggleQueryParam('isRemote', 'true')}
                            className={`flex items-center gap-2.5 text-xs transition-colors ${
                                activeIsRemote === 'true'
                                    ? 'text-white font-medium'
                                    : 'text-zinc-400 hover:text-zinc-200'
                            }`}
                        >
                            <span
                                className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold ${
                                    activeIsRemote === 'true'
                                        ? 'bg-white text-zinc-900'
                                        : 'border border-white/15 bg-[#18181C]'
                                }`}
                            >
                                {activeIsRemote === 'true' ? '✓' : ''}
                            </span>
                            <span>Remote Only</span>
                        </Link>
                    </div>

                    {/* 3. Job Category */}
                    <div className="space-y-3 pt-4 border-t border-white/10">
                        <p className="text-xs font-medium text-zinc-400">Category</p>
                        <div className="space-y-2.5">
                            {categories.map((cat) => {
                                const isSelected =
                                    activeCategory.toLowerCase() === cat.toLowerCase();
                                return (
                                    <Link
                                        key={cat}
                                        href={toggleQueryParam('category', cat)}
                                        className={`flex items-center gap-2.5 text-xs transition-colors ${
                                            isSelected
                                                ? 'text-white font-medium'
                                                : 'text-zinc-400 hover:text-zinc-200'
                                        }`}
                                    >
                                        <span
                                            className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold shrink-0 ${
                                                isSelected
                                                    ? 'bg-white text-zinc-900'
                                                    : 'border border-white/15 bg-[#18181C]'
                                            }`}
                                        >
                                            {isSelected ? '✓' : ''}
                                        </span>
                                        <span className="truncate">{cat}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* 4. Salary Frequency */}
                    <div className="space-y-3 pt-4 border-t border-white/10">
                        <p className="text-xs font-medium text-zinc-400">Pay Frequency</p>
                        <div className="space-y-2.5">
                            {frequencies.map((freq) => {
                                const isSelected =
                                    activeFrequency.toLowerCase() === freq.toLowerCase();
                                return (
                                    <Link
                                        key={freq}
                                        href={toggleQueryParam('frequency', freq)}
                                        className={`flex items-center gap-2.5 text-xs capitalize transition-colors ${
                                            isSelected
                                                ? 'text-white font-medium'
                                                : 'text-zinc-400 hover:text-zinc-200'
                                        }`}
                                    >
                                        <span
                                            className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold ${
                                                isSelected
                                                    ? 'bg-white text-zinc-900'
                                                    : 'border border-white/15 bg-[#18181C]'
                                            }`}
                                        >
                                            {isSelected ? '✓' : ''}
                                        </span>
                                        <span>{freq}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </aside>
    );
};

export default JobFiltersSidebar;