'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();

    const navLinks = [
        { name: 'Browse Jobs', href: '/jobs' },
        { name: 'Company', href: '/company' },
        { name: 'Pricing', href: '/pricing' },
    ];

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
                        <Link
                            href="/signin"
                            className="text-sm font-medium text-[#7c7fff] hover:text-[#9093ff] transition-colors"
                        >
                            Sign In
                        </Link>

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

                        <Link
                            href="/get-started"
                            className="bg-linear-to-r from-[#635BFF] to-[#7A73FF] hover:opacity-90 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/20"
                        >
                            Get Started
                        </Link>
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
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;