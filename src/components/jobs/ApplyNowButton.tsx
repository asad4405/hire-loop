'use client';

import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';

interface ApplyNowButtonProps {
    jobId: string;
}

const ApplyNowButton = ({ jobId }: ApplyNowButtonProps) => {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    const handleApply = () => {
        if (!session?.user) {
            const jobPath = `/jobs/${encodeURIComponent(jobId)}`;
            router.push(`/signin?redirectTo=${encodeURIComponent(jobPath)}`);
        }
    };

    return (
        <Button
            onClick={handleApply}
            type="button"
            disabled={isPending}
            className="h-10 px-5 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 font-semibold text-xs sm:text-sm cursor-pointer"
        >
            Apply Now
        </Button>
    );
};

export default ApplyNowButton;
