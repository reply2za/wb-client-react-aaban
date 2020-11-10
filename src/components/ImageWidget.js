import React from "react";

const ImageWidget = ({
  widget,
  updateParagraphPreview,
  updateHeadingPreview
}) =>
    <div>
      <h3>Image Widget</h3>
      <input className="form-control" value={widget.text} onChange={e => updateParagraphPreview(widget, e.target.value)}>
      </input>
      <h5>Preview</h5>{
      <img src={widget.text}/>
    }

    </div>

export default ImageWidget