
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../lib/initSupabase";

export type Reader = {
    id: number,
    progress: number, 
}

export const useReaderInfo = (user: User) => {
    // the parameter 'user' is given as a parameter from the components that consume the userContext 
    const [bookProgress, setBookProgress] = useState<Array<Reader>>([]);
    
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if(user){
            getAllReaderData();
        }
    }, [])

    /**
     * NOTE: This function pulls all relevant information about where the reader is in their chosen book 
     * from the reader_data table. This function and hook do not make requests to the progress table in the database. 
     * 
     * For more relevant information about the daily goal progress table and the functions that make requests to it, 
     * please refer to the useProgress hook in this folder. 
     */

    async function getAllReaderData () {
        try {
            setLoading(true)
            if(!user) throw new Error('No valid user!');
            
              let {data, error} = await supabase
              .from('reader_data')
              .select('*')
              .eq('user_id', user?.id)
              if(error) {
                  throw error 
              } 
              if (data) {
                    setBookProgress(data.map( d => {
                    return { id: d.num, progress: d.progress_percentage}}))
              }   
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        } finally {
            setLoading(false)  
        }
    }
    /**
     * NOTE: These functions send requests to update the reader's progress through the book that they have chosen.
     * However, it is the updateBookmarks() function that runs these functions in parallel so that both requests 
     * are successfully sent through.  
     * 
     * These functions do not interact with the daily reading goal that the reader has set for themselves.
     * What the functions do is it allows the reader to pick up where they left off in their chosen book. 
     * 
     * Parameters:
     *  
     * REQUIRED: num refers to the index of the book in the database. '26', for example, being the matching 'num' key for Paradise Lost. 
     * REQUIRED: readingProgress refers to the absolute total number of paragraphs that the reader has read. This number does not 
     * refer to the reader's daily goal progress. 
     * REQUIRED: readingProgressPercent refers to the reader's total progress through the entire book
    **/

    async function updatePercent(num: number, readingProgressPercent: number ) {
        try {
            let {data, error} = await supabase
            .from('reader_data')
            .update({progress_percentage: readingProgressPercent})
            .eq('num', num)
            .eq('user_id', user.id)
            if(error) {
                throw error 
            } else {
                console.log('update data' + data);
            }
      } catch (error) {
          if (error instanceof Error) {
              Alert.alert(error.message)
          }
      }
    }

    async function updateRead (num: number, readingProgress: number) {
        try {
            let {data, error} = await supabase
            .from('reader_data')
            .update({progress_read: readingProgress})
            .eq('num', num)
            .eq('user_id', user.id)
            if(error) {
                throw error 
            } else {
                console.log('update data' + data);
            }
      } catch (error) {
          if (error instanceof Error) {
              Alert.alert(error.message)
          }
      }
    }

    const updateBookmark = async (num: number, readingProgress: number, readingProgressPercent: number ) => 
            await Promise.all([updateRead(num, readingProgress), updatePercent(num, readingProgressPercent)]);

    const getSingleProgress = (num: number) => {
        return bookProgress.find(p => p.id === num);
    }





    return {bookProgress, updateBookmark, getSingleProgress} ;
}