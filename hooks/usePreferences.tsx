import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../lib/initSupabase";
import { Like } from "../services/backend";
import { Paragraph } from "./useParagraphs";

export const usePreferences = (likes: Like[]) => {
    const [metadata, setMetaData] = useState<Array<string>>([]);
    const [suggested, setSuggested] = useState<Array<number>>([]);
    const [preferences, setPreferences] = useState<Array<Like>>([]);
    const [likeNumbers, setLikeNumbers] = useState<Array<number>>([]);
    const [filteredS, setFilteredS] = useState<Array<number>>([]);
    const [suggestedReading, setSuggestedReading] = useState<Array<Paragraph>>([])
    
    useEffect(() => {
        setPreferences(likes);
        setLikeNumbers(likes.map(l => l.snippet_id));
    }, [likes.length]);
    
    useEffect(() => {
        const nums = preferences.map( p => p.snippet_id); 
        preferredTopics(nums);
    }, [preferences.length])
    
    useEffect(() => {
        //this is processing the strings into a more friendly format 
        //to feed into request 
        const genres = metadata.map(val => val.split(' ')).flat(1)
        .map(entry => entry.toLowerCase())
        .map(str => str.replace(/^a-zA-Z0-9 ]/g, ''))
        .filter(s => s !== "--")
        .filter((item, index, arr) => arr.indexOf(item) === index);
        fetchSuggested(genres);

    }, [metadata.length]);

    useEffect(() => {
        //Checking again to ensure that duplicated values are not added into the array
        //this has to happen outside of the fetchSuggested() function because the 
        //state of 'suggested' has not fully updated to compare values since
        //the database itself is fetching by arrays and not individual values
        const s = suggested.filter((item,
            index, arr) => arr.indexOf(item) === index);
        setFilteredS(s);
    }, [suggested.length])

    useEffect(() => {
        if(filteredS){
            preferredParagraphs(filteredS);
        }
    }, [filteredS.length])

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
                setMetaData(prev => prev.concat(preferences[0].subject));
            }   
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        }
    }

    const fetchSuggested = async (genres : string[]) => {
        try {
            if(!genres) throw new Error('invalid genres!');
            for(const g of genres) {
                const {data: results, error} = await supabase
                .from('all_data')
                .select()
                .textSearch("subject", g, {
                    config: "english",
                    })
                .range(0,3)
                if(error) {
                    console.log(error)
                    throw error
                } else {
                    if(results[0]){
                        setSuggested(prevState => {
                            for(let i =0; i< results.length; i++) {
                                //this is checking to see that no duplicates are 
                                //added to the array
                                if(likeNumbers.indexOf(results[i].num) === -1) {
                                    return prevState.concat(results[i].num);
                                }
                            }
                            return prevState;
                        })
                    }
                }   
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

    const preferredParagraphs = async(f : Array<number>) => {

        for(const num of f) {
            const a = Math.round((Math.random() * 100))
            const b = a+1;
            getSingleParagraph(a, b, num)
        }
    }

    
async function getSingleParagraph(x: number, y: number, book_num: number) {
    try {
        let {data, error} = await supabase
        .from('all_data')
        .select('content')
        .eq('num', book_num)
        if(error) {
            throw error 
        } 
        if (data?.length && data) {
            const paragraph = { 
                num: data[0].num,
                paragraph: data[0].content.slice(0, 700),
                paragraph_length: data[0].content.length
            }
            setSuggestedReading(prevState => prevState.concat(paragraph));
        }   
    } catch (error) {
        if (error instanceof Error) {
            Alert.alert(error.message)
        }
    }
 }



    return {suggestedReading};
}