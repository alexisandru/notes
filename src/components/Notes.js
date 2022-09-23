import React, {useState} from 'react'
import styled from 'styled-components'

import CreateNote from './CreateNote'
import UpdateNote from './UpdateNote'
import Note from './Note'

import menu from '../assets/menu.svg'

import {useDispatch, useSelector} from 'react-redux'
import {addNote, showSidebar} from '../actions'

const Notes = () => {
  const dispatch = useDispatch()
  const [showCreateNote, setShowCreateNote] = useState(false)
  const [showNote, setShowNote] = useState(false);
  const [id, setId] = useState(null)

  const showTags = useSelector(state => state.showTags.show)
  const notes = useSelector(state => state.notes)

  const whatShow = () => {
    if (showTags === "all") {
      return notes.map(note => <Note note={note} id={setId} show={setShowNote}/>)
    } else {
      const filtered = notes.filter(note => note.tags.includes(showTags))
      return filtered.map(note => <Note note={note} id={setId} show={setShowNote}/>)
    }
  }

  return (
    <Container>

      { showCreateNote && <CreateNote close={setShowCreateNote}/>}

      <Header>
        <Icon src={menu} onClick={() => dispatch(showSidebar())}/>
        <h1>Notes app</h1>
      </Header>

      <Input type="text" placeholder="Write note..." onClick={() => setShowCreateNote(true)}/>
      <AllNotes>
        {showNote && <UpdateNote close={setShowNote} id={id}/>}

        {whatShow()}
      </AllNotes>
    </Container>
  )
}

export default Notes

const Icon = styled.img`
  width: 25px;
  left: 0;
  position: absolute;
`

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 30px;
  width: 80%;
  height: 100%;
  background-color: #EFEFEF;

  @media screen and (max-width: 650px) {
      width: 100%; 
      padding: 25px;
      padding-top: 15px;
  }
`

const Header = styled.div`
  
  position: relative;
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1em;
  padding-bottom: 15px;

  @media screen and (min-width: 650px) {
    display: none;
  }
`


const Input = styled.input`
  width: 50%;
  font-size: 1em;
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  outline: none;

  @media screen and (max-width: 650px) {
      width: 100%; 
  }
`

const AllNotes = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 275px;
  gap: 30px;

  margin-top: 30px;

  width: 100%;

  @media screen and (max-width: 650px) {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 200px;
    gap: 5px;
  }

`

