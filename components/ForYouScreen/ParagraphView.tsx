import { Dimensions, StyleSheet, View } from 'react-native'
import { Text } from "@rneui/themed"

export default function ParagraphView(props: any) {
    //Just so the amount of words don't overflow the screen 
    //this could also be refactored into the paragraphview screen
    const WordCount = () => {
        const wordArray = props.paragraphText.split(' ')
        return <Text>{wordArray.slice(0, 100).join(' ').trim() + '...'}</Text>
    }

    return (
        <View>       
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
    }
})