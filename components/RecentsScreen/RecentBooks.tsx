import { useEffect, useState } from 'react'
import { Text, Card, Button,LinearProgress } from '@rneui/base'
import { StyleSheet, View } from 'react-native'
import { Styles } from '../../lib/constants'
import { useUser } from '../UserContext'
import { useBooks } from '../../hooks/useBooks'
import { Book } from '../../services/backend'
import { Reader, useReaderInfo } from '../../hooks/useReaderInfo'

export default function RecentBooks ({navigation} : any) {

  const { user } = useUser();  
  const books = useBooks(user!);
  const {bookProgress} = useReaderInfo(user!);
  const [recentBooks, setRecentBooks] = useState<Array<Book>>([]);
  const [recentProgress, setRecentProgress] = useState<Array<Reader>>([]);

  useEffect(() => {
      if(books && books.length > 0) {
          setRecentBooks(books)
      }
      
  }, [books])

  useEffect(() => {
    if(bookProgress && bookProgress.length > 0) {
      setRecentProgress(bookProgress);
    }
  }, [bookProgress])

  const Progress = (props : any) => {
    const p = recentProgress.find(p => p.id === props.id)
    return <Text>{Math.round(p!.progress) * 100}%
             <LinearProgress value={p!.progress} variant={"determinate"} color={'primary'}  />
            </Text>
  }

  const cardConstructor= () => {
    return recentBooks.map((book, index) =>
            <Card key={index}>
              <Card.Title>{book.title} by {book.author}</Card.Title>
                <Card.Divider/>
                <Progress id={book.num} length= {book.length}/>
                <Button title={'Continue?'}
                        onPress={() => {
                          navigation.push('Paragraphs', {
                            book_num: book.num})
                        }}
                />
                
            </Card> 
          )
  }

    return ( 
        <View style={styles.container}>
            <View style={styles.headerNav}>
              <Text onPress={() => navigation.goBack()}>back </Text>
              <Text style={{fontWeight: "bold"}}> Recent Books </Text>
              <Text> User </Text>
           </View>  
           {cardConstructor()}
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
    },
    headerNav: {
      width: "100%",
      padding: Styles.spacing,
      display: 'flex',
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "1rem"
    }
})
