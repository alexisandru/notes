import {combineReducers} from 'redux'

import tagsReducer from './tagsReducer'
import notesReducer from './notesReducer'
import tagShowReducer from './tagShowReducer'
import sidebarReducer from './sidebarReducer'

const allReducers = combineReducers({
  tags: tagsReducer,
  notes: notesReducer,
  showTags: tagShowReducer,
  sidebar: sidebarReducer
})

export default allReducers