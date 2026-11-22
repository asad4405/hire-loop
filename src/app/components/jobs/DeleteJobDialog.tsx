"use client";
import { Trash2, Trash2Icon } from "lucide-react"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { jobType } from "@/types/jobType"
import { deleteJob } from "@/lib/actions/job"
import { useState } from "react"
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function DeleteJobDialog({
    job,
    onDeleted,
}: {
    job: jobType;
    onDeleted?: (id: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!job._id) return;
        try {
            const res = await deleteJob(job._id);
            console.log(job._id, res);
            if (res.deletedCount) {
                setOpen(false);
                toast.success('Job deleted successfully!');
                onDeleted?.(job._id);
                router.refresh();
            }
        } catch (error) {
            console.error('Failed to delete job:', error);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger
                render={<Button variant="destructive"><Trash2 className="w-3.5 h-3.5" /></Button>}
            />
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Delete job post?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete <strong>{job.title}</strong> from your job listings.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}