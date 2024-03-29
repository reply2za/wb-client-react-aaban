import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp} from "@fortawesome/free-solid-svg-icons";


const handleKeyPress = (event, {
  widget,
  updateParagraphPreview
}) => {
  //console.log("debugging",`test: ${event.target.value}`)
  let lines = event.target.value.split("\n")
  //console.log("debug", lines)
  let text = "";
  for(var i = 0;i < lines.length;i++){
    if (event.key === "Backspace") {
      text += `${lines[i]} `
    }
    else if (i ===lines.length-1){
      text += `${lines[i]}`
    }
    else {
      text += `${lines[i]}&list00`
    }
  }

  //console.log(text)
  updateParagraphPreview(widget, text)

  // if(event.key === 'Enter'){
  //   //alert("enter pressed")
  //   updateParagraphPreview(widget, `${event.target.value} \n`)
  // } else {
  //   updateParagraphPreview(widget, event.target.value)
  // }
}

const createList = (widget, type) => {
  if (widget.text !== null) {
    //console.log("widgetText", widget.text)
    let lines = widget.text.split("&list00")
    //var num = lines.length
    //console.log(num)
    if (type === "o"){
      return <ol>
        {lines.map(item => <li>{item}</li>)}
      </ol>
    } else {
      return <ul>
        {lines.map(item => <li>{item}</li>)}
      </ul>
    }

  }
}

const getText = (widget) => {
  if (widget.text !== null) {
    var lines = widget.text.split("&list00")
    var num = lines.length
    var i = 0;
    var text = "";
    for (i = 0; i < num; i++) {
      if (i === num-1) {
        text += `${lines[i]}`;
      } else {
        text += `${lines[i]}\n`;
      }

    }
  }
    return text
  }




const ListWidget = ({
  widget,
  updateParagraphPreview,
  updateHeadingPreview
}) =>
  <div>
    <h3>List Widget
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
      <textarea className="form-control wbdv-bottom-margin-10" onChange={e => handleKeyPress(e, {widget, updateParagraphPreview})}>
          {getText(widget)}
      </textarea>

      <h4>Preview
        <select className="wbdv-left-margin" value={widget.headingText} onChange={e => updateHeadingPreview(widget, e.target.value)}>
          <option>Ordered list</option>
          <option>Unordered list</option>
        </select>
      </h4>
      {
        (widget.headingText === null || widget.headingText === "Ordered list") &&
        createList(widget, "o")
      }
      {
        widget.headingText === "Unordered list" &&
        createList(widget, "u")
      }
      {/*<p>Debugging: {widget.text}</p>*/}
    </div>

  </div>


  export default ListWidget
