const tagShowReducer = (state = {show: "all"}, action) => {
  switch(action.type) {
    case "SHOW_ALL":
      return {...state, show: "all"}
    case "SHOW_TAG_NOTES":
      return {...state, show: action.payload}
    default: 
      return state
  }
}

export default tagShowReducer