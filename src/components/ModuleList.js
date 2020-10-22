import React from "react";
import {connect} from "react-redux";
import "./styles.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  DELETE_MODULE,
  CREATE_MODULE,
  UPDATE_MODULE,
  updateModule,
  createModule,
  deleteModule,
  highlightModule, unHighlightLesson
} from "../actions/moduleActions";
import {Link} from "react-router-dom";
import {
  faCheck,
  faPen,
  faPlus,
  faTimes
} from "@fortawesome/free-solid-svg-icons";

const ModuleList = (
    { course,
      highlight,
      modules=[],
      deleteModule,
      highlightModule,
      highlightedLesson,
      createModule,
      updateModule}) =>
    <div>
      <h2>Modules for {course.title}</h2>
      <h3 className="wbdv-module-plus-button">
        <i onClick={() => createModule(course, {title: "New Module"})}>
          <FontAwesomeIcon icon={faPlus}/>
        </i>
      </h3>
      <ul className="list-group">
        {
          console.log(highlight) ||
          modules.map(module =>
              <div className="Link" key={module._id}>
                <i
                    onClick={() => deleteModule(module)}>
                  <FontAwesomeIcon icon={faTimes}/>
                </i>
                {
                  module.editing &&
                  <div className="wbdv-highlight-background wbdv-display-inline">
                    &nbsp;
                <i onClick={() =>
                    updateModule({...module, editing: false})
                }>
                  <FontAwesomeIcon icon={faCheck}/>
                </i>
                <input
                    onChange={(event) =>
                        updateModule({...module, title: event.target.value})
                    }
                    value={module.title}/>
                    &nbsp;&nbsp;&nbsp;
              </div>
                }
                {
                  !module.editing && highlight === module._id &&
                  <span className="wbdv-highlight-background">
                    &nbsp; &nbsp;
                    <i onClick={
                      () => updateModule({...module, editing: true})}>
                  <FontAwesomeIcon icon={faPen}/>
                </i>
                    &nbsp;&nbsp;
                    <Link to={`/edit/${course._id}/modules/${module._id}`}>
                {module.title}
                </Link>
                    &nbsp; &nbsp; &nbsp;
              </span>
                }

                { //UNSELECTED MODULE
                  !module.editing && highlight !== module._id &&
                  <span>
                    &nbsp; &nbsp;
                <i onClick={
                  () => updateModule({...module, editing: true})}>
                  <FontAwesomeIcon icon={faPen}/>
                </i>
                    &nbsp;&nbsp;
                <Link to={`/edit/${course._id}/modules/${module._id}`}
                      onClick={
                        () => {highlightModule({module})}}>
                {module.title}
                </Link>
                    &nbsp; &nbsp; &nbsp;
              </span>
                }

              </div>)
        }
      </ul>
    </div>

// export default ModuleList

const stateToPropertyMapper = (state) => ({
  modules: state.moduleReducer.modules,
  highlight: state.moduleReducer.highlight,
  course: state.courseReducer.course,
})

const propertyToDispatchMapper = (dispatch) => ({
  deleteModule: (module) => deleteModule(dispatch, module),
  createModule: (course, module) => createModule(dispatch, course, module),
  updateModule: (module) => updateModule(dispatch, module),
  highlightModule: (module) => highlightModule(dispatch, module),
})
export default connect
(stateToPropertyMapper,
    propertyToDispatchMapper)
(ModuleList)