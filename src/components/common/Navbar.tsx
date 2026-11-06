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
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#121212]/80 backdrop-blur-md p-4 flex justify-center items-center">
      <div className="w-full max-w-6xl bg-[#1c1c1e] border border-white/5 rounded-2xl p-4 flex items-center justify-between shadow-2xl relative">
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/images/logo.png"
            alt="HireLoop Logo"
            width={140}
            height={40}
            priority
            className="h-auto w-auto max-h-8 object-contain"
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
                  className={`transition-colors duration-200 ${
                    isActive ? 'text-[#0093ff]' : 'text-white hover:text-[#0093ff]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="h-4 w-px bg-gray-700/60 mx-1" />

          <div className="flex items-center gap-4">
            <Link
              href="/signin"
              className="text-sm font-medium text-[#7c7fff] hover:text-[#9093ff] transition-colors"
            >
              Sign In
            </Link>

            <Link
              href="/get-started"
              className="bg-linear-to-r from-[#635BFF] to-[#7A73FF] hover:opacity-90 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/20"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="md:hidden flex items-center">
          <label htmlFor="mobile-menu-toggle" className="cursor-pointer p-2 text-white hover:text-[#0093ff] transition-colors">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
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

          <div className="absolute top-full right-0 mt-2 w-56 bg-[#1c1c1e] border border-white/10 rounded-xl p-4 shadow-xl hidden peer-checked:flex flex-col gap-3 z-50">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive ? 'text-[#0093ff]' : 'text-white hover:text-[#0093ff]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <hr className="border-gray-800 my-1" />
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