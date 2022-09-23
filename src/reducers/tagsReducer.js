
import { addDoc, collection, doc } from 'firebase/firestore'
import db, {auth} from '../firebase/firebaseConfig'

const tagsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TAG":
      let lastIndex = state.slice(-1)
      if (lastIndex) {
        lastIndex.id = 0
      }

      const uid = auth.currentUser.uid 
      const dcRef = doc(db, "app", uid)
      const docRef = addDoc(collection(dcRef, "tags"), {id: lastIndex.id + 1, ...action.payload})
      
    case "RESTART_TAGS":
      return []
    case "INITIAL_TAGS":
      return [...state, action.payload]
    default: 
      return state
  }
}

export default tagsReducer