import React from "react";
import {connect} from "react-redux";
import widgetService from "../services/WidgetService"
import HeadingWidget from "./HeadingWidget";
import ParagraphWidget from "./ParagraphWidget";
const WidgetList = (
    {
      widgets = [],
        topicId,
        createWidgetForTopic
    }) =>
<div>
  <h3>Widgets</h3>
  <ul>
    {
      widgets.map(widget =>
      <li key ={widget.id}>
        {
          widget.type === "HEADING" &&
              <HeadingWidget widget={widget}/>
        }
        {
          widget.type === "PARAGRAPH" &&
          <ParagraphWidget widget={widget}/>
        }
      </li>)
    }
  </ul>
  <button onClick={() => createWidgetForTopic(topicId)}>
    Create
  </button>
</div>

const stateToPropMapper = (state) => ({
  widgets: state.widgetReducer.widgets,
  topicId: state.widgetReducer.topicId
})

const dispatchMapper = (dispatch) => ({
  createWidgetForTopic: (topicId) =>
    widgetService.createWidgetForTopic(topicId, {
      name: "New Widget",
      type: "PARAGRAPH"
    }).then(widget => dispatch({
      type: "CREATE_WIDGET_FOR_TOPIC",
      widget
    }))
})


export default connect(stateToPropMapper, dispatchMapper)(WidgetList)