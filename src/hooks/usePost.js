import { useState, useEffect } from 'react'
import { get } from '../lib/http'

export const usePost = workArea  => {
    const [posts, setPosts] = useState(null)
    const [resultSearch, setResultSearch] = useState(null)
    
    const getPosts = async route => {
        const resPosts = await get(`dashboard/posts/${route}`)
        setPosts(resPosts.reverse())
    }

    const searchPosts = query => {
        const result = posts.filter(post => post.title.toLowerCase().includes(query) || new Date(post.created_on).toLocaleDateString().includes(query) || post.fileName.split('.').reverse()[0].includes(query))
        setResultSearch(result)
    }

    useEffect(() => {
        getPosts(workArea)
    }, [workArea])

    return {
        posts,
        resultSearch,
        getPosts,
        searchPosts
    }
}