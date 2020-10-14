const url = "https://wbdv-generic-server.herokuapp.com/api/aaban/modules"

export const findModule = moduleId =>
    fetch(`${url}/${moduleId}`)
    .then(response => response.json())

export const findAllModules = () =>
    fetch(url)
    .then(response => response.json())

export const deleteModule = (moduleId) =>
    fetch(`${url}/${moduleId}`, {
      method: 'DELETE'
    })
    .then(response => response.json())

export const createModule = (module) =>
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(module),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => response.json())

export const updateModule = (moduleId, newModule) =>
    fetch(`${url}/${moduleId}`, {
      method: 'PUT',
      body: JSON.stringify(newModule),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => response.json())

export default {
  findAllModules, deleteModule, createModule, findModule
}