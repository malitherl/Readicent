import { View, StyleSheet, Dimensions } from 'react-native'
import { Text } from '@rneui/base'
import { Styles } from '../../lib/constants'
/** URL polyfill. Required for Supabase queries to work in React Native. */
import 'react-native-url-polyfill/auto'
import ReaderView from './ReaderView'

export default function ForYou({navigation} : any) {
  return (
    <View>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerNav}>
              <Text onPress={() => navigation.goBack()}>back </Text>
              <Text > For You </Text>
           </View>  
          </View>
          <View 
             style={styles.snippetList}
            >
            <ReaderView/>
          </View>
        </View>
      </View>
  )
}
 
const styles = StyleSheet.create({
  container: {
    padding: Styles.spacing,
    backgroundColor: "transparent",

  },
  header: {
    backgroundColor: "transparent",
    color: "white",
    borderBottomColor: "black",
    borderBottomWidth: 1, 
  },
  headerNav: {
    width: Dimensions.get("window").width - (Dimensions.get('window').width)*.5,
    height: 45,
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 16

  },
  logoutButton: {
    backgroundColor: "transparent",
    width: 100,
    borderColor: "fff", 
    borderStyle: "dashed",
    padding: 15, 
  },
  snippetList: {
    overflow: "hidden",
    height: Dimensions.get("window").height,
    justifyContent: 'center', 
    alignItems: "center",
  },
  snippet: {
    fontSize: 24,
    width: "80svw",
    height: "100vh", 
    alignContent:"flex-start",
    justifyContent:"center",
    margin: 50,
    lineHeight: "50%"
  },
  panel: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'relative', 
    height: 250,
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
})