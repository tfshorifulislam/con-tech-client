'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PostsCard from '@/components/PostsCard'
import LoadingCSR from '@/components/LoadingForCSR'

const HomePage = () => {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchPosts = async () => {

      try {

        const res = await axios.get(
          'http://localhost:5000/api/posts'
        )

        setPosts(res.data.posts)

      } catch (error) {

        console.error(error)

      } finally {

        setLoading(false)

      }

    }

    fetchPosts()

  }, [])

  if (loading) {
    return <LoadingCSR />
  }

  return (
    <div
      className="
            w-[95%]
            max-w-[1920px]
            mx-auto
            py-4

            columns-2
            sm:columns-2
            md:columns-3
            xl:columns-4
            2xl:columns-5

            gap-[4px]
            md:gap-4
        "
    >

      {
        posts.map(post => (
          <div
            key={post._id}
            className="
                        mb-[4px]
                        md:mb-4
                        break-inside-avoid
                    "
          >
            <PostsCard post={post} />
          </div>
        ))
      }

    </div>
  )
}

export default HomePage