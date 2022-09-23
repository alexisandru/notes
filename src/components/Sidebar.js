import React, { useState } from 'react'
import styled from 'styled-components'

import home from '../assets/home.svg'
import mark from '../assets/mark.svg'
import person from '../assets/person.svg'
import add from '../assets/add.svg'
import deleteIcon from '../assets/delete.svg'
import close from '../assets/close.svg'

import {doc, updateDoc, getDocs, where,  query, collection, deleteDoc} from 'firebase/firestore'
import db, { auth } from '../firebase/firebaseConfig'
import {signOut} from 'firebase/auth'


import {useSelector, useDispatch} from 'react-redux'
import AddTag from './AddTag'

import {showTagNotes, showAllNotes, closeSidebar} from '../actions'

const Sidebar = () => {
  const dispatch = useDispatch()
  const tags = useSelector(state => state.tags)
  const selected = useSelector(state => state.showTags)
  const side = useSelector(state => state.sidebar.width)

  const [inputNewTag, setInputNewTag] = useState(false)

  const deleteN = async (id) => {

    const notesRef = collection(db, "app", `${auth.currentUser.uid}`, "tags")
    const q = query(notesRef, where("id", "==", id))
    const obtenido = await getDocs(q)
    //obtenido.forEach(not => setIdDoc(prev => not.id))
    const docRef = doc(notesRef, obtenido.docs[0].id)
    //console.log(obtenido)
    
    

    const tagDelete = collection(db, "app", `${auth.currentUser.uid}`, "notes")
    const qT = query(tagDelete, where("tags", "array-contains", id))
    const ob = await getDocs(qT) 
    ob.forEach(async notetag => {
      const filtrado = notetag.data().tags.filter(x => x !== id)
      const ff = doc(tagDelete, notetag.id)
      await updateDoc(ff, {tags: filtrado})
    })

    await deleteDoc(docRef)

    dispatch(showAllNotes())
  }

  const closeSession = () => {
    signOut(auth)
  }


  const changeTag = (id) => {
    dispatch(showTagNotes(id))
    dispatch(closeSidebar())
  }

  return (
    <Container show={side}>

      <Title d>Notes App</Title>

      <Header>
        <Title>Notes App</Title>
        <Close src={close} onClick={() => dispatch(closeSidebar())}/>
      </Header>
      
      <Tags>
        <Tag 
          sel={"all"===selected.show} 
          onClick={() => {dispatch(showAllNotes()); dispatch(closeSidebar())}}
        >
          <Icon src={home} alt="."/>
          All notes
        </Tag>

        {
          tags.map(tag => {
            
            return (<Tag 
              sel={tag.id===selected.show} 
              onClick={() => changeTag(tag.id)}
            >
              <Icon src={mark}/>
              <TagName>{tag.tag}</TagName>
              <Icon endd="true" onClick={() => deleteN(tag.id)} src={deleteIcon}/>
            </Tag>)
          })
        }
             
        {
          inputNewTag
          ? <AddTag close={setInputNewTag}/>
          : <Tag onClick={() => setInputNewTag(true)}>
              <Icon src={add} alt="."/>
              Add
            </Tag>      
        }

      </Tags>
      <User onClick={() => closeSession()}>
        <Icon src={person} alt="."/>
        Close Session
      </User>
    </Container>
  )
}

export default Sidebar

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 100%; 
  background-color: #fff;

  @media screen and (max-width: 650px) {     
    height: 100%; 
    width: ${props => `${props.show}%`};
    position: fixed; /* Stay in place */
    z-index: 1; /* Stay on top */
     /* Black*/
    overflow-x: hidden; /* Disable horizontal scroll */
     /* Place content 60px from the top */
    transition: 0.5s; 
  }
  
`

const Close = styled.img`
  width: 25px;
  right: 20px;
  position: absolute;
`

const Header = styled.div`
  
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 1em;
  padding-top: 10px;

  @media screen and (min-width: 650px) {
    display: none;
  }
`

const TagName = styled.label`
  width: 100%;
  overflow: hidden;
`

const Title = styled.h1`
  padding: 10px 0 10px 20px;

  @media screen and (max-width: 650px) {
    display: ${props => props.d ? "none" : ""}
  }
`

const Tags = styled.ul`
  overflow: hidden;
  height: 100%;
  padding-top: 10px;  

  &:hover {
    overflow: auto;
  }
        /* width */
  &::-webkit-scrollbar {
    width: 10px;
  }

    /* Track */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

    /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

    /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`



const Tag = styled.li`
  list-style: none;
  font-size: 1.1em;

  padding: 6px 0 6px 20px;

  width: 100%;

  display: flex;
  align-items: center;
  flex-direction: row;

  background-color: ${props => props.sel ? "rgba(0,0,0,0.1)" : "#fff"};
  

  &:hover {
    background-color: rgba(0,0,0,0.1);
    cursor: pointer;
  }


`

const Icon = styled.img`
  width: 25px;
  margin-right: 5px;

  align-self: ${props => props.endd ? "flex-end" : ""};

  @media screen and (max-width: 650px) {
    margin-right: ${props => props.endd ? "20px" : ""}
  }
`

const User = styled.li`
  position: sticky;
  bottom: 0;
  list-style: none;
  font-size: 1.2em;
  padding: 10px 0 10px 20px;

  display: flex;
  align-items: center;

  border-top: 1px solid rgba(0,0,0,0.2);

`