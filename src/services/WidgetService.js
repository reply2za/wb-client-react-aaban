const topicsUrl = "https://cs4550-f20-server-java-aaban.herokuapp.com/api/topics"

export const findWidgetsForTopic = (topicId) =>
  fetch(`${topicsUrl}/${topicId}/widgets`)
  .then(response => response.json())


export const createWidgetForTopic = (topicId, widget) =>
    fetch(`${topicsUrl}/${topicId}/widgets`,
        {
          method: "POST",
          body: JSON.stringify({
            ...widget,
            topicId
          }),
          headers: {
            "content-type" : "application/json"
          }
        })
.then(response => response.json())

export const saveWidgetForTopic = (topicId, widget) =>
    fetch(`${topicsUrl}/${topicId}/widgets/${widget.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            ...widget,
            topicId
          }),
          headers: {
            "content-type" : "application/json"
          }
        })
.then(response => response.json())

export const deleteWidget = (topicId, widget) =>
    fetch(`${topicsUrl}/${topicId}/widgets/${widget.id}`, {
      method: "DELETE"
    })
    .then(response => response.json())

export default {
  findWidgetsForTopic, createWidgetForTopic, deleteWidget, saveWidgetForTopic
}

