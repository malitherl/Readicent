import { Dimensions, FlatList, View, StyleSheet } from 'react-native'
import { Divider } from '@rneui/themed';
import { useUser } from '../UserContext';
import { ButtonPanel } from './ButtonPanel';
import ParagraphView from './ParagraphView';
import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../lib/initSupabase';
import { useLikes } from '../../hooks/useLikes';
import { usePreferences } from '../../hooks/usePreferences';

import { Paragraph } from '../ReaderScreen/ParagraphCalc'
/**
 * TODO: create the usePreferences hook to pull data from the database 
 * based off metadata, and in doing so, we have a swathe of information 
 * to choose from. Mainly, this would also help the user navigate books.  
 */


export default function ReaderView() {
    const {user} = useUser();
    const {likes} = useLikes(user!);
    const {suggestedReading} = usePreferences(likes);
   
    const renderItem = ({item} : any) => {
      console.log('rendering');
      return (
        <ParagraphView {...item} />
      )
    }


    return(
        <View style= {styles.snippetList}>
          {<FlatList pagingEnabled={true} 
                     data={suggestedReading} 
                     renderItem={renderItem}/>
            
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