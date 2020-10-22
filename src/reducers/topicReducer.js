const initialState = {
  topics: [],
  highlight: 0
}

export const topicReducer = (state=initialState, action) => {
  switch (action.type) {
    case "UPDATE_TOPIC":
      return {
        ...state,
        topics: state
        .topics
        .map(topic =>
            topic._id === action.topic._id ?
                action.topic : topic)
      }
    case "CREATE_TOPIC":
      return {
        ...state,
        topics: [
          ...state.topics,
          action.topic
        ],
        highlightedTopic: null
      }
    case "HIGHLIGHT_TOPIC":
      return {
        ...state,
        highlightedTopic: action.topicId
      }
    case "DELETE_TOPIC":
      return {
        ...state,
        topics: state.topics.filter(topic => topic._id !== action.topicId)
      }
    case "FIND_TOPICS_FOR_LESSON":
      console.log("hello-topic")
      return {
        ...state,
        topics: action.topics,
        lessonId: action.lessonId,
        highlightedTopic: 0,
      }
    default:
      return state
  }
}