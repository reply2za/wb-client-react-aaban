import React from "react";
import {connect} from "react-redux";
import {
  DELETE_MODULE,
  CREATE_MODULE,
  UPDATE_MODULE,
  updateModule,
  createModule,
  deleteModule
} from "../actions/moduleActions";
import {Link} from "react-router-dom";

const ModuleList = (
    { course,
      modules=[],
      deleteModule,
      createModule,
      updateModule}) =>
    <div>
      <h1>Modules for {course.title}</h1>
      <ul>
        {
          modules.map(module =>
              <li key={module._id}>
                <button
                    onClick={() => deleteModule(module)}>
                  Delete
                </button>
                {
                  module.editing &&
                  <span>
                <button onClick={() =>
                    updateModule({...module, editing: false})
                }>
                  Ok
                </button>
                <input
                    onChange={(event) =>
                        updateModule({...module, title: event.target.value})
                    }
                    value={module.title}/>
              </span>
                }
                {
                  !module.editing &&
                  <span>
                <button onClick={
                  () => updateModule({...module, editing: true})}>
                  Edit
                </button>
                <Link to={`/edit/${course._id}/modules/${module._id}`}>
                {module.title}
                </Link>
              </span>
                }
              </li>)
        }
      </ul>
      <button onClick={() => createModule(course, {title: "New Module"})}>
        Create Module
      </button>
    </div>

// export default ModuleList

const stateToPropertyMapper = (state) => ({
  modules: state.moduleReducer.modules,
  course: state.courseReducer.course
})

const propertyToDispatchMapper = (dispatch) => ({
  deleteModule: (module) => deleteModule(dispatch, module),
  createModule: (course, module) => createModule(dispatch, course, module),
  updateModule: (module) => updateModule(dispatch, module)
})

export default connect
(stateToPropertyMapper,
    propertyToDispatchMapper)
(ModuleList)