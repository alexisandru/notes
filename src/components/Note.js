import React from 'react'
import styled from 'styled-components'

import {useSelector} from 'react-redux'

const Note = ({show, note, id}) => {

  const tags = useSelector(state => state.tags)
  
  const tagsItems = () => {
    if (note.tags.length > 2) {
      const t =  note.tags.slice(0,2).map(item => <Tag>{tags.find(x => x.id === item).tag}</Tag>)
      return (
        <>
          {t}
          <Tag>+ {note.tags.length - 2} tags</Tag>
        </>
      )
    } else {
      return note.tags.map(item => <Tag>{tags.find(x => x.id === item).tag}</Tag>)
    } 
  }


  return(
    <Container onClick={() => {show(true); id(note.id)}}>
      <Title>{note.title}</Title>
      <Description>
        {note.description}
      </Description>
      <Tags>
         {tagsItems()}
      </Tags>
    </Container>
  )
}

export default Note


const Container = styled.div`
  background-color: #fff;
  border-radius: 10px; 
  padding: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  overflow: hidden;
  cursor: pointer;

  box-shadow: 0px 10px 15px 5px rgba(0,0,0,0.1); 
`

const Title = styled.h3`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-bottom: 15px;
`
const Description = styled.div`
  font-size: 1em;
  overflow: hidden;
  height: 100%;
  white-space: pre-wrap;
`

const Tags = styled.div`  
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-top: 2px;
`

const Tag = styled.label`
  background-color: rgba(0,0,0,0.1);
  border-radius: 15px;
  padding: 3px 5px;
  margin-right: 10px;
  font-size: 0.8em;
  overflow: hidden;
  font-weight: 500;
`