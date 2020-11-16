import React from "react";
import {connect} from "react-redux";
import widgetService from "../services/WidgetService"
import HeadingWidget from "./HeadingWidget";
import ParagraphWidget from "./ParagraphWidget";
import ImageWidget from "./ImageWidget";
import {Button} from "react-bootstrap";
import ListWidget from "./ListWidget";
const WidgetList = (
    {
      widgets = [],
        topicId,
        createWidgetForTopic,
        updateParagraphPreview,
        deleteWidgetForTopic,
        saveWidgetForTopicDispatch,
        updateHeadingPreview
    }) =>
<div>
  <h3>Widgets
    <Button className="btn btn-primary float-right" onClick={() => createWidgetForTopic(topicId, document.getElementById("newWidgetSelected").value)}>
      Add Widget
    </Button>
  <select id="newWidgetSelected" className="float-right">
    <option value="PARAGRAPH">Paragraph</option>
    <option value="HEADING">Heading</option>
    <option value="IMAGE">Image</option>
    <option value="LIST">List</option>
  </select>
    </h3>
  <ul>
    {
      topicId !== null && widgets !== null &&
      widgets.map(widget =>
      <div key ={widget.id}>
        {
          widget.type === "HEADING" &&
              <div className="wbdv-add-border wbdv-highlight-background-dark-selected">
              <HeadingWidget updateHeadingPreview= {updateHeadingPreview} updateParagraphPreview= {updateParagraphPreview} widget={widget}/>
              <br/>
              <Button className="btn btn-danger" onClick={() => deleteWidgetForTopic(topicId, widget)}>
                Delete
              </Button>
                <Button className="btn btn-success" onClick={() => saveWidgetForTopicDispatch(topicId, widget)}>
                  Save
                </Button>
              </div>
        }
        {
          widget.type === "PARAGRAPH" &&
              <div className="wbdv-add-border wbdv-highlight-background-dark-selected">
          <ParagraphWidget updateParagraphPreview= {updateParagraphPreview} widget={widget}/>
                <div>
                  <br/>
                <Button className="btn btn-danger" onClick={() => deleteWidgetForTopic(topicId, widget)}>
                  Delete
                </Button>
                  <Button className="btn btn-success" onClick={() => saveWidgetForTopicDispatch(topicId, widget)}>
                  Save
                </Button>
                </div>
              </div>

        }
        {
          widget.type === "IMAGE" &&
              <div className="wbdv-add-border wbdv-highlight-background-dark-selected">
          <ImageWidget updateHeadingPreview= {updateHeadingPreview} updateParagraphPreview= {updateParagraphPreview} widget={widget}/>
                <div>
                  <br/>
                <Button className="btn btn-danger" onClick={() => deleteWidgetForTopic(topicId, widget)}>
                  Delete
                </Button>
                  <Button className="btn btn-success" onClick={() => saveWidgetForTopicDispatch(topicId, widget)}>
                  Save
                </Button>
                </div>
              </div>

        }
        {
          widget.type === "LIST" &&
              <div className="wbdv-add-border wbdv-highlight-background-dark-selected">
          <ListWidget updateHeadingPreview= {updateHeadingPreview} updateParagraphPreview= {updateParagraphPreview} widget={widget}/>
                <div>
                  <br/>
                <Button className="btn btn-danger" onClick={() => deleteWidgetForTopic(topicId, widget)}>
                  Delete
                </Button>
                  <Button className="btn btn-success" onClick={() => saveWidgetForTopicDispatch(topicId, widget)}>
                  Save
                </Button>
                </div>
              </div>

        }
      </div>)
    }
  </ul>


</div>

const stateToPropMapper = (state) => ({
  widgets: state.widgetReducer.widgets,
  topicId: state.widgetReducer.topicId
})

const dispatchMapper = (dispatch) => ({
  createWidgetForTopic: (topicId, type) =>
    widgetService.createWidgetForTopic(topicId, {
      name: "New Widget",
      type: type
    }).then(widget => dispatch({
      type: "CREATE_WIDGET_FOR_TOPIC",
      widget
    })),
  deleteWidgetForTopic: (topicId, widget) =>
    widgetService.deleteWidget(topicId, widget)
    .then(widget => dispatch({
      type: "DELETE_WIDGET_FOR_TOPIC",
      widget
    })),
  saveWidgetForTopicDispatch: (topicId, widget) =>
    widgetService.saveWidgetForTopic(topicId, widget)
    .then(widget => dispatch({
      type: "SAVE_WIDGET_FOR_TOPIC",
      widget
    })),
  updateParagraphPreview: (widget, e) => {
    dispatch({
      type: "UPDATE_PARAGRAPH_PREVIEW",
      widget,
      e
    })
  },
  updateHeadingPreview: (widget, e) => {
    dispatch({
      type: "UPDATE_HEADING_PREVIEW",
      widget,
      e
    })
  }

})


export default connect(stateToPropMapper, dispatchMapper)(WidgetList)