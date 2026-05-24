'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { authClient } from '@/lib/auth-client'

const ProfilePage = () => {

    const { data: session } = authClient.useSession()
    const currentUser = session?.user

    const [posts, setPosts] = useState([])
    const [activeTab, setActiveTab] = useState('posts')
    const [loading, setLoading] = useState(true)

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
            <div
                className="
                    min-h-screen
                    flex
                    items-center
                    justify-center
                    text-zinc-500
                    bg-white
                    dark:bg-black
                "
            >
                Loading...
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black">

            {/* COVER */}
            <div
                className="
                    relative
                    w-full
                    h-[240px]
                    md:h-[340px]
                    overflow-hidden
                "
            >

                <Image
                    src='https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop'
                    alt='cover'
                    fill
                    priority
                    className='object-cover'
                />

                {/* DARK OVERLAY */}
                <div className='absolute inset-0 bg-black/20' />

            </div>

            {/* CONTAINER */}
            <div
                className="
                    w-[95%]
                    max-w-[1920px]
                    mx-auto
                    relative
                "
            >

                {/* USER SECTION */}
                <div
                    className="
                        flex
                        flex-col
                        md:flex-row
                        md:items-end
                        gap-4
                        mt-[-60px]
                        md:mt-[-80px]
                        relative
                        z-20
                    "
                >

                    {/* PROFILE IMAGE */}
                    <div
                        className="
                            relative
                            w-32
                            h-32
                            md:w-40
                            md:h-40
                            rounded-full
                            overflow-hidden
                            border-4
                            border-white
                            dark:border-black
                            shadow-xl
                            bg-zinc-200
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
                            className='object-cover'
                        />

                    </div>

                    {/* USER INFO */}
                    <div className='pb-2 md:pb-4'>

                        <h1
                            className="
                                text-3xl
                                md:text-5xl
                                font-bold
                                text-black
                                dark:text-white
                                tracking-tight
                            "
                        >
                            {currentUser?.name}
                        </h1>

                        <p
                            className="
                                mt-2
                                text-zinc-500
                                text-sm
                                md:text-base
                            "
                        >
                            {currentUser?.email}
                        </p>

                        <p
                            className="
                                mt-3
                                text-sm
                                text-zinc-400
                            "
                        >
                            {posts.length} Posts
                        </p>

                    </div>

                </div>

                {/* TABS */}
                <div
                    className="
                        mt-10
                        flex
                        gap-10
                        border-b
                        border-zinc-200
                        dark:border-zinc-800
                    "
                >

                    <button
                        onClick={() => setActiveTab('posts')}
                        className={`
                            pb-4
                            text-sm
                            font-medium
                            transition-all

                            ${activeTab === 'posts'
                                ? 'border-b-2 border-black dark:border-white text-black dark:text-white'
                                : 'text-zinc-500 hover:text-black dark:hover:text-white'}
                        `}
                    >
                        Posts
                    </button>

                    <button
                        onClick={() => setActiveTab('saved')}
                        className={`
                            pb-4
                            text-sm
                            font-medium
                            transition-all

                            ${activeTab === 'saved'
                                ? 'border-b-2 border-black dark:border-white text-black dark:text-white'
                                : 'text-zinc-500 hover:text-black dark:hover:text-white'}
                        `}
                    >
                        Saved
                    </button>

                </div>

                {/* POSTS */}
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
                                            mt-8

                                            columns-2
                                            md:columns-3
                                            xl:columns-4
                                            2xl:columns-5

                                            gap-3
                                            md:gap-5

                                            space-y-3
                                            md:space-y-5
                                        "
                                    >

                                        {
                                            posts.map(post => (

                                                <div
                                                    key={post._id}
                                                    className="
                                                        break-inside-avoid
                                                        mb-3
                                                        md:mb-5
                                                        group
                                                        cursor-pointer
                                                    "
                                                >

                                                    {/* IMAGE */}
                                                    <div
                                                        className="
                                                            overflow-hidden
                                                            rounded-2xl
                                                            bg-zinc-100
                                                            dark:bg-zinc-900
                                                        "
                                                    >

                                                        <Image
                                                            src={post.imageUrl}
                                                            alt={post.text || 'Post'}
                                                            width={1000}
                                                            height={1600}
                                                            loading='lazy'
                                                            className="
                                                                w-full
                                                                h-auto
                                                                object-cover
                                                                transition-transform
                                                                duration-700
                                                                group-hover:scale-[1.03]
                                                            "
                                                        />

                                                    </div>

                                                    {/* TEXT */}
                                                    {
                                                        post?.text && (

                                                            <p
                                                                className="
                                                                    mt-3
                                                                    px-1
                                                                    text-sm
                                                                    font-medium
                                                                    leading-relaxed
                                                                    text-black
                                                                    dark:text-white
                                                                "
                                                            >
                                                                {post.text}
                                                            </p>

                                                        )
                                                    }

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