'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface JobSearchBarProps {
    activeSearch: string;
}

const JobSearchBar = ({ activeSearch }: JobSearchBarProps) => {
    const [searchText, setSearchText] = useState(activeSearch);
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());

        if (searchText.trim()) {
            params.set('search', searchText.trim());
        } else {
            params.delete('search');
        }

        const qs = params.toString();
        router.push(qs ? `/browse-jobs?${qs}` : '/browse-jobs', { scroll: false });
    };

    return (
        <form onSubmit={handleSearch} className="w-full">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 bg-[#121215] border border-white/10 p-2.5 rounded-2xl">
                <div className="relative flex-1">
                    <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <Input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Search by job title, company, or location..."
                        className="h-11 bg-[#18181C] border-white/10 rounded-xl pl-10 pr-4 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-indigo-500"
                    />
                </div>
                <Button
                    type="submit"
                    className="h-11 px-5 rounded-xl bg-linear-to-r from-[#5B52FF] to-[#6D65FF] hover:opacity-95 text-white font-medium text-sm cursor-pointer shrink-0"
                >
                    Search Jobs
                </Button>
            </div>
        </form>
    );
};

export default JobSearchBar;