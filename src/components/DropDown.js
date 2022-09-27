import React, {useRef, useState} from 'react'
import styled from 'styled-components'

import arrow from '../assets/arrow.svg'

import {useSelector} from 'react-redux'

const DropDown = ({setTags}) => {
  const dropdownRef = useRef();

  const tags = useSelector(state => state.tags)
  const [showDropdown, setShowDropdown ] = useState(false)
  const [selectedTags, setSelectedTadgs] = useState([])

  const openDrop = () => {
    setShowDropdown(!showDropdown)
    if (showDropdown) {
      dropdownRef.current.style.display = "none";  
      setTags(selectedTags)
    }else {
      dropdownRef.current.style.display = "block";
    } 
  }

  const checkSelectedTag = (id) => {
    if (selectedTags.includes(id)) {
      const newArray = selectedTags.filter(tag => tag !== id )      
      setSelectedTadgs(newArray)
    } else {
      setSelectedTadgs([...selectedTags, id])
    }
  }

  return (
    <Container>
      <ShowTags onClick={() => openDrop()}>
        Select tag
        <Icon src={arrow} alt=".."/>
      </ShowTags>
      <Dropdown ref={dropdownRef}>
        <DropdownContent>
          <TagsList>
            {tags.map(tag => <Tag onClick={() => checkSelectedTag(tag.id)}><input type="checkbox" value={tag.tag} checked={selectedTags.includes(tag.id)}/><label>{tag.tag}</label></Tag>)}
          </TagsList>
          <CloseBtn onClick={() => openDrop()}>Cerrar</CloseBtn>
        </DropdownContent>
      </Dropdown>
    </Container>
  )
}

export default DropDown


const Container = styled.div`
  @media screen and (max-width: 370px) {
    align-self: flex-start;
  }
`

const Icon = styled.img`
  filter: ${props => props.theme.icon};
`

const Dropdown = styled.div`
  display: none;
  position: absolute;
  background-color: ${props => props.theme.inputBackground};
  padding: 15px 0;
  border-radius: 15px;
  width: 15%;
  box-shadow: 0 1px 5px 5px rgba(0,0,0,0.1);


  @media screen and (max-width: 650px) {
    width: 60%;
    height: 40%;
  }
`

const DropdownContent = styled.div`
  display: flex;
  flex-direction: column; 
  height: 100%;
`

const TagsList = styled.ul`
  list-style: none;
  overflow: auto;
  
  height: 100%;
  @media screen and (max-width: 650px) {
    
    overflow:hidden;
    overflow-y: scroll;
  }
`

const Tag = styled.li`
  padding: 5px 20px;
  font-size: 1.1em;
  cursor: pointer;

  &>input[type=checkbox] {
    transform: scale(1.2);
    margin-right: 8px;
  }

  &:hover {
    background-color: rgba(0,0,0,0.1);
  }

  @media screen and (max-width: 650px) {
    font-size: 1em;
  }
`

const CloseBtn = styled.button`
  padding: 6px 20px;
  border-radius: 8px;
  align-self: flex-end;
  margin-right: 20px;
  margin-top: 5px;
   background-color: ${props => props.theme.secondaryButton};
  color: ${props => props.theme.color};
  cursor: pointer;
  font-size: 1em;
  
  margin-left: 10px;
  border: ${props => props.border ? `1px solid rgba(0,0,0,0.9)` : ''};

  &:hover {
    background-color: rgba(0,0,0,0.08);
  }
`

const ShowTags = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 2px 10px;
  border-radius: 8px;
  cursor: pointer;

  font-size: 1.1em;

  & > img {
    width: 35px;
    margin-left: 10px;
    @media screen and (max-width: 650px) {
      width: 20px;
      margin-left: 5px;
    }
  }

  &:hover {
    background-color: rgba(0,0,0,0.1);
  }

  @media screen and (max-width: 650px) {
    font-size: 0.9em; 

  }
`
