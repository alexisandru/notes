import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import DropDown from './DropDown'

import {addNote} from '../actions'
import { useDispatch } from 'react-redux' 

const CreateNote = ({close}) => {
  const dispatch = useDispatch()
  const textareaRef = useRef();

  const [note, setNote] = useState({
    title: "",
    description: "",
    tags: []
  });
  

  useEffect(() => {
    textareaRef.current.focus()
  }, [])

  const changeHeight = () => {
    textareaRef.current.style.height = "100%";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    if (name === "description") {
      changeHeight(e);
    }

    setNote({
      ...note,
      [name]: value,
    });
  };

  const setTags = (tags) => {
    setNote({
      ...note,
      tags: tags
    })
  }

  const closeNote = () => {
    if (note.title !== "" || note.description !== "") {
      dispatch(addNote(note))
      close(false) 
    }
  }


  return (
    <Container>
      <Content>
        <Title 
          onChange={handleInputChange} 
          value={note.title} 
          type="text" 
          placeholder="Title..." 
          name="title"
        />
        <Description
          onChange={handleInputChange}
          value={note.description}
          ref={textareaRef}
          placeholder="Description..."
          name="description"
        ></Description>
        <Footer>
          <DropDown setTags={setTags}/>
          <Buttons>
            <Btn onClick={() => close(false)}>Cancel</Btn>
            <Btn save onClick={() => closeNote()}>Post</Btn>
          </Buttons>
        </Footer>
      </Content>
    </Container>
  )
}

export default CreateNote

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


const Btn = styled.button`
  padding: 6px 20px;
  border-radius: 5px;
  background-color: ${props => props.save ? props.theme.primaryButton : props.theme.secondaryButton};
  color: ${props => props.save ? "#fff" : props.theme.color};
  cursor: pointer;
  font-size: 1em;
  border: ${props => props.border ? `1px solid rgba(0,0,0,0.9)` : ''};
  margin-left: 10px;

  @media screen and (max-width: 650px) {
    padding: 6px 15px;
  }
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



  @media screen and (max-width: 650px) {
    width: 90%;
    max-height: 100%;
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

  @media screen and (max-width: 370px) {
     flex-direction: column;
  }
`

const Buttons = styled.div`
  @media screen and (max-width: 370px) {
    align-self: flex-end;
    font-size: 0.9em;
  }
`