import React from "react";
import {Link} from "react-router-dom";
import {
  faCheck,
  faFileAlt,
  faTrash,
  faPencilAlt,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./styles.css";


class LessonTabIndividualComponent extends React.Component {
  state = {
    editing: false,
    tabTitle: "tabTitle",
    tab: this.props.tab,
    highlight: null,
  }

  constructor(props) {
    super(props)
  }

  highlight = () => {
    this.setState(this.props.highlightModuleParent(this.state.tab._id))
  }

  render() {

    return (

        <div>
          {
            <li className="nav-item">
            <a onClick={this.highlight} href="#" className="nav-link wbdv-lesson-tabs">{
              this.state.tabTitle
            }</a>
            </li>
          }
        </div>
    )
  }
}

export default LessonTabIndividualComponent