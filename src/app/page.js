'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PostsCard from '@/components/PostsCard'

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
    return <p>Loading...</p>
  }

  return (
    <div
      className="
            w-[95%]
            
            mx-auto
            py-8

            columns-2
            sm:columns-2
            md:columns-3
            lg:columns-4
            xl:columns-5

            gap-5
            space-y-5
        "
    >

      {
        posts.map(post => (

          <div
            key={post._id}
            className="
                        break-inside-avoid
                        mb-5
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