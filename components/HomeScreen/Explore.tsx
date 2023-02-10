import {View, StyleSheet} from 'react-native';
import {Button, Text} from '@rneui/themed';
import  Separator  from '../Separator';

export default function Explore({navigation} : any) {
    //TODO: what if this could have a search function as well?
    return (
        <View style={styles.card}>
            <Text h2={true}>Explore</Text>
            <Text>Find a new book to read based on your interests</Text>
            <View>
            <Button
                title={"Read New Snippets"}
                titleStyle={{ fontWeight: "300", fontSize: 18 }}
                color="secondary"
                size="md"
                buttonStyle={{
                borderRadius: 20,
                margin: 20,
                }}
                onPress={() => navigation.navigate("Snippets")}
            />
            </View>
            <Separator />
        </View>
    )
}

const styles=  StyleSheet.create({
    card: {
        flexGrow: 1,
      },
})