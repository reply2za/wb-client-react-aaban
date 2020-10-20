import React from "react";
import {connect} from "react-redux";
import lessonService from "../services/LessonService"

const LessonTabs = (
    {
      lessons=[],
      deleteLesson,
      createLessonForModule,
      moduleId,
      updateLesson,
      saveChanges
    }) =>
    <div>
      <h1>Lessons ({lessons.length})</h1>
      <ul>
        {
          lessons.map(lesson =>
              <li key={lesson._id}>
                <button onClick={() => deleteLesson(lesson._id)}>
                  Delete
                </button>
                <button onClick={() => updateLesson({...lesson, editing: true})}>
                  Edit
                </button>
                <button onClick={() => updateLesson({...lesson, editing: false})}>
                  Ok
                </button>
                {
                  !lesson.editing &&
                  <span>{lesson.title}</span>
                }
                {
                  lesson.editing &&
                  <input
                      onChange={(e) => updateLesson({...lesson, title: e.target.value})}
                      value={lesson.title}/>
                }
                <button onClick={() => saveChanges(lesson)}>
                  Save
                </button>
              </li>
          )
        }
      </ul>
      <button onClick={() =>
          createLessonForModule(moduleId)}>
        Create
      </button>
    </div>

const stateToPropertyMapper = (state) => ({
  lessons: state.lessonReducer.lessons,
  moduleId: state.lessonReducer.moduleId
})

const dispatchToPropertyMapper = (dispath) => ({
  saveLesson: (lesson) =>
      lessonService.saveLesson(lesson),
  deleteLesson: (lessonId) =>
      lessonService.deleteLesson(lessonId)
      .then(status => dispath({
        type: "DELETE_LESSON",
        lessonId
      })),
  createLessonForModule: (moduleId) =>
      lessonService
      .createLessonForModule(moduleId, {title: "New Lesson"})
      .then(lesson => dispath({
        type: "CREATE_LESSON",
        lesson
      })),
  updateLesson: (lesson) => dispath({
    type: "UPDATE_LESSON",
    lesson
  })
})

export default connect
(stateToPropertyMapper, dispatchToPropertyMapper)
(LessonTabs)