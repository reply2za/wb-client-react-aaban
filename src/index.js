import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import "bootstrap/dist/css/bootstrap.min.css"
import App from './App';
import * as serviceWorker from './serviceWorker';
import CourseListComponent from "./components/CourseListComponent";
import {Login} from "./components/Login";
import {Register} from "./components/Register";
import {Profile} from "./components/Profile";
//import {BrowserRouter, Link, Route} from "react-router-dom";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import {CourseEditor} from "./components/CourseEditor";
import {CourseManager} from "./components/CourseManager";
import "./components/styles.css"
ReactDOM.render(
    <CourseManager/>,
  document.getElementById('root')
)
// Route links a certain HTML path to a certain component

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
