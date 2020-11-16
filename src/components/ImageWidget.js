import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp} from "@fortawesome/free-solid-svg-icons";

const ImageWidget = ({
  widget,
  updateParagraphPreview,
  updateHeadingPreview
}) =>
    <div>
      <h3>Image Widget
        <div className="float-right">
          <a className="btn btn-warning">
            <i className="fas fa-arrow-up wbdv-topic-pill"><FontAwesomeIcon icon={faArrowUp}/></i>
          </a>
          <a className="btn btn-warning">
            <i className="fas fa-arrow-down wbdv-topic-pill"><FontAwesomeIcon icon={faArrowDown}/></i>
          </a>
        </div>
      </h3>
      <input className="form-control" value={widget.text} onChange={e => updateParagraphPreview(widget, e.target.value)}>
      </input>
      <h5>Preview</h5>{
      <img src={widget.text}/>
    }

    </div>

export default ImageWidget