"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Briefcase, FileText, Settings } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession } from "@/lib/auth-client";

const menuItemsByRole = {
    seeker: [
        { name: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
        { name: "Applications", url: "/dashboard/applications", icon: FileText },
        { name: "Settings", url: "/dashboard/settings", icon: Settings },
    ],
    recruiter: [
        { name: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
        { name: "Manage Jobs", url: "/dashboard/jobs", icon: Briefcase },
        { name: "Applications", url: "/dashboard/applications", icon: FileText },
        { name: "Settings", url: "/dashboard/settings", icon: Settings },
    ],
    admin: [
        { name: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
        { name: "Manage Jobs", url: "/dashboard/jobs", icon: Briefcase },
        { name: "Applications", url: "/dashboard/applications", icon: FileText },
        { name: "Settings", url: "/dashboard/settings", icon: Settings },
    ],
};

export function DashboardSidebar() {
    const { data: session } = useSession();
    const pathname = usePathname();

    const role = (session?.user?.role as keyof typeof menuItemsByRole) || "seeker";
    const menuItems = menuItemsByRole[role] || menuItemsByRole.seeker;

    return (
        <Sidebar>
            <SidebarHeader className="border-b px-6 py-4 font-bold text-lg">
                Job Portal
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {menuItems.map((item) => {
                            const isActive = pathname === item.url;
                            return (
                                <SidebarMenuItem key={item.name}>
                                    <SidebarMenuButton isActive={isActive}>
                                        <Link href={item.url} className="flex items-center gap-3 w-full">
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.name}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
}