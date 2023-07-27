import { Dimensions, StyleSheet, View } from 'react-native'
import { Text } from "@rneui/themed"
import { Paragraph } from '../ReaderScreen/ParagraphCalc'

export default function ParagraphView({paragraph}: Paragraph) {
    //Just so the amount of words don't overflow the screen 
    //this could also be refactored into the paragraphview screen    
    const WordCount = () => {
        //const wordArray = paragraph.split(' ')
        return <Text>{ paragraph + '...'}</Text>
    }

    return (
        <View style={styles.snippet}>       
            <Text style={styles.para}>
                <WordCount/>
            </Text>
        </View>    
    )
}


const styles = StyleSheet.create({
    para: {
        letterSpacing: 2,
        height: Dimensions.get('window').height - 50 
    },
    snippet: {
        borderBottomColor: "black",
        margin: 20,
      },
})