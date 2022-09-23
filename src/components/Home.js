import React, { useEffect } from 'react'

import {query, orderBy, collection, onSnapshot, doc} from 'firebase/firestore'
import db, {auth} from '../firebase/firebaseConfig'
import {restartNotes, initialNotes, restartTags, initialTags} from '../actions'
import {useDispatch} from 'react-redux'

import styled from 'styled-components'

import Sidebar from './Sidebar'
import Notes from './Notes'

const Home = () => {

  const dispatch = useDispatch()
  
  useEffect(()  => {
    const docRef = doc(db, "app", `${auth.currentUser.uid}`)
    const q = query(collection(docRef, "notes"), orderBy("id", "desc"))
    
    const data = onSnapshot(q, snap => {
      dispatch(restartNotes())      
      snap.forEach(note => dispatch(initialNotes(note.data())))
    })

    return () => data()
  }, [])

  useEffect(() => {
    const docRef = doc(db, "app", `${auth.currentUser.uid}`)
    const tagsQuery = query(collection(docRef, "tags"), orderBy("id", "asc"))
    const data = onSnapshot(tagsQuery, snap => {
      dispatch(restartTags())
      snap.forEach(tag => dispatch(initialTags(tag.data())))
    })

    return () => data()
  }, [])

  return(
    <Container>      
        <Sidebar />
        <Notes/>
    </Container>
  )
}

export default Home

const Container = styled.div`
  height: 100%;
  display: flex;

  @media screen and (max-width: 650px) {
      width: 100%; 
  }
`
