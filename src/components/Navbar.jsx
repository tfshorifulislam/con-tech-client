"use client";

import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { Button } from "@heroui/react";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-black/60 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800">

            <div className="w-11/12 mx-auto flex items-center h-14">

                {/* LEFT - LOGO */}
                <div className="shrink-0">
                    <Link
                        href="/"
                        className="text-xl font-semibold tracking-tight"
                    >
                        Novra
                    </Link>
                </div>

                {/* CENTER - SEARCH (Pinterest style full flex) */}
                <div className="flex-1 px-4">
                    <div className="relative w-full">

                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />

                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full rounded-lg bg-neutral-100 dark:bg-neutral-900 pl-11 pr-4 py-2 text-sm outline-none border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 focus:bg-white dark:focus:bg-neutral-950 transition" />
                    </div>
                </div>

                {/* RIGHT - ICONS */}
                <div className="flex items-center gap-3 shrink-0">
                    <Button
                        variant="outline"
                        className="rounded-lg">
                        <Link href={'/login'}>
                            Login
                        </Link>
                    </Button>
                </div>

            </div>
        </header>
    );
}