import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../lib/initSupabase";
import { useLikes } from './useLikes'

export const usePreferences = (user: User) => {
    const [loading, setLoading] = useState(true);
    const [metadata, setMetaData] = useState<Array<String>>([]);
    const [suggested, setSuggested] = useState<Array<number>>([]);
    const { likes } = useLikes(user)
    
    useEffect(() => {
        if(user && likes) {
            const likes_id = likes.map(like => like.snippet_id)
            preferredTopics(likes_id);
        }
    }, [])

    useEffect(() => {
        if(metadata) {
        }
    }, [metadata])


    const fetchPreferences = async(num: number) => {
        try {
            const {data: preferences, error} = await supabase
            .from("all_data")
            .select("subject")
            .eq("num", num)
            if(error) {
                throw error 
            } 
            if (preferences) {
                setMetaData(prev => prev.concat(preferences[0].subject))
            }   
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        }
    }
    //for each we grab a number of nums that we can go to the useparagraphs hook for 
    const fetchSuggested = async (phrase: string) => {
        try {
            const {data: suggested, error} = await supabase
            .from('all_data')
            .select('num')
            .contains("subject", phrase)
            .range(0, 9)
            if(error) {
                throw error
            } 
            if (suggested) {
                setSuggested(prev => prev.concat(suggested[0].subject))
            }   
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        }
        
    }


    const preferredTopics = async (l : Array<number>) => {
        //use for of loop like in getBook()
        for(const num of l){
            fetchPreferences(num)
        }
    }
    const suggestBooks = async (n : Array<number>) => {
        
    }




    return metadata;
}