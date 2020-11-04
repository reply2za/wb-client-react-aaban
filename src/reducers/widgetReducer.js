
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
    case "DELETE_WIDGET_FOR_TOPIC" :
        return {
          ...state,
          widgets: state.widgets.filter(w => w.id !== action.widget.id)
        }
    case "SAVE_WIDGET_FOR_TOPIC" :
        return {
          ...state,
          widgets: state.widgets.map(w => w)
        }
    case "UPDATE_PARAGRAPH_PREVIEW" :
      action.widget.text = action.e
        return {
          ...state,
          widgets: state.widgets.map(w => w.id === action.widget.id ? action.widget : w)
        }
    case "UPDATE_HEADING_PREVIEW" :
      action.widget.headingText = action.e
        return {
          ...state,
          widgets: state.widgets.map(w => w.id === action.widget.id ? action.widget : w)
        }
    default:
        return state
    }
}

export default widgetReducer

