export const addTag = (tag) => {
  return {
    type: "ADD_TAG",
    payload: tag
  }
}

export const showSidebar = () => {
  return {
    type: "SHOW_SIDEBAR"
  }
}

export const closeSidebar = () => {
  return {
    type: "CLOSE_SIDEBAR"
  }
}

export const restartNotes = () => {
  return {
    type: "RESTART_STATE"
  }
}

export const restartTags = () => {
  return {
    type: "RESTART_TAGS"
  }
}

export const initialTags = (tag) => {
  return {
    type: "INITIAL_TAGS",
    payload: tag
  }
}

export const initialNotes = (notes) => {
  return {
    type: "INITIAL_STATE",
    payload: notes
  }
}

export const addNote = (note) => {
  return {
    type: "ADD_NOTE",
    payload: note
  }
}

export const updateTags = (id, tagId) => {
  return {
    type: "UPDATE_TAGS",
    payload: {id, tagId}
  }
}

export const updateNote = (note) => {
  return {
    type: "UPDATE_NOTE",
    payload: note
  }
}

export const deleteNote = (id) => {
  return {
    type: "DELETE_NOTE",
    payload: id
  }
}

export const showTagNotes = (id) => {
  return {
    type: "SHOW_TAG_NOTES",
    payload: id
  }
}

export const showAllNotes = () => {
  return {
    type: "SHOW_ALL",
  }
}