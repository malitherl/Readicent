import { View, StyleSheet } from 'react-native';
import {Card, Text} from '@rneui/themed'; 
import Separator from '../Separator';
import { useUser } from '../UserContext';
import { useProgress } from '../../hooks/useProgress';

export default function ReadingStats() {
    const {user} = useUser()
    const goal = useProgress(user!);
    /** 
     * TODO: Give the user the ability to edit their daily reading goal
     */

    return (
      <View style={styles.card}>
        <Text h2={true}>Statistics</Text>
        <Text>Track your reading process here</Text>
        <View>
            <Card>
                <Text>Read {goal} pages</Text>

            </Card>
        </View>
        <Separator />
    </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flexGrow: 1,
      },
})
