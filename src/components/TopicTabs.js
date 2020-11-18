import React from "react";
import {connect} from "react-redux";
import topicService from "../services/TopicService"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./styles.css";
import {
  faCheck,
  faPen, faPlus, faSave,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
const TopicTabs = (
    {
      topics=[],
      deleteTopic,
      createTopicForLesson,
      lessonId,
      updateTopic,
      moduleId,
      saveTopic,
      course,
      highlightTopic,
      highlightedTopic,
      generatedLessons,
      generatedModules
    }) =>

    <div>
      {generatedModules === false &&
    <div>
      <h1>Topics
        { generatedLessons === false &&
        `(${topics.length})`
        }
        </h1>
      <ul className="nav nav-tabs">
        {
          topics.map(topic =>
              <span className="nav-item" key={topic._id}>
                &nbsp; &nbsp;

                {
                  generatedLessons === false &&
                  topic.editing === true &&

                    <span>
                  <i
                      onClick={() => updateTopic({...topic, editing: false})}>
                    <FontAwesomeIcon icon={faCheck}/>
                  </i>
                      &nbsp;
                <i onClick={() => deleteTopic(topic._id)}>
                  <FontAwesomeIcon icon={faTimes}/>
                  &nbsp;
                </i>
                    </span>

                }

                {
                  generatedLessons === false &&
                  !topic.editing && highlightedTopic === topic._id &&
                  <span className="wbdv-highlight-background-dark">
                    <i onClick={() => updateTopic({...topic, editing: true})}>
                  <FontAwesomeIcon icon={faPen}/>
                  &nbsp;
                    </i>
                    <i onClick={() => saveTopic(topic)}>
                  &nbsp;
                      <FontAwesomeIcon icon={faSave}/>
                    </i>
                    &nbsp;
                  <Link onClick={() => highlightTopic(topic._id)}
                        to={`/edit/${course._id}/modules/${moduleId}/lessons/${lessonId}/topics/${topic._id}`}>
                    {topic.title}
                    &nbsp; &nbsp; &nbsp;
                  </Link>
                      </span>
                }

                {
                  // Not editing & Not highlighted
                  generatedLessons === false &&
                  !topic.editing && highlightedTopic !== topic._id &&
                      <span>
                        <i onClick={() => updateTopic({...topic, editing: true})}>
                  <FontAwesomeIcon icon={faPen}/>
                  &nbsp;
                        </i>
                         <i onClick={() => saveTopic(topic)}>
                  &nbsp;
                           <FontAwesomeIcon icon={faSave}/>
                    </i>
                        &nbsp;
                  <Link onClick={() => highlightTopic(topic._id)}
                        to={`/edit/${course._id}/modules/${moduleId}/lessons/${lessonId}/topics/${topic._id}`}>
                    {topic.title}
                    &nbsp; &nbsp; &nbsp;
                  </Link>
                      </span>
                }

                {
                  generatedLessons === false &&
                  topic.editing &&
                  <input
                      onChange={(e) => updateTopic({...topic, title: e.target.value})}
                      value={topic.title}/>
                }

              </span>
          )
        }

        {
          generatedLessons === false &&
        <i onClick={() =>
            createTopicForLesson(lessonId)}>
          <FontAwesomeIcon color="green" icon={faPlus}/>
        </i>
        }

        {
          generatedLessons === true &&
          <span>
        No lesson selected
      </span>
        }
      </ul>
    </div>
      }
      {
        generatedModules === true &&
            <div>
              <h1>Topics</h1>
              <p>No Lesson Selected</p>
            </div>

      }
    </div>

const stateToPropertyMapper = (state) => ({
  topics: state.topicReducer.topics,
  lessonId: state.topicReducer.lessonId,
  moduleId: state.lessonReducer.moduleId,
  course: state.courseReducer.course,
  highlightedTopic: state.topicReducer.highlightedTopic,
  generatedLessons: state.lessonReducer.generatedLessons,
  generatedModules: state.moduleReducer.generatedModules
})

const dispatchToPropertyMapper = (dispatch) => ({
  saveTopic: (topic) =>
      topicService.saveTopic(topic)
      .then(status => dispatch({
        type: "SAVE_TOPIC",
        topic
      })),
  deleteTopic: (topicId) =>
      topicService.deleteTopic(topicId)
      .then(status => dispatch({
        type: "DELETE_TOPIC",
        topicId
      })),
  createTopicForLesson: (lessonId) =>
  {
    console.log(lessonId)
    topicService
    .createTopicForLesson(lessonId, {title: "New Topic"})
    .then(topic => dispatch({
      type: "CREATE_TOPIC",
      topic
    }))
  }
  ,
  updateTopic: (topic) =>
      dispatch({
    type: "UPDATE_TOPIC",
    topic
  }),

  highlightTopic: (topicId) =>
      dispatch({
    type: "HIGHLIGHT_TOPIC",
    topicId
  })
})

export default connect
(stateToPropertyMapper, dispatchToPropertyMapper)
(TopicTabs)
