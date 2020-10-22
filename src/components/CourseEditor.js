import React from "react";
import {findCourseById} from "../services/CourseService";
import LessonTabsComponent from "./LessonTabsComponent";
import ReactDOM from 'react-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./styles.css";
import "./course-editor.style.client.css";
import ModuleListComponent from "./ModuleListComponent";
import ModuleList from "./ModuleList";
import moduleService from "../services/ModuleService";
import {connect} from "react-redux";
//import LessonTabs from "./LessonTabsComponent";
import LessonTabs from "./LessonTabs";
import TopicTabs from "./TopicTabs";
import lessonService from "../services/LessonService";
import topicService from "../services/TopicService";

import {
  faFileAlt,
  fas,
  faBars,
  faPlus,
  faPlusSquare,
  faTimes, faArrowUp, faArrowDown
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

class CourseEditor extends React.Component{

  state = {
    course: {
      title: "",
      _id: ""
    },
    module: []
  }

  // initialization
  componentDidMount() {
    const courseId = this.props.match.params.courseId
    const moduleId = this.props.match.params.moduleId
    const lessonId = this.props.match.params.lessonId
    this.props.findCourseById(courseId)
    this.props.findModulesForCourse(courseId)
    if(moduleId) {
      this.props.findLessonsForModule(moduleId)
    }
    if(lessonId) {
      this.props.findTopicsForLesson(lessonId)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const moduleId = this.props.match.params.moduleId
    const previousModuleId = prevProps.match.params.moduleId
    const lessonId = this.props.match.params.lessonId
    const previousLessonId = prevProps.match.params.lessonId
    if(moduleId !== previousModuleId) {
      this.props.findLessonsForModule(moduleId)
    }
    if(lessonId !== previousLessonId) {
      this.props.findTopicsForLesson(lessonId)
    }
  }

  render() {
    return(
        <body className="wbdv-no-padding-top">
        <div className="container wbdv-float-left">

          <h1 className="wbdv-sticky-header-editor">
            <div className="form-group row">
              <Link to="/courses" className="fas fa-times wbdv-padding-left-header wbdv-course-editor wbdv-close">
                <FontAwesomeIcon icon={faTimes}/>
              </Link>
              <label
                  className="wbdv-header-menu-icon-text wbdv-course-title">CS4550-WebDev</label>
              <ul className="nav nav-pills wbdv-nav-heading-style">
                <li className="nav-item">
                  <a className="nav-link nav-link-color active"
                     href="#">Pages</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link nav-link-color" href="#">Settings</a>
                </li>
              </ul>
              <i className="wbdv-add-course-header-styling fas fa-plus wbdv-icon-align-right"><FontAwesomeIcon icon={faPlus}/></i>
              <i className="fas fa-plus-square wbdv-bottom-right-fixed wbdv-lesson-add-btn wbdv-module-item-add-btn"
                 ><FontAwesomeIcon icon={faPlusSquare}/></i>
            </div>
          </h1>


          <div className="row">
            <div className="col-4 wbdv-left-content-pane-background">
                <ModuleList/>
            </div>


            <div className="col-8 wbdv-lesson-topic-tabs">
              <LessonTabs/>

              <br/>

              <ul className="nav nav-pills">
                <li className="nav-item wbdv-topic-pill-list">
                  <TopicTabs/>
                </li>
              </ul>

              <br/>

              <div>
                <h3 className="wbdv-topic-pill">
                  Heading Widget
                  <span className="float-right">
                        <a className="btn btn-warning">
                            <i className="fas fa-arrow-up wbdv-topic-pill"><FontAwesomeIcon icon={faArrowUp}/></i>
                        </a>
                        <a className="btn btn-warning">
                            <i className="fas fa-arrow-down wbdv-topic-pill"><FontAwesomeIcon icon={faArrowDown}/></i>
                        </a>
                        <select>
                            <option>Heading</option>
                            <option>MP4</option>
                            <option>Image</option>
                            <option>Document</option>
                            <option>Slides</option>
                        </select>
                        <a className="btn btn-danger ">Delete</a>
                            </span>
                </h3>

                <input className="form-control wbdv-add-top-spacing"
                       placeholder="Heading text"/>
                <select className="form-control wbdv-add-top-spacing">
                  <option>Heading 1</option>
                  <option>Heading 2</option>
                  <option>Heading 3</option>
                  <option>Heading 4</option>
                  <option>Heading 5</option>
                </select>
                <input className="form-control wbdv-add-top-spacing"
                       title="Name your widget" placeholder="Widget Name"/>
              </div>


            </div>
          </div>


        </div>
        </body>
    )
  }
}

const stateToProperty = (state) => ({
  course: state.courseReducer.course
})
const propertyToDispatchMapper = (dispatch) => ({
  findTopicsForLesson: lessonId => {
    topicService.findTopicsForLesson(lessonId)
    .then(topics => dispatch({
      type: "FIND_TOPIC_FOR_LESSON",
      topics,
      lessonId
    }))
  },
  findLessonsForModule: moduleId => {
    lessonService.findLessonsForModule(moduleId)
    .then(lessons => dispatch({
      type: "FIND_LESSONS_FOR_MODULE",
      lessons,
      moduleId
    }))
  },
  findModulesForCourse: courseId =>
      moduleService.findModulesForCourse(courseId)
      .then(actualModules => dispatch({
        type: "FIND_MODULES_FOR_COURSE",
        modules: actualModules
      })),
  findCourseById: (courseId) => findCourseById(courseId)
  .then(actualCourse => dispatch({
    type: "FIND_COURSE_BY_ID",
    course: actualCourse
  }))
})

export default connect
(stateToProperty, propertyToDispatchMapper)
(CourseEditor)