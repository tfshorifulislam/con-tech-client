'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { authClient } from '@/lib/auth-client'
import LoadingCSR from '@/components/LoadingForCSR'

const ProfilePage = () => {

    const { data: session } = authClient.useSession()

    const currentUser = session?.user

    const [posts, setPosts] = useState([])
    const [activeTab, setActiveTab] = useState('posts')
    const [loading, setLoading] = useState(true)

    // FETCH USER POSTS
    useEffect(() => {

        if (!currentUser?.id || !currentUser?.email) return

        const fetchPosts = async () => {

            try {

                const res = await fetch(
                    'http://localhost:5000/api/posts'
                )

                const data = await res.json()

                // MATCH POSTS WITH CURRENT USER
                const matchedPosts = data?.posts?.filter(post =>

                    post.userId === currentUser.id &&
                    post.userEmail === currentUser.email

                )

                setPosts(matchedPosts || [])

            } catch (error) {

                console.log(error)

            } finally {

                setLoading(false)

            }

        }

        fetchPosts()

    }, [currentUser])

    // LOADING
    if (loading) {
        return <LoadingCSR />
    }

    return (

        <div className="min-h-screen bg-white dark:bg-black">

            {/* MAIN CONTAINER */}
            <div className="w-full max-w-6xl mx-auto px-4 md:px-8">

                {/* PROFILE HEADER */}
                <div
                    className="
                        flex
                        flex-col
                        md:flex-row
                        gap-10
                        md:gap-16
                        pt-10
                        md:pt-14
                    "
                >

                    {/* PROFILE IMAGE */}
                    <div className="flex justify-center md:justify-start">

                        <div
                            className="
            relative
            w-28
            h-28
            md:w-40
            md:h-40
            rounded-full
            overflow-hidden
            border
            border-zinc-200
            dark:border-zinc-800
            shrink-0
        "
                        >

                            <Image
                                src={
                                    currentUser?.image ||
                                    'https://i.pravatar.cc/300'
                                }
                                alt={currentUser?.name || 'user'}
                                fill
                                priority
                                quality={100}
                                unoptimized
                                sizes="160px"
                                className="object-cover"
                            />

                        </div>

                    </div>

                    {/* PROFILE INFO */}
                    <div className="flex-1">

                        {/* TOP SECTION */}
                        <div
                            className="
                                flex
                                flex-col
                                md:flex-row
                                md:items-start
                                md:justify-between
                                gap-6
                            "
                        >

                            {/* USER DETAILS */}
                            <div>

                                <h1
                                    className="
                                        text-2xl
                                        md:text-3xl
                                        font-normal
                                        text-black
                                        dark:text-white
                                    "
                                >
                                    {currentUser?.name}
                                </h1>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        text-zinc-500
                                    "
                                >
                                    {currentUser?.email}
                                </p>

                                {/* BIO */}
                                <p
                                    className="
                                        mt-4
                                        max-w-xl
                                        text-sm
                                        leading-relaxed
                                        text-zinc-700
                                        dark:text-zinc-300
                                    "
                                >
                                    Frontend developer building modern web
                                    experiences ✨ Passionate about React,
                                    Next.js & UI/UX design.
                                </p>

                                {/* STATS */}
                                <div
                                    className="
                                        flex
                                        gap-6
                                        mt-5
                                        text-sm
                                    "
                                >

                                    <p>
                                        <span
                                            className="
                                                font-semibold
                                                text-black
                                                dark:text-white
                                            "
                                        >
                                            {posts.length}
                                        </span>{' '}
                                        <span className="text-zinc-500">
                                            posts
                                        </span>
                                    </p>

                                </div>

                            </div>

                            {/* ACTION BUTTONS */}
                            <div className="flex gap-3">

                                <button
                                    className="
                                        px-5
                                        h-9
                                        rounded-lg
                                        bg-zinc-100
                                        hover:bg-zinc-200
                                        dark:bg-zinc-900
                                        dark:hover:bg-zinc-800
                                        text-sm
                                        font-medium
                                        transition
                                    "
                                >
                                    Edit profile
                                </button>

                                <button
                                    className="
                                        px-5
                                        h-9
                                        rounded-lg
                                        bg-zinc-100
                                        hover:bg-zinc-200
                                        dark:bg-zinc-900
                                        dark:hover:bg-zinc-800
                                        text-sm
                                        font-medium
                                        transition
                                    "
                                >
                                    Share profile
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

                {/* TABS */}
                <div
                    className="
                        mt-12
                        border-t
                        border-zinc-200
                        dark:border-zinc-800
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            justify-center
                            gap-10
                        "
                    >

                        <button
                            onClick={() => setActiveTab('posts')}
                            className={`
                                h-14
                                text-xs
                                uppercase
                                tracking-widest
                                font-semibold
                                border-t
                                transition

                                ${activeTab === 'posts'
                                    ? 'border-black dark:border-white text-black dark:text-white'
                                    : 'border-transparent text-zinc-500'
                                }
                            `}
                        >
                            Posts
                        </button>

                        <button
                            onClick={() => setActiveTab('saved')}
                            className={`
                                h-14
                                text-xs
                                uppercase
                                tracking-widest
                                font-semibold
                                border-t
                                transition

                                ${activeTab === 'saved'
                                    ? 'border-black dark:border-white text-black dark:text-white'
                                    : 'border-transparent text-zinc-500'
                                }
                            `}
                        >
                            Saved
                        </button>

                    </div>

                </div>

                {/* POSTS GRID */}
                {
                    activeTab === 'posts' && (

                        <>
                            {
                                posts.length === 0 ? (

                                    <div
                                        className="
                                            py-24
                                            text-center
                                            text-zinc-500
                                        "
                                    >
                                        No posts yet.
                                    </div>

                                ) : (

                                    <div
                                        className="
                                            grid
                                            grid-cols-2
                                            md:grid-cols-3
                                            gap-1
                                            md:gap-2
                                        "
                                    >

                                        {
                                            posts.map(post => (

                                                <div
                                                    key={post._id}
                                                    className="
                                                        relative
                                                        aspect-square
                                                        overflow-hidden
                                                        bg-zinc-100
                                                        dark:bg-zinc-900
                                                        group
                                                        cursor-pointer
                                                    "
                                                >

                                                    {/* POST IMAGE */}
                                                    <Image
                                                        src={post.imageUrl}
                                                        alt={post.text || 'Post'}
                                                        fill
                                                        className="
                                                            object-cover
                                                            transition
                                                            duration-500
                                                            group-hover:scale-105
                                                        "
                                                    />

                                                </div>

                                            ))
                                        }

                                    </div>

                                )
                            }
                        </>

                    )
                }

            </div>

        </div>

    )
}

export default ProfilePage