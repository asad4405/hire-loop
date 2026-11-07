'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const SignInPage = () => {
    const router = useRouter();

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signIn.email({
            email: user.email as string,
            password: user.password as string,
        });

        if (error) {
            toast.error(error.message || "Sign In Failed! Something went wrong.");
            return;
        }

        if (data) {
            toast.success("Signed in successfully!");
            router.push('/');
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 flex items-center justify-center py-16">
            <Card className="w-full max-w-md bg-white/90 dark:bg-[#161618] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl backdrop-blur-md p-2 transition-colors duration-200">
                <CardHeader className="text-center pb-4 pt-6">
                    <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Welcome Back
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Sign in to your HireLoop account to continue
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 pb-6">
                    <form onSubmit={handleSignIn} className="space-y-5">
                        <div className="space-y-2">
                            <Label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                Email Address
                            </Label>
                            <Input
                                type="email"
                                name="email"
                                placeholder="name@example.com"
                                className="w-full h-12 bg-gray-100/80 dark:bg-black/20 border-gray-200 dark:border-white/10 rounded-xl px-4 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus-visible:ring-indigo-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                    Password
                                </Label>
                                <Link
                                    href="/forgot-password"
                                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    id="show-signin-pass"
                                    className="peer hidden"
                                    onChange={(e) => {
                                        const input = document.getElementById("signin-password-input") as HTMLInputElement;
                                        if (input) {
                                            input.type = e.target.checked ? "text" : "password";
                                        }
                                    }}
                                />
                                <Input
                                    id="signin-password-input"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full h-12 bg-gray-100/80 dark:bg-black/20 border-gray-200 dark:border-white/10 rounded-xl px-4 pr-16 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus-visible:ring-indigo-500"
                                />
                                <label
                                    htmlFor="show-signin-pass"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-indigo-500 select-none z-10"
                                >
                                    <span className="inline peer-checked:hidden">Show</span>
                                    <span className="hidden peer-checked:inline">Hide</span>
                                </label>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full cursor-pointer h-12 bg-linear-to-r from-[#635BFF] to-[#7A73FF] hover:opacity-90 text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25"
                        >
                            Sign In
                        </Button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <Separator className="w-full border-t border-gray-200 dark:border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white dark:bg-[#161618] px-2 text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full cursor-pointer h-11 flex items-center justify-center gap-2 bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 hover:border-indigo-500/50 rounded-xl text-xs font-medium text-gray-700 dark:text-gray-300 transition-colors"
                        >
                            Google
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full cursor-pointer h-11 flex items-center justify-center gap-2 bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 hover:border-indigo-500/50 rounded-xl text-xs font-medium text-gray-700 dark:text-gray-300 transition-colors"
                        >
                            GitHub
                        </Button>
                    </div>

                    <p className="text-center text-xs text-gray-600 dark:text-gray-400 pt-2">
                        Don&apos;t have an account?{' '}
                        <Link
                            href="/signup"
                            className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default SignInPage;