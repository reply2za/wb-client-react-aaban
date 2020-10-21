import React from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {Login} from "./Login";
import {Register} from "./Register";
import {Profile} from "./Profile";
import "./styles.css";
import CourseListComponent from "./CourseListComponent";
import CourseEditor from "./CourseEditor";
import CourseGridComponent from "./CourseGridComponent";
import "./styles.css";


export class CourseManager extends React.Component {
  render() {
    return(
        <Router>
        <div className="wbdv-light-gray-background">
            <Link to="/login" className="wbdv-nav-buttons-nudge">Login</Link>
            <Link to="/register" className="wbdv-nav-buttons-nudge">Register</Link>
            <Link to="/profile" className="wbdv-nav-buttons-nudge">Profile</Link>
            <Link to="/courses" className="wbdv-nav-buttons-nudge">Course List</Link>

            <Route path="/login" exact component={Login}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/profile" exact component={Profile}/>
            <Route path="/courses" exact component={CourseListComponent}/>
            <Route path="/courses-grid" exact component={CourseGridComponent}/>
          <Route path={[
            "/edit/:courseId",
            "/edit/:courseId/modules/:moduleId",
            "/edit/:courseId/modules/:moduleId/:lessonId",
          ]}
                 exact
                 component={CourseEditor}/>
            <br/>
            <br/>
        </div>
        </Router>
    )
  }
}