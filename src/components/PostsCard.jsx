'use client'

import { Card } from '@heroui/react'
import Image from 'next/image'
import React from 'react'

const PostsCard = ({ post }) => {

    return (
        <Card
            className="
                w-full
                overflow-hidden
                rounded-[24px]
                bg-transparent
                shadow-none
                break-inside-avoid
                group
                cursor-pointer
            "
        >

            {/* Pinterest Image */}
            <div
                className="
                    relative
                    w-full
                    overflow-hidden
                    rounded-[24px]
                    bg-zinc-100
                    dark:bg-zinc-900
                "
            >

                <Image
                    alt={post.text || 'Post Image'}
                    src={post.imageUrl}
                    width={1000}
                    height={1600}
                    loading="lazy"
                    sizes="
                        (max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw
                    "
                    className="
                        w-full
                        min-h-[260px]
                        max-h-[900px]

                        object-cover

                        transition-transform
                        duration-700

                        group-hover:scale-[1.04]
                    "
                />

            </div>

        </Card>
    )
}

export default PostsCard