import React from 'react'

const LoadingCSR = () => {

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black">

            <div className="flex flex-col items-center">

                {/* Spinner */}
                <div className="relative w-14 h-14">

                    <div className="absolute inset-0 rounded-full border-[3px] border-zinc-200 dark:border-zinc-800" />

                    <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-black dark:border-t-white animate-spin" />

                </div>

                {/* Text */}
                <p className="mt-5 text-xs uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
                    Loading
                </p>

            </div>

        </div>
    )
}

export default LoadingCSR