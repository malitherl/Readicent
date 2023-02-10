import { Dimensions, Text, View, StyleSheet, FlatList } from 'react-native'
import { Divider } from '@rneui/themed';
import { useUser } from '../UserContext';
import { ButtonPanel } from './ButtonPanel';
import { usePreferences } from '../../hooks/usePreferences';
import ParagraphView from './ParagraphView';

/**
 * TODO: create the usePreferences hook to pull data from the database 
 * based off metadata, and in doing so, we have a swathe of information 
 * to choose from. Mainly, this would also help the user navigate books.  
 */


export default function ReaderView() {
    const {user} = useUser();
    const preferences = usePreferences(user!);

    const renderText = ({item, index} : any, props: any) => {
        return (
          <View style={styles.snippet}>
               <ParagraphView/> 
               <ButtonPanel />
            <Divider />
        </View>
        )
    }
    
    const Preference = () => {

      return preferences.map(p => <Text>{p}</Text>)
      
    }


    return(
        <View style= {styles.snippetList}>
          {//<FlatList pagingEnabled={true} data={preferences} renderItem={(item) => renderText(item, props)}/>
            
        } 
        </View>
    )
}

const styles = StyleSheet.create({ 
    snippetList: {
        flexGrow: 1,
        width: "100%",
        height: Dimensions.get('window').height,
        padding: 20,
      },
      viewerText: {
        fontSize: 16,
        lineHeight: 25,
      },
      snippet: {
        borderBottomColor: "black",
        margin: 20,
      },
      panel: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'relative', 
        height: 60,
        width: '100%',
        backgroundColor: 'transparent',
        padding: 10,
      },
      buttons: {
        backgroundColor: 'transparent',
        padding: 10,
        height: '25%',
        width: 200,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
      },
      separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
    }
)