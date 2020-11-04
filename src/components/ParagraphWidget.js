import React from "react";
import {Button} from "react-bootstrap";
import widgetService from "../services/WidgetService";
import {connect} from "react-redux";

const ParagraphWidget = ({
      widget,
    updateParagraphPreview
}) =>
    <div>
      <h3>Paragraph Widget</h3>
      <div>
      <textarea className="form-control" onChange={e => updateParagraphPreview(widget, e.target.value)}>
        {widget.text}
      </textarea>
        <h4>Preview</h4>
        <p>{widget.text}</p>
      </div>

    </div>



export default ParagraphWidget