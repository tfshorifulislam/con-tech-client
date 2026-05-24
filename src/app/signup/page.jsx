"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

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
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);

    // IMAGE SELECT
    const handleImage = (e) => {
        const selectedFile = e.target.files?.[0];

        if (!selectedFile) return;

        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
    };

    // SIGNUP
    const onSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const formData = new FormData(e.currentTarget);

            const userData = Object.fromEntries(formData.entries());

            let imageUrl = "";

            // =========================
            // 1. Upload Image First
            // =========================

            if (file) {

                const imageData = new FormData();

                imageData.append("image", file);

                // dummy data for backend validation
                imageData.append("userName", userData.name);
                imageData.append("userEmail", userData.email);
                imageData.append("userId", "temp-user");

                const res = await fetch(
                    "http://localhost:5000/api/upload",
                    {
                        method: "POST",
                        body: imageData,
                    }
                );

                const uploadData = await res.json();

                if (!res.ok) {
                    toast.error(uploadData.message || "Image upload failed");
                    setLoading(false);
                    return;
                }

                imageUrl = uploadData.imageUrl;
            }

            // =========================
            // 2. Create User
            // =========================

            const { data, error } =
                await authClient.signUp.email({
                    name: userData.name,
                    email: userData.email,
                    password: userData.password,
                    image: imageUrl,
                });

            if (error) {
                toast.error(error.message || "Signup failed");
                setLoading(false);
                return;
            }

            toast.success(`Welcome ${userData.name}!`);

            window.location.href = "/";

        } catch (err) {

            console.error(err);

            toast.error(
                err?.message || "Something went wrong"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-neutral-950">

            <div className="w-full max-w-md rounded-3xl border border-neutral-200 dark:border-neutral-800 p-7">

                {/* HEADER */}
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">
                        Create account
                    </h1>

                    <p className="mt-1 text-sm text-neutral-500">
                        Sign up to get started
                    </p>
                </div>

                {/* FORM */}
                <Form
                    onSubmit={onSubmit}
                    className="flex flex-col gap-5"
                >

                    {/* NAME */}
                    <TextField isRequired name="name">
                        <Label>Name</Label>

                        <Input placeholder="John Doe" />

                        <FieldError />
                    </TextField>

                    {/* EMAIL */}
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                    >
                        <Label>Email</Label>

                        <Input placeholder="john@example.com" />

                        <FieldError />
                    </TextField>

                    {/* IMAGE */}
                    <div>

                        <label className="text-sm font-medium">
                            Profile Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImage}
                            className="
                                mt-2
                                block
                                w-full
                                rounded-xl
                                border
                                border-neutral-200
                                dark:border-neutral-800
                                px-3
                                py-2
                                text-sm
                            "
                        />

                        {
                            preview && (
                                <img
                                    src={preview}
                                    alt="preview"
                                    className="
                                        h-20
                                        w-20
                                        mt-4
                                        rounded-full
                                        object-cover
                                    "
                                />
                            )
                        }

                    </div>

                    {/* PASSWORD */}
                    <TextField
                        isRequired
                        name="password"
                        type="password"
                    >
                        <Label>Password</Label>

                        <Input placeholder="••••••••" />

                        <Description className="text-xs mt-1">
                            8+ chars required
                        </Description>

                        <FieldError />
                    </TextField>

                    {/* SUBMIT */}
                    <Button
                        type="submit"
                        isDisabled={loading}
                        className="
                            h-11
                            w-full
                            rounded-2xl
                            bg-black
                            text-white
                            dark:bg-white
                            dark:text-black
                        "
                    >
                        {
                            loading
                                ? "Creating..."
                                : "Create Account"
                        }
                    </Button>

                </Form>

                {/* DIVIDER */}
                <div className="my-6 flex items-center gap-3">

                    <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />

                    <span className="text-xs uppercase tracking-[2px] text-neutral-400">
                        OR
                    </span>

                    <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />

                </div>

                {/* GOOGLE */}
                <button
                    className="
                        flex
                        h-12
                        w-full
                        items-center
                        justify-center
                        gap-3
                        rounded-xl
                        border
                        border-neutral-200
                        dark:border-neutral-800
                    "
                >
                    <FcGoogle className="text-xl" />

                    Continue with Google
                </button>

                {/* FOOTER */}
                <p className="mt-6 text-center text-sm text-neutral-500">

                    Already have an account?{" "}

                    <Link
                        href="/login"
                        className="font-medium text-black dark:text-white"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}