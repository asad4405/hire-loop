'use client';

import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';

const Navbar = () => {
    const pathname = usePathname();

    const navLinks = [
        { name: 'Browse Jobs', href: '/jobs' },
        { name: 'Company', href: '/company' },
        { name: 'Pricing', href: '/pricing' },
    ];

    const router = useRouter();
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Signed out successfully!");
                    router.push("/signin"); 
                },
            },
        });
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 pt-4 px-4 flex justify-center items-center pointer-events-none">
            <div className="w-full max-w-7xl mx-auto bg-white/80 dark:bg-[#1c1c1e]/80 backdrop-blur-md border border-gray-200 dark:border-white/5 rounded-2xl py-2 px-4 flex items-center justify-between shadow-2xl pointer-events-auto transition-colors duration-200">
                <Link href="/" className="flex items-center">
                    <Image
                        src="/assets/images/logo.png"
                        alt="HireLoop Logo"
                        width={130}
                        height={36}
                        priority
                        className="h-auto w-auto max-h-7 object-contain"
                    />
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    <div className="flex items-center gap-6 text-sm font-medium">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`transition-colors duration-200 ${isActive
                                            ? 'text-[#0093ff]'
                                            : 'text-gray-700 dark:text-white hover:text-[#0093ff]'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="h-4 w-px bg-gray-300 dark:bg-gray-700/60 mx-1" />

                    <div className="flex items-center gap-4">
                        <label
                            htmlFor="theme-toggle-desktop"
                            className="cursor-pointer p-1.5 text-gray-700 dark:text-gray-200 hover:text-[#0093ff] transition-colors"
                            title="Toggle Theme"
                        >
                            <svg
                                className="w-5 h-5 hidden dark:block"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                            </svg>
                            <svg
                                className="w-5 h-5 block dark:hidden"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                />
                            </svg>
                        </label>
                        <input
                            type="checkbox"
                            id="theme-toggle-desktop"
                            className="hidden"
                            defaultChecked={true}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    document.documentElement.classList.add('dark');
                                } else {
                                    document.documentElement.classList.remove('dark');
                                }
                            }}
                        />

                        {user ? (
                            <div className="relative group">
                                <div className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                                    {user.image ? (
                                        <Image
                                            src={user.image}
                                            alt={user.name || "User"}
                                            width={36}
                                            height={36}
                                            className="w-9 h-9 rounded-full object-cover border border-gray-200 dark:border-white/10"
                                        />
                                    ) : (
                                        <div className="w-9 h-9 rounded-full bg-linear-to-r from-[#635BFF] to-[#7A73FF] text-white flex items-center justify-center font-bold text-xs">
                                            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                                        </div>
                                    )}
                                </div>
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#1c1c1e] border border-gray-200 dark:border-white/10 rounded-xl p-2 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col gap-1 z-50">
                                    <div className="px-3 py-2 border-b border-gray-100 dark:border-white/5">
                                        <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{user.name}</p>
                                        <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                                    </div>
                                    <Link
                                        href="/profile"
                                        className="w-full text-left px-3 py-2 text-xs font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handleSignOut}
                                        className="w-full text-left px-3 py-2 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/signin"
                                    className="text-sm font-medium text-[#7c7fff] hover:text-[#9093ff] transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/signup"
                                    className="bg-linear-to-r from-[#635BFF] to-[#7A73FF] hover:opacity-90 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/20"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                <div className="md:hidden flex items-center gap-2">
                    <label
                        htmlFor="theme-toggle-mobile"
                        className="cursor-pointer p-1.5 text-gray-700 dark:text-gray-200 hover:text-[#0093ff] transition-colors"
                        title="Toggle Theme"
                    >
                        <svg
                            className="w-5 h-5 hidden dark:block"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                        </svg>
                        <svg
                            className="w-5 h-5 block dark:hidden"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                            />
                        </svg>
                    </label>
                    <input
                        type="checkbox"
                        id="theme-toggle-mobile"
                        className="hidden"
                        defaultChecked={true}
                        onChange={(e) => {
                            if (e.target.checked) {
                                document.documentElement.classList.add('dark');
                            } else {
                                document.documentElement.classList.remove('dark');
                            }
                        }}
                    />

                    <label
                        htmlFor="mobile-menu-toggle"
                        className="cursor-pointer p-1.5 text-gray-700 dark:text-white hover:text-[#0093ff] transition-colors"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </label>
                    <input type="checkbox" id="mobile-menu-toggle" className="peer hidden" />

                    <div className="absolute top-full right-4 mt-2 w-56 bg-white dark:bg-[#1c1c1e] border border-gray-200 dark:border-white/10 rounded-xl p-4 shadow-xl hidden peer-checked:flex flex-col gap-3 z-50 transition-colors duration-200">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`text-sm font-medium transition-colors ${isActive
                                            ? 'text-[#0093ff]'
                                            : 'text-gray-700 dark:text-white hover:text-[#0093ff]'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                        <hr className="border-gray-200 dark:border-gray-800 my-1" />
                        {user ? (
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 py-1">
                                    {user.image ? (
                                        <Image
                                            src={user.image}
                                            alt={user.name || "User"}
                                            width={32}
                                            height={32}
                                            className="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-white/10"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-linear-to-r from-[#635BFF] to-[#7A73FF] text-white flex items-center justify-center font-bold text-xs">
                                            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                                        </div>
                                    )}
                                    <div className="overflow-hidden">
                                        <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{user.name}</p>
                                        <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleSignOut}
                                    className="w-full text-left text-xs font-medium text-red-600 dark:text-red-400 hover:underline py-1 cursor-pointer"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/signin"
                                    className="text-sm font-medium text-[#7c7fff] hover:text-[#9093ff] transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/get-started"
                                    className="bg-linear-to-r from-[#635BFF] to-[#7A73FF] hover:opacity-90 text-white text-sm font-medium px-4 py-2 rounded-lg text-center transition-all duration-200"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;