import { StyleSheet, View, Dimensions, FlatList } from "react-native";
import { Text } from '@rneui/themed';
import { Button } from "@rneui/base";
import { useParagraphs } from '../../hooks/useParagraphs';
import { useReaderInfo } from "../../hooks/useReaderInfo";
import { useUser } from "../UserContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { LinearProgress } from "@rneui/base";
import { useProgress } from "../../hooks/useProgress";

export type Paragraph = {
    num: number 
    paragraph: string
    paragraph_length: number
  }
//this must be a child belonging to another Screen, for better naming conventions. 
export const ParagraphCalc = ({route, navigation} : any) => {
    const {user} = useUser()

    //progress: this comes from the goal column 
    const dailyGoal = useProgress(user!) || 0;
    //RecentBooks: this would arrive as a prop from that component
    const {book_num} = route?.params || 0; 

    const {updateBookmark, getSingleProgress} = useReaderInfo(user!);
    const start = getSingleProgress(book_num)?.progress || 0; 
    const {displayedPara} = useParagraphs(book_num, dailyGoal, start);
  
    const [paragraphsRead, setParagraphsRead] = useState(start);
    const [paragraphPerc, setParagraphPerc] = useState(start/displayedPara.length);

    useEffect(() => {    
      const p = (paragraphsRead / displayedPara.length);
      setParagraphPerc(p);
    }, [paragraphsRead])


    //https://reactnavigation.org/docs/preventing-going-back 
    //we can use this to save progress if the user tries leaving the screen early.

    const renderText = ({item} : any) => {
        return (
          <View style={styles.snippet}>
               <Text style={styles.para}>{item.paragraph}</Text> 
          </View>
        )
    }

    const handleFinish = () => {
      updateBookmark(book_num, paragraphsRead, paragraphPerc);
    }
    const viewabilityConfig = {
      viewAreaCoveragePercentThreshold: 50,
    }

    const onViewableItemsChanged = useCallback((viewableItem: any) => {
      if(viewableItem.viewableItems[0].index){
        setParagraphsRead(viewableItem.viewableItems[0].index);
      }
    }, []);
    
    const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }])
    

    return (
        <View style={styles.snippetList}>
            <FlatList pagingEnabled={true} 
                      viewabilityConfig={viewabilityConfig} 
                      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                      data={displayedPara} renderItem={renderText}/>
            <LinearProgress value={paragraphPerc} variant={"determinate"} trackColor={'lightgreen'} color={'green'}  />
            <Button onPress={handleFinish}>Save Progress</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    para: {
        letterSpacing: 2,
    },
    snippet: {
        borderBottomColor: "black",
        padding: 12, 
        margin: 6
      },
    snippetList: {
        overflow: "hidden",
        height: Dimensions.get("window").height,
        justifyContent: 'center', 
        alignItems: "center",
        paddingTop: 16,
      },
      viewerText: {
        fontSize: 16,
        lineHeight: 25,
      },
})