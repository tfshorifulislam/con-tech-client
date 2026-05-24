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

    // FETCH POSTS
    useEffect(() => {

        if (!currentUser?.id || !currentUser?.email) return

        const fetchPosts = async () => {

            try {

                const res = await fetch(
                    'http://localhost:5000/api/posts'
                )

                const data = await res.json()

                // MATCH USER POSTS
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
        return (
            <LoadingCSR />
        )
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black">

            {/* MAIN CONTAINER */}
            <div
                className="
                    w-full max-w-6xl mx-auto px-4 md:px-8">

                {/* PROFILE HEADER */}
                <div
                    className="
                        flex flex-col md:flex-row gap-10 md:gap-16 pt-10 md:pt-14">

                    {/* PROFILE IMAGE */}
                    <div
                        className="flex justify-center md:justify-start">

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
                                    currentUser?.image
                                }
                                alt={currentUser?.name || 'user'}
                                fill
                                className='object-cover'
                            />

                        </div>

                    </div>

                    {/* PROFILE INFO */}
                    <div className='flex-1'>

                        {/* TOP */}
                        <div
                            className="flex flex-col md:flex-row md:items-center gap-5">

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
                            </div>

                            <div className='flex gap-3'>

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

                        {/* STATS */}
                        <div
                            className="
                                flex
                                gap-8
                                mt-7
                            "
                        >

                            <div>
                                <span className='font-semibold'>
                                    {posts.length}
                                </span>{' '}
                                <span className='text-zinc-500'>
                                    posts
                                </span>
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

                                ${activeTab === 'posts'
                                    ? 'border-black dark:border-white text-black dark:text-white'
                                    : 'border-transparent text-zinc-500'}
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

                                ${activeTab === 'saved'
                                    ? 'border-black dark:border-white text-black dark:text-white'
                                    : 'border-transparent text-zinc-500'}
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

                                                    {/* IMAGE */}
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

                                                    {/* HOVER OVERLAY */}
                                                    <div
                                                        className="
                                                            absolute
                                                            inset-0
                                                            bg-black/40
                                                            opacity-0
                                                            group-hover:opacity-100
                                                            transition
                                                            flex
                                                            items-center
                                                            justify-center
                                                        "
                                                    >

                                                        <div
                                                            className="
                                                                text-white
                                                                font-semibold
                                                                text-sm
                                                            "
                                                        >
                                                            ❤️ {post.likes || 0}
                                                        </div>

                                                    </div>

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