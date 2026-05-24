"use client";

import React from "react";
import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

const LoginPage = () => {


    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signIn.email({
            email: user?.email,
            password: user?.password,
        });

        if (data) {
            toast.success(`Welcome Back!`);
            redirect('/');
        }

        if (error) {
            toast.error('Invalid email or password');
        }
    };

    const handleLoginWithGoogle = async () => {
        await authClient.signIn.social({
            provider: 'google'
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-neutral-950">

            <div className="w-full max-w-md rounded-3xl border border-neutral-200 dark:border-neutral-800 p-7">

                {/* HEADER */}
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">
                        Welcome back
                    </h1>
                    <p className="text-sm text-neutral-500 mt-1">
                        Login to continue
                    </p>
                </div>

                {/* FORM */}
                <Form className="flex flex-col gap-5" onSubmit={onSubmit}>

                    {/* EMAIL */}
                    <TextField isRequired name="email" type="email">
                        <Label>Email</Label>
                        <Input className="mt-2" placeholder="john@example.com" />
                        <FieldError />
                    </TextField>

                    {/* PASSWORD */}
                    <TextField isRequired name="password" type="password">
                        <div className="flex justify-between items-center">
                            <Label>Password</Label>

                        </div>

                        <Input className="mt-2" placeholder="Enter password" />
                        <Description className="text-xs mt-1">
                            8+ chars, 1 uppercase, 1 number
                        </Description>
                        <FieldError />
                        <div className="flex justify-end ">
                            <button type="button" className="text-xs cursor-pointer text-neutral-500 hover:text-black dark:hover:text-white">
                                Forgot Password?
                            </button>
                        </div>
                    </TextField>

                    {/* BUTTON */}
                    <Button type="submit"
                        className="h-11 w-full rounded-2xl bg-black text-white dark:bg-white dark:text-black">
                        Login
                    </Button>
                </Form>

                {/* DIVIDER */}
                <div className="my-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
                    <span className="text-xs text-neutral-500">OR</span>
                    <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
                </div>

                {/* GOOGLE */}
                <button
                onClick={handleLoginWithGoogle}
                className="w-full h-11 flex items-center justify-center gap-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                    <FcGoogle className="text-xl" />
                    <span className="text-sm">Continue with Google</span>
                </button>

                {/* FOOTER */}
                <p className="text-center text-sm text-neutral-500 mt-6">
                    Don&apos;t have an account?{" "}
                    <Link href={'/signup'} className="text-black dark:text-white font-medium cursor-pointer">
                        Sign up
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default LoginPage;