import React from "react";
import {
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./styles.css";
import moduleService, {
  deleteModule,
  updateModule
} from "../services/ModuleService";
import ModuleListComponent from "./ModuleListComponent";
import {Link} from "react-router-dom";

class ModuleComponent extends React.Component {
  state = {
    editing: false,
    moduleTitle: "New Module",
    module: this.props.module,
    highlight: null,
  }

  constructor(props) {
    super(props)
  }

  updateTitle = (event) => {
    const newTitle = event.target.value
    const course = {...this.state.course}
    course.title = newTitle
    this.setState({
      course: course
    })
  }

  updateModule = () => {
    //debugger
    this.setState({editing: false})
    updateModule(this.state.module._id, this.state.module)
  }

  highlight = () => {
   this.setState(this.props.highlightModuleParent(this.state.module._id))
  }

  render() {
    return (
        this.state.module._id === this.props.selectedModuleId &&
        <li onClick={this.highlight} className="list-group-item wbdv-left-content-pane-boxes-highlighted">
          {
            this.state.moduleTitle
          }
          <i onClick={() => this.props.deleteModule(this.props.module)} className="fas fa-times float-right wbdv-module-item-delete-btn"><FontAwesomeIcon icon={faTimes}/></i>
            </li>
        ||

        <li onClick={this.highlight} className="list-group-item wbdv-left-content-pane-boxes">
          {
            this.state.moduleTitle
          }
          <i onClick={() => this.props.deleteModule(this.props.module)} className="fas fa-times float-right wbdv-module-item-delete-btn"><FontAwesomeIcon icon={faTimes}/></i>
        </li>


    )
  }
}

export default ModuleComponent