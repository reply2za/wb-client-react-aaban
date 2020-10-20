import {connect} from "react-redux";
import CounterComponent from "../components/CounterComponent";

const stateToPropertyMapper = (state) => ({
  counter: state.fsm.count
})

const propertyToDispatchMapper = (dispatch) => ({
      up: () => {dispatch({type: "UP"})},
      down: () => {dispatch({type: "DOWN"})}
    }
)

export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(CounterComponent)