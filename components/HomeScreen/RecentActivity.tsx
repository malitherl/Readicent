//this is the prop that will fetch the books from likes and it will do this with the useEffect hook. the next thing that we will need to do is pass a prop that will determine the number of books to return.
import { Text } from '@rneui/themed'; 
import { useState, useEffect } from "react";
import { useUser } from "../UserContext"
import { View } from "react-native";
import { Book } from '../../services/backend';
import { useBooks } from '../../hooks/useBooks';
import { ListItem } from '@rneui/base';

export default function RecentActivity (props : any) {
    const { user } = useUser();
    const books = useBooks(user!, 2); 
    const [recentBooks, setRecentBooks] = useState<Array<Book>>([]);
    
    useEffect(() => {
        if(books && books.length > 0) {
            setRecentBooks(books)
        }
    }, [books])
    return (
        <View>
            {recentBooks.length > 0 ? recentBooks.map((book, index) => 
                    <ListItem key={index}><Text>{book.title}</Text></ListItem>) 
                    : <Text>Loading...</Text>}
        </View>
    )
}