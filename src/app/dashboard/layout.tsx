import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "../components/DashboardSidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <DashboardSidebar />
                <main className="flex-1 flex flex-col">
                    <header className="flex h-14 items-center border-b px-4 lg:h-15 lg:px-6">
                        <SidebarTrigger />
                    </header>
                    <div className="p-6 flex-1">{children}</div>
                </main>
            </div>
        </SidebarProvider>
    );
}