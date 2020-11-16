import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp} from "@fortawesome/free-solid-svg-icons";

const ParagraphWidget = ({
      widget,
    updateParagraphPreview
}) =>
    <div>
      <h3>Paragraph Widget
        <div className="float-right">
          <a className="btn btn-warning">
            <i className="fas fa-arrow-up wbdv-topic-pill"><FontAwesomeIcon icon={faArrowUp}/></i>
          </a>
          <a className="btn btn-warning">
            <i className="fas fa-arrow-down wbdv-topic-pill"><FontAwesomeIcon icon={faArrowDown}/></i>
          </a>
        </div>
      </h3>
      <div>
      <textarea className="form-control" onChange={e => updateParagraphPreview(widget, e.target.value)}>
        {widget.text}
      </textarea>
        <h4>Preview</h4>
        <p>{widget.text}</p>
      </div>

    </div>



export default ParagraphWidget