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
 const [paragraphs, setParagraphs] = useState<Array<Paragraph>>([]);
 //To make these paragraphs functional, I will have to take the content, and split by \n characters. 
 //This will ensure the paragraphs render properly on the screen. 
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
 * page's word count is around 250 words. 250 words 
 * makes for about 1250 characters. This will give us a
 * reasonable number to splice from book[x].content with 
 * the variable x being the id of the book in the database. 
 * 
 * We multiply by the goal, then divide by the average 
 * word count for each paragraph, to arrive at the needed paragraphs 
 * set in state as 'displayPara' 
 * 
 */


 useEffect(() => {
    if(goal){
        //so, this is  being done by word count and not characters. 
        //we should probably change this so that this works as intended.
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


//TO-DO: See if we can't somehow find a way to pull information without using the paragraphs table
//but rather, we pull from the all_data table, and we see about possibly using that information instead. 
//it may be more effecient that way? Then, the numbers we save as a user-data can be used to pick up
//where they last left off in their readings. 

//We can do this by character count now that we can pull the entire book and save into the book hook
//This will reduce API calls significantly. 


 async function getParagraphs() {
     try {
           let {data, error} = await supabase
           .from('all_data')
           .select('*')
           .eq('num', book_num)
           .limit(1)
           .single()
           if(error) {
               throw error 
           } 
           if (data) {
            let split_content = data.content.split('\n')
            let to_paragraphs = split_content.map((para: string ) => ({num: book_num, paragraph: para, paragraph_length: para.length } ))
            setParagraphs(to_paragraphs)
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