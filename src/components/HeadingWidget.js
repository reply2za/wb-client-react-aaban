import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp} from "@fortawesome/free-solid-svg-icons";

const HeadingWidget = ({
  widget,
  updateParagraphPreview,
  updateHeadingPreview
}) =>
    <div>
      <h3>Heading Widget
        <div className="float-right">
        <a className="btn btn-warning">
          <i className="fas fa-arrow-up wbdv-topic-pill"><FontAwesomeIcon icon={faArrowUp}/></i>
        </a>
        <a className="btn btn-warning">
          <i className="fas fa-arrow-down wbdv-topic-pill"><FontAwesomeIcon icon={faArrowDown}/></i>
        </a>
        </div>
      </h3>


      <input className="form-control" value={widget.headingText} onChange={e => updateHeadingPreview(widget, e.target.value)}>
      </input>
      <h4 className="wbdv-bottom-margin">Preview
        <span className="wbdv-left-margin">
        {
          widget.text == null &&
          <select value="Heading 3" onChange={e => updateParagraphPreview(widget, e.target.value)}>
            <option>Heading 1</option>
            <option>Heading 2</option>
            <option>Heading 3</option>
            <option>Heading 4</option>
          </select>
        }
        {
          widget.text !== null &&
          <select value={widget.text}
                  onChange={e => updateParagraphPreview(widget, e.target.value)}>
            <option>Heading 1</option>
            <option>Heading 2</option>
            <option>Heading 3</option>
            <option>Heading 4</option>
          </select>
        }
        </span>
        </h4>
      {
        widget.text === "Heading 1" &&
        <h1>{widget.headingText}</h1>
      }
      {
        widget.text === "Heading 2" &&
        <h2>{widget.headingText}</h2>
      }
      {
        widget.text === "Heading 3" &&
        <h3>{widget.headingText}</h3>
      }
      {
        widget.text === "Heading 4" &&
        <h4>{widget.headingText}</h4>
      }
      {
        widget.text === null &&
        <h3>{widget.headingText}</h3>
      }
    </div>

export default HeadingWidget