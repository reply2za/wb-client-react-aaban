import React from "react";
import LessonTabIComponent from "./LessonTabIndividualComponent";

class LessonTabsComponent extends React.Component {
    state = {
      tabId: '',

      title: 'New Module',

      tab: [{
        title: "tab 1"
      },
        {
          title: "tab 2"
        }
      ],
      selectedTabId: ''
    }



  constructor(props) {
    super(props)
  }

  highlightModuleParent = (tabId) => {
    this.setState({selectedTabId: tabId})
  }

    render() {
      return (
    <div>
      <ul className="nav nav-tabs">
      {
        this.state.tab.map(tab =>
            <LessonTabIComponent className="fas fa-file-alt"
                                key={tab._id}
                                 selectedTabId ={this.state.selectedTabId}
                                title={tab.title}/>)
      }
        <li className="nav-item">
          <a href="#" className="nav-link wbdv-lesson-tabs">Lesson 1</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link active wbdv-lesson-tabs">Lesson
            2</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link wbdv-lesson-tabs">Lesson 3</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link wbdv-lesson-tabs">Lesson 4</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link wbdv-lesson-tabs">Lesson 5</a>
        </li>
      </ul>
    </div>
      )
    }
}
export default LessonTabsComponent