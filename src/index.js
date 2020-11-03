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
import HelloComponent from "./components/HelloComponent";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import HelloContainer from "./containers/HelloContainer";
import fsm from "./reducers/fsmReducer";
import CounterComponent from "./components/CounterComponent";
import CounterContainer from "./containers/CounterContainer";
import moduleReducer from "./reducers/modulesReducer";
import courseReducer from "./reducers/courseReducer";
import {lessonReducer} from "./reducers/lessonReducer";
import {topicReducer} from "./reducers/topicReducer";
import widgetReducer from "./reducers/widgetReducer";

const rootReducer = combineReducers({
  fsm,
  moduleReducer,
  courseReducer,
  lessonReducer,
  topicReducer,
  widgetReducer
})

const store = createStore(rootReducer)

ReactDOM.render(
    <Provider store={store}>
      <CourseManager/>
    </Provider>,
    //<CourseManager/>,
  document.getElementById('root')
);
// Route links a certain HTML path to a certain component

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
