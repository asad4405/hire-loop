import Image from "next/image";

const Banner = () => {
    return (
        <div className="relative w-full overflow-hidden flex flex-col items-center pt-8 pb-16">

            <div className="absolute inset-0 -z-30 flex justify-center items-start pointer-events-none">
                <Image
                    src="/assets/images/cta-bg.png"
                    alt="CTA Background"
                    fill
                    priority
                    className="object-cover opacity-90 dark:opacity-70"
                />
            </div>

            <div className="absolute inset-x-0 bottom-12 -z-20 flex justify-center items-center pointer-events-none">
                <Image
                    src="/assets/images/globe.png"
                    alt="World Globe Background"
                    width={1100}
                    height={650}
                    className="w-full max-w-5xl h-auto object-contain opacity-85"
                />
            </div>

            <div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-[#18181b]/90 border border-gray-200 dark:border-white/10 px-5 py-2 rounded-full shadow-2xl mb-6 backdrop-blur-md z-10 transition-colors duration-200">
                <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 tracking-wider">
                    <strong className="text-gray-900 dark:text-white font-semibold">50,000+</strong> NEW JOBS THIS MONTH
                </span>
            </div>

            <div className="text-center max-w-3xl px-4 z-10">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight transition-colors duration-200">
                    Find Your Dream Job Today
                </h1>
                <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 font-normal leading-relaxed max-w-2xl mx-auto transition-colors duration-200">
                    HireLoop connects top talent with world-class companies. Browse thousands of curated opportunities and land your next role — faster.
                </p>
            </div>

            <div className="mt-8 w-full max-w-2xl px-4 z-10">
                <div className="bg-white/90 dark:bg-[#161618] border border-gray-200 dark:border-white/10 rounded-2xl p-2 flex flex-col sm:flex-row items-center gap-2 shadow-2xl backdrop-blur-md transition-colors duration-200">
                    <div className="flex items-center gap-3 w-full px-4 py-3 bg-gray-100/80 dark:bg-black/20 rounded-xl transition-colors duration-200">
                        <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Job title, skill or company"
                            className="w-full bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
                        />
                    </div>

                    <div className="hidden sm:block h-6 w-px bg-gray-300 dark:bg-white/10" />

                    <div className="flex items-center gap-3 w-full px-4 py-3 bg-gray-100/80 dark:bg-black/20 rounded-xl transition-colors duration-200">
                        <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Location or Remote"
                            className="w-full bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
                        />
                    </div>

                    <button className="w-full sm:w-auto bg-linear-to-r from-[#635BFF] to-[#7A73FF] hover:opacity-90 text-white p-3.5 rounded-xl flex items-center justify-center transition-all duration-200 shadow-lg shadow-indigo-500/20 shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-medium">Trending Position:</span>
                    {["Product Designer", "AI Engineering", "Dev-ops Engineer"].map((tag) => (
                        <span
                            key={tag}
                            className="bg-white/80 dark:bg-[#1a1a1c] border border-gray-200 dark:border-white/10 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300 hover:border-indigo-500 transition-colors cursor-pointer shadow-xs"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="w-full mt-28 text-center px-4 pb-32 z-10">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight transition-colors duration-200">
                    Assisting over <span className="text-indigo-600 dark:text-indigo-400 font-bold">15,000 job seekers</span>
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-200">
                    find their dream positions.
                </p>
            </div>

            <div className="w-full max-w-6xl px-4 z-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { icon: "briefcase", value: "50K", label: "Active Jobs" },
                        { icon: "building", value: "12K", label: "Companies" },
                        { icon: "users", value: "2M", label: "Job Seekers" },
                        { icon: "star", value: "97%", label: "Satisfaction Rate" },
                    ].map((stat, idx) => (
                        <div
                            key={idx}
                            className="bg-white/90 dark:bg-[#161618]/90 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-indigo-500/50 transition-all duration-200"
                        >
                            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                {stat.icon === "briefcase" && (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                )}
                                {stat.icon === "building" && (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                )}
                                {stat.icon === "users" && (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                )}
                                {stat.icon === "star" && (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                )}
                            </div>
                            <div className="mt-8">
                                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors duration-200">
                                    {stat.value}
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium transition-colors duration-200">
                                    {stat.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Banner;