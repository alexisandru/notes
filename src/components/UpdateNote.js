import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'

import del from '../assets/delete.svg'

//----
import {doc, updateDoc, getDocs, where,  query, collection, deleteDoc, getDoc} from 'firebase/firestore'
import db, { auth } from '../firebase/firebaseConfig'

import UpdateDropDown from './UpdateDropDown'
import {updateNote, deleteNote} from '../actions'
import {useSelector, useDispatch} from 'react-redux'

const UpdateNote = ({close, id}) => {
  const textareaRef = useRef();
  const dispatch = useDispatch()

  const [noteEdit, setNoteEdit] = useState({})
  const [idDoc, setIdDoc] = useState("")

  const note = useSelector(state => state.notes.find(x => x.id === id))

  useEffect(() => {
    
    textareaRef.current.focus()
  }, [])

  useEffect(() => {
    setNoteEdit(state => ({
      id: note.id,
      title: note.title,
      description: note.description,
    }))
  }, [note])

  const closeNote = () => {
    dispatch(updateNote(noteEdit))
    close(false)
  }

  const handleInputChange = (e) => {
    const { value, name } = e.target;

    if (name === "description") {
      changeHeight(e);
    }

    setNoteEdit({
      ...noteEdit,
      [name]: value,
    });
  };

  const deleteNoteId = () => {
    dispatch(deleteNote(id))
    close(false)
  }

  const changeHeight = () => {
    textareaRef.current.style.height = "100%";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  const updateN = async () => {
    const notesRef = collection(db, "app", `${auth.currentUser.uid}`, "notes")
    const q = query(notesRef, where("id", "==", noteEdit.id))
    const obtenido = await getDocs(q)
    const docRef = doc(notesRef, obtenido.docs[0].id)
    await updateDoc(docRef, noteEdit)
    close(false)
  } 


  const deleteN = async () => {
    const notesRef = collection(db, "app", `${auth.currentUser.uid}`, "notes")
    const q = query(notesRef, where("id", "==", noteEdit.id))
    const obtenido = await getDocs(q)
    //obtenido.forEach(not => setIdDoc(prev => not.id))
    const docRef = doc(notesRef, obtenido.docs[0].id)
    //console.log(obtenido)
    close(false)
    await deleteDoc(docRef)
  }

  return (
    <Container>
      <Content>
        <TitleDiv>
          <Title 
            onChange={handleInputChange}
            type="text" 
            name="title" 
            placeholder="Title..." 
            value={noteEdit.title} 
            spellcheck="false"
          />
          <Delete src={del} alt="." onClick={() => deleteN()}/>
        </TitleDiv> 
        <Description
          onChange={handleInputChange}
          ref={textareaRef}
          placeholder="Description..."
          value={noteEdit.description}
          name="description"
        >
        </Description>
        <Footer>
          <UpdateDropDown id={note.id}/>
          <Btn onClick={() => updateN()}>Close</Btn>
        </Footer>
      </Content>
    </Container>
  )
}

export default UpdateNote

const Container = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 650px) {
    align-items: flex-start;
  }
`

const Delete = styled.img`
  width: 35px;
  align-self: flex-end;
  border-radius: 50%;
  padding: 5px;
  filter: ${props => props.theme.icon};

  &:hover {
    background-color: rgba(0,0,0,0.1);
    cursor: pointer;
  }
`

const TitleDiv = styled.div`
  display: flex;
`

const Btn = styled.button`
  padding: 6px 20px;
  border-radius: 8px;
  background-color: ${props => props.theme.secondaryButton};
  color: ${props => props.save ? "#fff" : props.theme.color};
  cursor: pointer;
  font-size: 1em;
  border: ${props => props.border ? `1px solid rgba(0,0,0,0.9)` : ''};
  margin-left: 10px;
`

const Content = styled.div`
  background-color: #fff;
  width: 40%;
  max-height: 80%;
  min-height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  border-radius: 15px;

  background-color: ${props => props.theme.inputBackground};
  color: ${props => props.theme.color};

  @media screen and (max-width: 650px) {
    width: 90%;
    max-height: 90%;
    min-height: 50%;
    margin-top: 10%;
  }
`

const Title = styled.input`
  padding: 5px 0;
  border: none;
  font-size: 1.2em;
  font-weight: 500;
  outline: none;
  width: 100%;

  background-color: ${props => props.theme.inputBackground};
  color: ${props => props.theme.color};
`

const Description = styled.textarea`
  font-size: 1.1em;
  resize: none;
  padding: 5px 0;
  margin-bottom: 10px;
  overflow: auto;
  outline: none;
  border: none;
  flex-grow: 1;
  width: 100%;
  background-color: ${props => props.theme.inputBackground};
  color: ${props => props.theme.color};
  
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

