const sidebarReducer = (state = {width: 0}, action) => {
  switch(action.type) {
    case "SHOW_SIDEBAR":
      return {...state, width: 100}
    case "CLOSE_SIDEBAR":
      return {...state, width: 0}
    default:
      return state
  }
}

export default sidebarReducer