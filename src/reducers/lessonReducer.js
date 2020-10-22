const initialState = {
  lessons: [],
  highlight: 0
}

export const lessonReducer = (state=initialState, action) => {
  switch (action.type) {
    case "UPDATE_LESSON":
      return {
        ...state,
        lessons: state
        .lessons
        .map(lesson =>
            lesson._id === action.lesson._id ?
                action.lesson : lesson)
      }
    case "CREATE_LESSON":
      return {
        ...state,
        lessons: [
          ...state.lessons,
          action.lesson
        ],
        highlightedLesson: null
      }
      case "HIGHLIGHT_LESSON":
      return {
        ...state,
        highlightedLesson: action.lessonId,
        generatedLessons: false
      }
    case "DELETE_LESSON":
      return {
        ...state,
        lessons: state.lessons.filter(lesson => lesson._id !== action.lessonId)
      }
    case "FIND_LESSONS_FOR_MODULE":
      console.log("hello-lesson")
      return {
        ...state,
        lessons: action.lessons,
        moduleId: action.moduleId,
        highlightedLesson: 0,
        generatedLessons: true
      }
    default:
      return state
  }
}