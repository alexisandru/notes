import React, {useRef, useState} from 'react'

import styled from 'styled-components'

import arrow from '../assets/arrow.svg'

//import {updateTags} from '../actions'
import {useSelector} from 'react-redux'


import {doc, updateDoc, getDocs, where,  query, collection} from 'firebase/firestore'
import db, { auth } from '../firebase/firebaseConfig'




const UpdateDropDown = ({id}) => {
  //const dispatch = useDispatch()
  const dropdownRef = useRef();

  const noteTags = useSelector(state => state.notes.find(x => x.id === id).tags)
  const tags = useSelector(state => state.tags)
  const [showDropdown, setShowDropdown ] = useState(false)
  
  const openDrop = () => {
    setShowDropdown(!showDropdown)
    if (showDropdown) {
      dropdownRef.current.style.display = "none";  
    
    }else {
      dropdownRef.current.style.display = "block";
    } 
  }

  
  const checkSelectedTag = (idt) => {
    if (noteTags.includes(idt)) {
      const newArray = noteTags.filter(tag => tag !== idt )
      updateTagsNote(newArray)
    } else {
      let s = noteTags
      s.push(idt)
      updateTagsNote(s)
    }
  }
  

  const updateTagsNote = async (newArray) => {
    const notesRef = collection(db, "app", `${auth.currentUser.uid}`, "notes")
    const q = query(notesRef, where("id", "==", id))
    const received = await getDocs(q)
    const docRef = doc(notesRef, received.docs[0].id)
    await updateDoc(docRef, {tags: newArray})
  }

  //onClick={() => dispatch(updateTags(id, tag.id))}
  return (
    <div>
      <ShowTags onClick={() => openDrop()}>
        Update tags
        <img src={arrow} alt=".."/>
      </ShowTags>
      <Dropdown ref={dropdownRef}>
        <DropdownContent>
          <TagsList>
            {tags.map(tag => <Tag onClick={() => checkSelectedTag(tag.id)}><input type="checkbox" readOnly defaultValue={tag.tag} checked={noteTags.includes(tag.id)}/><label>{tag.tag}</label></Tag>)}
          </TagsList>
          <CloseBtn onClick={() => openDrop()}>Cerrar</CloseBtn>
        </DropdownContent>
      </Dropdown>
    </div>
  )
}

export default UpdateDropDown




const Dropdown = styled.div`
  display: none;
  position: absolute;
  background-color: #fff;
  padding: 15px 0;
  border-radius: 15px;
  width: 15%;
  box-shadow: 0 1px 5px 5px rgba(0,0,0,0.1);
`

const DropdownContent = styled.div`
  display: flex;
  flex-direction: column; 
`

const TagsList = styled.ul`
  list-style: none;
  overflow: auto;
  max-height: 30%;
  overflow: auto;
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
`

const CloseBtn = styled.button`
  padding: 6px 20px;
  border-radius: 8px;
  align-self: flex-end;
  margin-right: 20px;
  margin-top: 5px;
  background-color: "#fff";
  color: "#000";
  cursor: pointer;
  font-size: 1em;
  border: 1px solid rgba(0,0,0,0.9);
  margin-left: 10px;

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
  }

  &:hover {
    background-color: rgba(0,0,0,0.1);
  }
`
