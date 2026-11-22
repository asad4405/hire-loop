export async function createJob(jobsData: Record<string, unknown>) {
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