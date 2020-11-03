import React from "react";
import {connect} from "react-redux";
import lessonService from "../services/LessonService"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import "./styles.css";
import {
  faCheck,
  faPen, faPlus, faSave,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import NavbarToggle from "react-bootstrap/NavbarToggle";

const LessonTabs = (
    {
      lessons=[],
      deleteLesson,
      createLessonForModule,
      moduleId,
      updateLesson,
      saveLesson,
      course,
      highlightLesson,
      highlightedLesson,
      highlightedModule,
      generatedModules
    }) =>
    <div>
      <h1>
        Lessons
        { generatedModules === false &&
        `(${lessons.length})`
        }
          </h1>

      <ul className="nav nav-tabs">
        {
          lessons.map(lesson =>

              <li className="nav-item" key={lesson._id}>
                {
                  generatedModules === false &&
                  lesson.editing === true &&
                      <span>
                  <i onClick={() => deleteLesson(lesson._id)}>
                  <FontAwesomeIcon icon={faTimes}/>
                  &nbsp;
                  </i>
                  <i
                      onClick={() => updateLesson({...lesson, editing: false})}>
                    <FontAwesomeIcon icon={faCheck}/>
                  </i>
                      </span>
                }
                {
                  generatedModules === false &&
                  !lesson.editing && highlightedLesson === lesson._id && moduleId === highlightedModule &&
                      <span className="wbdv-highlight-background-dark">
                  <i onClick={() => updateLesson({...lesson, editing: true})}>
                    &nbsp;
                    <FontAwesomeIcon icon={faPen}/>
                    &nbsp;
                    <i onClick={() => saveLesson(lesson)}>
                  &nbsp;
                      <FontAwesomeIcon icon={faSave}/>
                      &nbsp;
                </i>
                  </i>
                  <Link onClick={() => highlightLesson(lesson._id)}
                        to={`/edit/${course._id}/modules/${moduleId}/lessons/${lesson._id}`} >
                    {lesson.title}
                  </Link>
                        &nbsp; &nbsp; &nbsp;
                      </span>
                }


                {
                  generatedModules === false &&
                  //Not highlighted or selected
                  !lesson.editing && highlightedLesson !== lesson._id &&
                      <span>
                        &nbsp;
                  <i onClick={() => updateLesson({...lesson, editing: true})}>
                    <FontAwesomeIcon icon={faPen}/>
                    &nbsp;
                    <i onClick={() => saveLesson(lesson)}>
                  &nbsp;
                      <FontAwesomeIcon icon={faSave}/>
                      &nbsp;
                </i>
                  </i>
                  <Link to={`/edit/${course._id}/modules/${moduleId}/lessons/${lesson._id}`}
                        onClick={() => highlightLesson(lesson._id)}>
                    {lesson.title}
                  </Link>
                    &nbsp; &nbsp; &nbsp;
                      </span>
                }


                {
                  generatedModules === false &&
                  lesson.editing &&
                  <input
                      onChange={(e) => updateLesson({...lesson, title: e.target.value})}
                      value={lesson.title}/>
                }
              </li>
          )
        }
        {
          generatedModules === false &&
      <i onClick={() =>
          createLessonForModule(moduleId)}>
        <FontAwesomeIcon color="green" icon={faPlus}/>
      </i>
        }
        {
          generatedModules === true &&
      <span>
        No module selected
      </span>
        }
      </ul>
    </div>

const stateToPropertyMapper = (state) => ({
  lessons: state.lessonReducer.lessons,
  moduleId: state.lessonReducer.moduleId,
  course: state.courseReducer.course,
  highlightedLesson: state.lessonReducer.highlightedLesson,
  highlightedModule: state.moduleReducer.highlight,
  generatedModules: state.moduleReducer.generatedModules,
})

const dispatchToPropertyMapper = (dispatch) => ({
  saveLesson: (lesson) =>
      lessonService.saveLesson(lesson)
      .then(status => dispatch({
        type: "SAVE_LESSON",
        lesson
      })),
  deleteLesson: (lessonId) =>
      lessonService.deleteLesson(lessonId)
      .then(status => dispatch({
        type: "DELETE_LESSON",
        lessonId
      })),
  createLessonForModule: (moduleId) =>
      lessonService
      .createLessonForModule(moduleId, {title: "New Lesson"})
      .then(lesson => dispatch({
        type: "CREATE_LESSON",
        lesson
      })),
  updateLesson: (lesson) => dispatch({
    type: "UPDATE_LESSON",
    lesson
  }),
  highlightLesson: (lessonId) => dispatch({
    type: "HIGHLIGHT_LESSON",
    lessonId
  })
})

export default connect
(stateToPropertyMapper, dispatchToPropertyMapper)
(LessonTabs)