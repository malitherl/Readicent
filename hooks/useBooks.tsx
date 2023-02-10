import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../lib/initSupabase";
import { Book } from "../services/backend";

export const useBooks = (user: User, count?: number) => {
    
    const [ids, setIds] = useState<Array<number>>([])
    const [books, setBooks] = useState<Array<Book>>([])
    const [loading, setLoading] = useState(true);    
    useEffect(() => {
        if (user) {
            getIds()      
        } 
    }, [])
    useEffect(()=> {
        if(books.length < ids.length) {
            getBook(ids)
         }
    }, [ids])

    async function getIds () {
      try {
          setLoading(true)
          if(!user) throw new Error('No valid user!');
          if(count) {
            let {data, error} = await supabase
            .from('likes')
            .select('*')
            .eq('user_id', user?.id)
            .range(0, count-1)
            if(error) {
                throw error 
            } 
            if (data) {
                setIds(data.map(likes => likes.snippet_id))
            }   
          } else {
            let {data, error} = await supabase
            .from('likes')
            .select('*')
            .eq('user_id', user?.id)
            if(error) {
                throw error 
            } 
            if (data) {
                setIds(data.map(likes => likes.snippet_id))
            }   
          }   
      } catch (error) {
          if (error instanceof Error) {
              Alert.alert(error.message)
          }
      } finally {
          setLoading(false)  
      }
  }


  async function getBook (ids: number[]) {
      try {
          setLoading(true);
          if(!ids) throw new Error('ids invalid')
          if(!user) throw new Error('invalid user')
          for(const id of ids) {
              const {data, error} = await supabase
                  .from('all_data')
                  .select('*')
                  .eq('num', id)
                  .limit(1)
                  .single()
                if(error) {
                    console.log('error', error)
                } else {
                    setBooks(prev => prev.concat(data))
                }
        }
      }   catch (error) {
          if (error instanceof Error) {
              Alert.alert(error.message)
          }
      } finally {
          setLoading(false)
      }
  }
  
  return books;
}
