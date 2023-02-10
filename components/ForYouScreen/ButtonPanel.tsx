import { Dimensions, View, Text, StyleSheet, FlatList } from 'react-native'
import { Divider } from '@rneui/themed';
import { FontAwesome } from '@expo/vector-icons';
import  {MoreInfo} from './MoreInfo';
import  Like  from './Like'
 export const ButtonPanel = (props: any) => {
    return (
        <View>
            <View style={styles.panel}>
                <Like id={props.id} />
                <MoreInfo />
            </View>
        </View> 
    )
}


const styles = StyleSheet.create({ 
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
});