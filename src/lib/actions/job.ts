import { jobType } from "@/types/jobType";

export async function createJob(jobsData: jobType) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobsData),
    });

    if (!res.ok) {
        throw new Error('Failed to create job');
    }

    return res.json();
}


export async function getJobs(): Promise<jobType[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch jobs');
    }

    return res.json();
}


export async function deleteJob(jobsId: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs/${jobsId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return res.json();
}