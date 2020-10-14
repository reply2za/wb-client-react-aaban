import React from "react";
import courseService, {updateCourse} from "../services/CourseService";
import {Link} from "react-router-dom";
import {
  faCheck,
  faFileAlt,
  faTrash,
  faPencilAlt,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./styles.css";
import moduleService from "../services/ModuleService";
import CourseRowComponent from "./CourseRowComponent";
import ModuleComponent from "./ModuleComponent";

class ModuleListComponent extends React.Component {



  state = {
    moduleId: '',

      title: 'New Module',

    modules: [],
    selectedModuleId: ''
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    moduleService.findAllModules()
    .then(modules => this.setState({
      modules: modules
    }))
  }

  createModule = () => {
    const newModule = {
      title: this.state.title,
      owner: 'me',
      lastUpdated: 'yesterday'
    }

    // UNSAFE:
    // const newState = {
    //   courses: [
    //     ...this.state.courses, newCourse
    //   ]
    // }
    //
    // this.setState(newState)

    // SAFE:

    moduleService.createModule(newModule)
    .then(actualModule => this.setState(function (prevState) {
          return {
            modules: [
              ...prevState.modules, actualModule
            ]
          }
        })
    )
    .catch(error => {})
  }

  deleteModule = (module) => {
    moduleService.deleteModule(module._id)
    .then(status => this.setState(prevState => ({
      modules: prevState.modules.filter(m => m._id !== module._id)
    })))
  }

  highlightModuleParent = (moduleId) => {
    this.setState({selectedModuleId: moduleId})
  }

  render() {

    return (
        <div className="wbdv-no-padding-top">
        <i onClick={this.createModule}><FontAwesomeIcon icon={faPlus}/></i>
        <ul className="list-group">
          {
            this.state.modules.map(module =>
                <ModuleComponent
                                    key={module._id}
                                    highlightModuleParent ={this.highlightModuleParent}
                                    selectedModuleId ={this.state.selectedModuleId}
                                    deleteModule={this.deleteModule}
                                    module={module}/>
                                    )
          }
        </ul>
        </div>
    )
  }

}

export default ModuleListComponent