const initialState = {
  courses: [],
  course: {}
}
const courseReducer = (state = initialState, action) => {
  switch(action.type) {
    case "FIND_COURSE_BY_ID":
      return {
        ...state,
        course: action.course
      }
    default:
      return state
  }
}

export default courseReducer