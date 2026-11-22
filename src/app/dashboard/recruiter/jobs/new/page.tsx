'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    ArrowRight,
    Building2,
    Globe,
    MapPin,
    Calendar,
} from 'lucide-react';
import { createJob } from '@/lib/actions/job';

const NewJobPage = () => {
    const router = useRouter();
    const [selectedType, setSelectedType] = useState<string>('Full-time');
    const [category, setCategory] = useState<string>('');
    const [isRemote, setIsRemote] = useState<boolean>(false);
    const [frequency, setFrequency] = useState<string>('');

    const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formValues = Object.fromEntries(formData.entries());

        const jobsData = {
            ...formValues,
            jobType: selectedType,
            category,
            isRemote,
            frequency,
        };

        try {
            const result = await createJob(jobsData);

            if (result.insertedId) {
                toast.success('Job published successfully!');
                router.push('/dashboard/recruiter/jobs');
            } else {
                toast.error('Failed to publish the job. Please try again.');
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to publish the job.';
            toast.error(message);
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8 text-gray-900 dark:text-zinc-100">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1.5">
                            <Link href="/dashboard/recruiter/jobs" className="hover:text-zinc-200 transition-colors">
                                Manage Jobs
                            </Link>
                            <span>&gt;</span>
                            <span className="text-indigo-400 font-medium">Create New Listing</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                            Post a New Job
                        </h1>
                        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                            Fill in the position specifications to attract qualified talent across our network.
                        </p>
                    </div>

                    <Button
                        type="submit"
                        className="h-10 px-5 rounded-xl bg-linear-to-r from-[#5B52FF] to-[#6D65FF] hover:opacity-95 text-white font-medium text-sm shadow-lg shadow-indigo-600/25 cursor-pointer shrink-0"
                    >
                        Publish Job
                        <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Button>
                </div>

                <Card className="bg-[#121215] border border-white/10 rounded-2xl shadow-none">
                    <CardContent className="p-5 sm:p-6 space-y-5">
                        <div className="flex items-center gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-indigo-500" />
                            <h2 className="text-sm font-semibold text-zinc-100">
                                1. Basic Information
                            </h2>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-xs font-medium text-zinc-300">
                                Job Title <span className="text-indigo-400">*</span>
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Frontend Developer"
                                className="h-11 bg-[#18181C] border-white/10 rounded-xl px-3.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-indigo-500"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="company" className="text-xs font-medium text-zinc-300">
                                    Company Name <span className="text-indigo-400">*</span>
                                </Label>
                                <div className="relative">
                                    <Building2 className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <Input
                                        id="company"
                                        name="company"
                                        placeholder="HirePulse Network"
                                        className="h-11 bg-[#18181C] border-white/10 rounded-xl pl-10 pr-3.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-indigo-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-medium text-zinc-300">
                                    Job Category <span className="text-indigo-400">*</span>
                                </Label>
                                <Select value={category} onValueChange={(val) => setCategory(val ?? '')}>
                                    <SelectTrigger className="h-11 w-full bg-[#18181C] border-white/10 rounded-xl px-3.5 text-sm text-zinc-100 focus:ring-indigo-500">
                                        <SelectValue placeholder="Engineering & Tech" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#18181C] border-white/10 text-zinc-100">
                                        <SelectItem value="Engineering & Tech">Engineering &amp; Tech</SelectItem>
                                        <SelectItem value="Design & Product">Design &amp; Product</SelectItem>
                                        <SelectItem value="Marketing & Growth">Marketing &amp; Growth</SelectItem>
                                        <SelectItem value="Operations & HR">Operations &amp; HR</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-medium text-zinc-300">
                                Job Type <span className="text-indigo-400">*</span>
                            </Label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                {jobTypes.map((type) => {
                                    const isActive = selectedType === type;
                                    return (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setSelectedType(type)}
                                            className={`h-10 rounded-xl text-xs font-medium border transition-all cursor-pointer ${isActive
                                                    ? 'bg-[#1C1B2E] border-indigo-500 text-zinc-100'
                                                    : 'bg-[#16161A] border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20'
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#121215] border border-white/10 rounded-2xl shadow-none">
                    <CardContent className="p-5 sm:p-6 space-y-5">
                        <div className="flex items-center gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-indigo-500" />
                            <h2 className="text-sm font-semibold text-zinc-100">
                                2. Location, Compensation &amp; Timeline
                            </h2>
                        </div>

                        <div className="flex items-center justify-between gap-4 p-3.5 rounded-xl bg-[#17171B] border border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                                    <Globe className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm font-medium text-zinc-100">
                                        Remote Work Allowed <span className="text-zinc-400 font-normal">(isRemote)</span>
                                    </p>
                                    <p className="text-xs text-zinc-400">
                                        Enable worldwide or distributed candidate applications
                                    </p>
                                </div>
                            </div>
                            <Switch
                                checked={isRemote}
                                onCheckedChange={setIsRemote}
                                className="data-[state=checked]:bg-indigo-500 cursor-pointer"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="location" className="text-xs font-medium text-zinc-300">
                                        Job Location <span className="text-zinc-400 font-normal">(location)</span>
                                    </Label>
                                    <span className="text-xs text-zinc-400">Required</span>
                                </div>
                                <div className="relative">
                                    <MapPin className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <Input
                                        id="location"
                                        name="location"
                                        placeholder="New York, USA"
                                        className="h-11 bg-[#18181C] border-white/10 rounded-xl pl-10 pr-3.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-indigo-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="deadline" className="text-xs font-medium text-zinc-300">
                                    Application Deadline <span className="text-zinc-400 font-normal">(deadline)</span>
                                </Label>
                                <div className="relative">
                                    <Calendar className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <Input
                                        id="deadline"
                                        name="deadline"
                                        type="date"
                                        className="h-11 bg-[#18181C] border-white/10 rounded-xl pl-10 pr-3.5 text-sm text-zinc-100 focus-visible:ring-indigo-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="minSalary" className="text-xs font-medium text-zinc-300">
                                    Min Salary / Rate
                                </Label>
                                <div className="relative">
                                    <span className="text-xs text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                        $
                                    </span>
                                    <Input
                                        id="minSalary"
                                        name="minSalary"
                                        type="number"
                                        placeholder="25"
                                        className="h-11 bg-[#18181C] border-white/10 rounded-xl pl-7 pr-3.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-indigo-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="maxSalary" className="text-xs font-medium text-zinc-300">
                                    Max Salary / Rate
                                </Label>
                                <div className="relative">
                                    <span className="text-xs text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                        $
                                    </span>
                                    <Input
                                        id="maxSalary"
                                        name="maxSalary"
                                        type="number"
                                        placeholder="40"
                                        className="h-11 bg-[#18181C] border-white/10 rounded-xl pl-7 pr-3.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-indigo-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-medium text-zinc-300">
                                    Frequency
                                </Label>
                                <Select value={frequency} onValueChange={(val) => setFrequency(val ?? '')}>
                                    <SelectTrigger className="h-11 w-full bg-[#18181C] border-white/10 rounded-xl px-3.5 text-sm text-zinc-100 focus:ring-indigo-500">
                                        <SelectValue placeholder="per hour" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#18181C] border-white/10 text-zinc-100">
                                        <SelectItem value="per hour">per hour</SelectItem>
                                        <SelectItem value="per month">per month</SelectItem>
                                        <SelectItem value="per year">per year</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#121215] border border-white/10 rounded-2xl shadow-none">
                    <CardContent className="p-5 sm:p-6 space-y-5">
                        <div className="flex items-center gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-indigo-500" />
                            <h2 className="text-sm font-semibold text-zinc-100">
                                3. Responsibilities &amp; Requirements
                            </h2>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="responsibilities" className="text-xs font-medium text-zinc-300">
                                Key Responsibilities <span className="text-indigo-400">*</span>
                            </Label>
                            <Textarea
                                id="responsibilities"
                                name="responsibilities"
                                rows={3}
                                placeholder="Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products."
                                className="bg-[#18181C] border-white/10 rounded-xl p-3.5 text-sm text-zinc-200 placeholder:text-zinc-500 leading-relaxed focus-visible:ring-indigo-500 resize-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="requirements" className="text-xs font-medium text-zinc-300">
                                Qualifications &amp; Requirements <span className="text-indigo-400">*</span>
                            </Label>
                            <Textarea
                                id="requirements"
                                name="requirements"
                                rows={4}
                                placeholder={`• 3+ years of experience with React, TypeScript, and modern state architectures\n• Solid understanding of DOM performance and component-driven designs\n• Experience partnering closely with product teams and UI/UX designers`}
                                className="bg-[#18181C] border-white/10 rounded-xl p-3.5 text-sm text-zinc-200 placeholder:text-zinc-500 leading-relaxed focus-visible:ring-indigo-500 resize-none"
                            />
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
};

export default NewJobPage;