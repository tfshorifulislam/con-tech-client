'use client'

import { Card } from '@heroui/react'
import Image from 'next/image'
import React from 'react'

const PostsCard = ({ post }) => {

    return (
        <Card
            className="
            bg-red-800
                w-full
                overflow-hidden
                rounded-[22px]
                bg-transparent
                shadow-none
                break-inside-avoid
                group
                cursor-pointer
                mb-5
            "
        >

            {/* Pinterest Natural Ratio */}
            <div
                className="
                    relative
                    w-full
                    overflow-hidden
                    rounded-[22px]
                    bg-zinc-100
                    dark:bg-zinc-900
                "
            >

                <Image
                    alt={post?.text || 'Post Image'}
                    src={post?.imageUrl}
                    width={1200}
                    height={1200}
                    loading="lazy"
                    quality={75}
                    sizes="
                        (max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw
                    "
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

        </Card>
    )
}

export default PostsCard