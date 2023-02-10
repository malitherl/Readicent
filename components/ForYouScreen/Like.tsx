import React, { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useUser } from '../UserContext';
import backendservice from '../../services/backend'

export default function Like ( {snippet}: any) {
    const [id, setId] = useState(0);
    const { user } = useUser();
    const [liked, setLiked] = useState(false)


    //more hooks useLike() needed here 
    useEffect(() => {
        setId(snippet.num)
        backendservice
        .isLiked(id, user!)
        .then(like => {
          setLiked(like!)
        })
    }, [])

    const handlePress= () =>{
      if(liked) {
        backendservice
        .removeLike(id, user!)
        .then(()=> setLiked(!liked))
      } else {
        backendservice
        .addLike(id, user!)
        .then(()=> setLiked(!liked))
      }
    } 
    
    return(
            <AntDesign
              style={{ alignSelf: 'center' }}
              name="heart"
              size={35}
              color= {liked ? '#ffcccc' : '#fff'}
              onPress={() => { handlePress()}}
            />
      
   )}