'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const SignUpPage = () => {
    const router = useRouter();

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signUp.email({
            email: user.email as string,
            password: user.password as string,
            name: user.name as string,
            image: user.image as string,
        });

        if (error) {
            toast.error(error.message || "Sign Up Failed! Something went wrong.");
            return;
        }

        if (data) {
            toast.success("Account created successfully!");
            router.push('/');
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 flex items-center justify-center py-16">
            <Card className="w-full max-w-md bg-white/90 dark:bg-[#161618] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl backdrop-blur-md p-2 transition-colors duration-200">
                <CardHeader className="text-center pb-4 pt-6">
                    <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Create an Account
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Join HireLoop to find your next dream job
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 pb-6">
                    <form onSubmit={handleSignUp} className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                Full Name
                            </Label>
                            <Input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                className="w-full h-12 bg-gray-100/80 dark:bg-black/20 border-gray-200 dark:border-white/10 rounded-xl px-4 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus-visible:ring-indigo-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                Email Address
                            </Label>
                            <Input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                className="w-full h-12 bg-gray-100/80 dark:bg-black/20 border-gray-200 dark:border-white/10 rounded-xl px-4 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus-visible:ring-indigo-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                Image URL
                            </Label>
                            <Input
                                type="url"
                                name="image"
                                placeholder="Your Image URL"
                                className="w-full h-12 bg-gray-100/80 dark:bg-black/20 border-gray-200 dark:border-white/10 rounded-xl px-4 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus-visible:ring-indigo-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                Password
                            </Label>
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    id="show-signup-pass"
                                    className="peer hidden"
                                    onChange={(e) => {
                                        const input = document.getElementById("password-input") as HTMLInputElement;
                                        if (input) {
                                            input.type = e.target.checked ? "text" : "password";
                                        }
                                    }}
                                />
                                <Input
                                    id="password-input"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full h-12 bg-gray-100/80 dark:bg-black/20 border-gray-200 dark:border-white/10 rounded-xl px-4 pr-16 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus-visible:ring-indigo-500"
                                />
                                <label
                                    htmlFor="show-signup-pass"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-indigo-500 select-none z-10"
                                >
                                    <span className="inline peer-checked:hidden">Show</span>
                                    <span className="hidden peer-checked:inline">Hide</span>
                                </label>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full cursor-pointer h-12 bg-linear-to-r from-[#635BFF] to-[#7A73FF] hover:opacity-90 text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 mt-2"
                        >
                            Create Account
                        </Button>
                    </form>

                    <p className="text-center text-xs text-gray-600 dark:text-gray-400 pt-4">
                        Already have an account?{' '}
                        <Link
                            href="/signin"
                            className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default SignUpPage;