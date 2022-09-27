import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { useDispatch, useSelector } from 'react-redux'
import {addTag} from '../actions'

const AddTag = ({close}) => {
  const dispatch = useDispatch()
  const tags = useSelector(state => state.tags)

  const inputRef = useRef(null)
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const [newTag, setNewTag] = useState({
    id: 0,
    tag: ""
  })

  const handleTag = (e) => {
    setNewTag({id: tags.length + 1, tag: e.target.value})
  }

  const sendTag = () => {
    if(newTag.tag.trim().length !== 0) {
      setNewTag({...newTag, tag: newTag.tag.trim()})
      dispatch(addTag(newTag))
      close(false)
      setNewTag({
        id: 0,
        tag: ""
      })
    }
  }

  return (
    <Container>
      <input 
        type="text" 
        onChange={handleTag} 
        value={newTag.tag} 
        ref={inputRef}
      />
      <Buttons>
        <Button onClick={() => close(false)}>Cancel</Button>
        <Button save onClick={() => sendTag()}>Add</Button>
      </Buttons>
    </Container>
  )
}

export default AddTag


const Container = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 20px;

  &>input {
    padding: 5px;
    border-radius: 5px;
    border: 1px solid rgba(0,0,0,0.3);
    font-size: 1em;
    background-color: ${props => props.theme.inputBackground};
    color: ${props => props.theme.color};
  }
`

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 5px;
`

const Button = styled.button`
  width: 50%;
  padding: 6px 20px;
  border-radius: 8px;
  background-color: ${props => props.save ? props.theme.primaryButton : props.theme.secondaryButton};
  color: ${props => props.save ? "#fff" : props.theme.color};
  cursor: pointer;
  font-size: 1em;
  border: ${props => props.border ? `1px solid rgba(0,0,0,0.9)` : ''};
`