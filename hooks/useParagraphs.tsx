import { useEffect, useState } from "react"
import { Alert } from "react-native"
import { supabase } from "../lib/initSupabase"

export type Paragraph = {
    num: number 
    paragraph: string
    paragraph_length: number
  }


  //we could make some of the parameters optional 
export const useParagraphs = (book_num?: number, goal?: number, start?: number) => {
 /**
  * Parameters: 
  * book_num: this number is found through the all_data table and identifies the book
  * goal: this is pulled from the progress table and it is used to calculate the number of paragraphs
  * start: to ensure that the user has the best experience, we store and cache where they left off in their reading,
  * daily goal complete or not. 
  */
 const [paragraphs, setParagraphs] = useState<Array<Paragraph>>([])
 const [displayedPara, setDisplayedPara] = useState<Array<Paragraph>>([]);
 const [single, setSingle] = useState<Array<Paragraph>>([]); 
 const [numPara, setNumPara] = useState<number>(0);

 useEffect(() => {
     if(book_num){
         getParagraphs()
     }
 }, [])

/**
 * NOTE: This is a rough estimate of what these figures should be, and 
 * until a more sophiscated means is found, this is the process used.  
 * 
 * To calculate the number of paragraphs 
 * to pull based on the user's set daily goal,
 * we find the average length of each paragraph.
 * 
 * Next thing we do is calculate the word count of 
 * the user's daily goal. The rough average for a 
 * page's word count is around 250 words.  
 * 
 * We multiply by the goal, then divide by the average 
 * word count for each paragraph, to arrive at the needed paragraphs 
 * set in state as 'displayPara' 
 * 
 */


 useEffect(() => {
    if(goal){
        const avg= Math.round(paragraphs.map(p => p.paragraph)
        .map(para => para.split(' ').length)
        .reduce((a, b) => a +b, 0) / paragraphs.length)
        const num = Math.round((250*goal) / avg); 
        setNumPara(num);
    }
 }, [paragraphs]);

 useEffect(() => {
     const displayed = paragraphs.slice(start, numPara);
     setDisplayedPara(displayed);
 }, [numPara])

 async function getParagraphs() {
     try {
           let {data, error} = await supabase
           .from('paragraphs')
           .select('*')
           .eq('num', book_num)
           if(error) {
               throw error 
           } 
           if (data) {
             setParagraphs(data)
           }   
     } catch (error) {
         if (error instanceof Error) {
             Alert.alert(error.message)
         }
     }
 }

 async function getSingleParagraph(x: number, y: number) {
    try {
        let {data, error} = await supabase
        .from('paragraphs')
        .select('*')
        .eq('num', book_num)
        .range(x,y)
        if(error) {
            throw error 
        } 
        if (data) {
          setParagraphs(data)
        }   
    } catch (error) {
        if (error instanceof Error) {
            Alert.alert(error.message)
        }
    }
 }



 return {displayedPara, getParagraphs};
}