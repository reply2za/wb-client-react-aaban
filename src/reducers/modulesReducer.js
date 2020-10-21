import {
  DELETE_MODULE,
  UPDATE_MODULE,
  CREATE_MODULE, CLICKED_MODULE, HIGHLIGHT_MODULE
} from "../actions/moduleActions";

const initialState = {
  modules: [],
  highlight: 0
}

const moduleReducer = (state=initialState, action) => {
  switch (action.type) {
    case "FIND_MODULES_FOR_COURSE":
      return {
        modules: action.modules
      }
    case CREATE_MODULE:
      return {
        modules: [
          ...state.modules,
          action.module
        ]
      }
    case DELETE_MODULE:
      return {
        modules: state.modules.filter(module => module._id !== action.module._id)
      }
    case UPDATE_MODULE:
      return {
        modules: state.modules.map(module => module._id === action.module._id ? action.module : module)
      }
    case HIGHLIGHT_MODULE:
      return {
        modules: [
          ...state.modules
        ],
        highlight: action.module.module._id
      }
    default:
      return state
  }
}

export default moduleReducer