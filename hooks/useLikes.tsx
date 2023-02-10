import { User } from "@supabase/supabase-js"
import { useState, useEffect } from "react"
import { supabase } from "../lib/initSupabase"

export type Like = {
    id: number
    inserted_at: Date
    snippet_id: number
    user_id: string
  }

export const useLikes = (user: User) => {
    const [loading, setLoading] = useState(true);
    const [likes, setLikes] = useState<Array<Like>>([]);
    useEffect(() => {
        if(user && loading) {
            fetchLikes(user);
        }
    }, [])


    const fetchLikes = async (user: User) => {
        const { data: userLikes, error } = await supabase
        .from<Like>('likes')
        .select('*')
        .eq('user_id', user!.id)
        if (error) {
            console.log('error', error)
        } else {
            console.log('fetching')
            setLikes(userLikes)
        }
    }

    const isLiked = async(snippet_id: number) => {
        const { data: like, error } = await supabase
        .from<Like>('likes')
        .select('*')
        .eq('user_id', user!.id)
        .eq('snippet_id', snippet_id)
        if (error) {
        console.log('error', error)
        } else {
        return like.length > 0 ; 
        }
    }

    const addLike = async (snippet_id: number) => {
        console.log('newLike:', snippet_id)
        const { data: like, error } = await supabase
        .from<Like>('likes')
        .insert({ snippet_id: snippet_id, user_id: user!.id })
        .single()
        if (error) {
        console.log(error.message)
        } else {
        console.log('liked!')
        return like;
        }
    }

    const removeLike = async (snippet_id: number) => {
        console.log('removedLike:', snippet_id)
        const { data: like, error} = await supabase
        .from<Like>('likes')
        .delete()
        .eq('user_id', user!.id)
        .eq('snippet_id', snippet_id)
        if(error) {
        console.log('error', error)
        } else {
        return like;
        }    
    }

    return {likes, isLiked, addLike, removeLike}
}


