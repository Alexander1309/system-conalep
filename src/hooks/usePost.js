import { useState, useEffect } from 'react'
import { get } from '../lib/http'

export const usePost = workArea  => {
    const [posts, setPosts] = useState(null)
    
    const getPosts = async route => {
        const resPosts = await get(`dashboard/posts/${route}`)
        setPosts(resPosts)
    }

    useEffect(() => {
        getPosts(workArea)
    }, [workArea])

    return {
        posts,
        getPosts
    }
}