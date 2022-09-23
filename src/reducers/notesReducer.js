import {addDoc, collection, doc} from 'firebase/firestore'
import db, {auth} from '../firebase/firebaseConfig'

//const unsub = await onSnapshot(collection(db, "notes"), (doc) => doc.data());

//import dataa from '../assets/data.json'
//const data = await getDocs(collection(db, "notes"))

const notesReducer = (state = [], action) => {
  switch(action.type) {
    case "RESTART_STATE":
      return []
    case "INITIAL_STATE":
      return [...state, action.payload]
    case "ADD_NOTE":
      let lastIndex = state.at(0)
      let va 
      if (lastIndex === undefined) {
        va = 0
      } else { 
        va = lastIndex.id
      }
      //return [{id: va + 1, ...action.payload}, ...state]
      const uid = auth.currentUser.uid 
      const dcRef = doc(db, "app", uid)
      // eslint-disable-next-line
      const docRef =  addDoc(collection(dcRef, "notes"), {id: va + 1, ...action.payload})
      return [...state]
    case "UPDATE_TAGS":
      const checkTags = (tags, tagId) => {
        if (tags.includes(tagId)) {
          const arrayNew = tags.filter(x => x !== tagId)
          return arrayNew
        } else {
          return [...tags, tagId]
        }
      }
      const updated = state.map(note => note.id === action.payload.id 
        ? {...note, tags: checkTags(note.tags, action.payload.tagId)}
        : note
      )  
      return updated
    case "UPDATE_NOTE": 
      return state.map(note => note.id === action.payload.id
        ? {...note, ...action.payload}
        : note
      )
    case "DELETE_NOTE":
      return state.filter(item => item.id !== action.payload)
    default:
      return state
  }
}

export default notesReducer

//{...note, tags: action.payload.tags}