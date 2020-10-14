import React from "react";
import CourseCardComponent from "./CourseCardComponent";
import courseService from "../services/CourseService";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./course-list.style.client.css";
import "./styles.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileAlt, fas, faBars, faPlusCircle, faList} from "@fortawesome/free-solid-svg-icons";
import {library} from '@fortawesome/fontawesome-svg-core';
//import {Link} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {classes} from "istanbul-lib-coverage";
import { Row, Col } from 'react-simple-flex-grid';
import "react-simple-flex-grid/lib/main.css";
import CourseRowComponent from "./CourseRowComponent";



library.add (
    faFileAlt,
    fas,
    faBars,
    faPlusCircle,
    faList
)
class CourseGridComponent extends React.Component {
  state = {
    courses: [],
    newTitle: "New Course"
  }

  FormRow() {
    return (
        <React.Fragment>
          <Grid item xs={4}>
            <Paper >item1</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>item2</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>item3</Paper>
          </Grid>
        </React.Fragment>
    );
  }

  componentDidMount() {
    courseService.findAllCourses()
    .then(courses => this.setState({
      courses: courses
    }))
  }

  createCourse = () => {
    const newCourse = {
      title: this.state.newTitle,
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

    courseService.createCourse(newCourse)
    .then(actualCourse => this.setState(function (prevState) {
          return {
            courses: [
              ...prevState.courses, actualCourse
            ]
          }
        })
    )
    .catch(error => {})
  }

  deleteCourse = (course) => {
    courseService.deleteCourse(course._id)
    .then(statu => this.setState(prevState => ({
      courses: prevState.courses.filter(c => c._id !== course._id)
    })))
  }

  goToTableView = () => {
    this.props.history.push('/courses')
  }

  render() {
    return(
        <body className="wbdv-light-gray-background">
        <div className="container">
          <h1 className="wbdv-sticky-header">
            <div className="form-group row">

              <i onClick={this.createCourse}
                 className="fas fa-bars wbdv-padding-left-header">
                <FontAwesomeIcon icon={faBars}/>
              </i>
              <label htmlFor="headerSearch" className="wbdv-header-menu-icon">Course
                Manager</label>

              <input id="headerSearch" placeholder="New Course Title"
                     className="form-control col-sm-6 wbdv-header-search-bar"/>

              <i
                  onClick={this.createCourse}
                  className="wbdv-add-course-header-styling fas fa-plus-circle wbdv-circle-add-style">
                <FontAwesomeIcon icon={faPlusCircle}/>
              </i>
              <i
                  onClick={this.createCourse}
                  className=" wbdv-bottom-right-fixed fas fa-plus-circle wbdv-circle-add-style">
                <FontAwesomeIcon icon={faPlusCircle}/>
              </i>

            </div>
          </h1>


          <div className="table form-group row">


                <Grid container spacing = {3}>

                  {
                    this.state.courses.map(course =>

                          <Grid item xs={3}>
                            <Paper>
                        <CourseRowComponent className="fas fa-file-alt"
                                            key={course._id}
                                            deleteCourse={this.deleteCourse}
                                            course={course}/>
                            </Paper>
                          </Grid>

                                            )
                  }

                </Grid>

            </div>
        </div>
        </body>
    )
  }
}

export default CourseGridComponent