import React from "react";
import {updateCourse} from "../services/CourseService";
import {Link} from "react-router-dom";
import {faCheck, faFileAlt, faTrash, faPencilAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./styles.css";

class CourseRowComponent extends React.Component {
  state = {
    editing: false,
    courseTitle: "Some Course",
    course: this.props.course,
    highlight: false
  }

  constructor(props) {
    super(props)
  }

  updateTitle = (event) => {
    const newTitle = event.target.value
    const course = { ...this.state.course }
    course.title = newTitle
    this.setState({
      course: course
    })
  }

  updateCourse = () => {
    //debugger
    this.setState({editing: false})
    updateCourse(this.state.course._id, this.state.course)
  }

  highlight = () => {
    if (this.state.highlight === true && this.state.editing === false) {
      this.setState({highlight: false})
    } else {
      this.setState({highlight: true})
    }
  }

  keepHighlighted = () => {
      this.setState({highlight: true})
  }


  render() {
    return (
        this.state.highlight === false &&
        <tr >
          <td onClick={this.highlight}>
            {
              this.state.editing === true &&
              <input onClick={this.keepHighlighted}
                  onChange={this.updateTitle}
                  value={this.state.course.title}/>
            }
            {
              this.state.editing === false &&
              <Link to={`/edit/${this.state.course._id}`}>
                <FontAwesomeIcon icon={faFileAlt} className="wbdv-small-nudge-right"/> {this.state.course.title}
              </Link>
            }
          </td>
          <td onClick={this.highlight}>{this.props.course.owner}</td>
          <td onClick={this.highlight}>{this.props.course.lastUpdated}</td>
          <td onClick={this.keepHighlighted}>
            <a onClick={() => this.props.deleteCourse(this.props.course)}>
              <FontAwesomeIcon icon={faTrash} className="wbdv-small-nudge-right"/>
            </a>
            {
              this.state.editing &&
              <a onClick={this.updateCourse}>
                <FontAwesomeIcon icon={faCheck} className="wbdv-small-nudge-right"/>
              </a>
            }
            {
              !this.state.editing &&
              <a onClick={() => this.setState({editing: true})}>
                <FontAwesomeIcon icon={faPencilAlt} className="wbdv-small-nudge-right"/>
              </a>
            }
          </td>
        </tr>
        ||
            this.state.highlight === true &&
    <tr bgcolor="#1e90ff">
      <td onClick={this.highlight}>
        {
          this.state.editing === true &&
          <input onClick={this.keepHighlighted}
              onChange={this.updateTitle}
              value={this.state.course.title}/>
        }
        {
          this.state.editing === false &&
          <Link to={`/edit/${this.state.course._id}`} className="wbdv-white-text">
            <FontAwesomeIcon icon={faFileAlt} className="wbdv-small-nudge-right"/> {this.state.course.title}
          </Link>
        }
      </td>
      <td onClick={this.highlight} className="wbdv-white-text">{this.props.course.owner}</td>
      <td onClick={this.highlight} className="wbdv-white-text">{this.props.course.lastUpdated}</td>
      <td onClick={this.keepHighlighted} className="wbdv-white-text">
        <a onClick={() => this.props.deleteCourse(this.props.course)}>
          <FontAwesomeIcon icon={faTrash} className="wbdv-small-nudge-right"/>
        </a>
        {
          this.state.editing &&
          <a onClick={this.updateCourse}>
            <FontAwesomeIcon icon={faCheck} className="wbdv-small-nudge-right"/>
          </a>
        }
        {
          !this.state.editing &&
          <a onClick={() => this.setState({editing: true})}>
            <FontAwesomeIcon icon={faPencilAlt} className="wbdv-small-nudge-right"/>
          </a>
        }
      </td>
    </tr>


    ); // return
  }
}

export default CourseRowComponent