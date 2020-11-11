import React from "react";

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