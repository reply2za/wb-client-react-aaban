
export const widgetReducer = (state ={}, action) => {
    switch(action.type) {
      case "CREATE_WIDGET_FOR_TOPIC" :
        return {
          ...state,
          widgets: [
            ...state.widgets,
              action.widget
          ]
        }
      case "FIND_WIDGETS_FOR_TOPIC" :
        return {
          ...state,
          widgets: action.widgets,
          topicId: action.topicId
        }
      default:
        return state
    }
}

export default widgetReducer

