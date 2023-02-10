import {View, StyleSheet} from 'react-native';
import {Button, Text} from '@rneui/themed';
import  Separator  from '../Separator';
import RecentActivity from './RecentActivity';
export default function ActivityFeed({navigation} : any) {
    return (
        <View style={styles.activityFeed}>
        <View style={styles.card}>
          <Text h2={true}>Recent Books</Text>
          <RecentActivity navigation= {navigation}/>
          <Button
            title={"Pick up where you left off"}
            titleStyle={{ fontWeight: "300", fontSize: 18 }}
            type="solid"
            color="secondary"
            size="md"
            buttonStyle={{
              borderRadius: 20,
              margin: 20,
            }}
            onPress={() =>
              navigation.navigate("RecentBooks")
            }
          />
          <Separator />
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    activityFeed: {
        display: "flex",
        flexDirection: "column",
      },
      card: {
        flexGrow: 1,
      },
})