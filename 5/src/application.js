import uniqueId from 'lodash/uniqueId.js';

// BEGIN
export default () => {
  let lists = ['General']
  let tasks = { General: [] }
  let currentList = 'General'
  const listsContainer = document.querySelector('[data-container="lists"]')
  const tasksContainer = document.querySelector('[data-container="tasks"]')
  const newListForm = document.querySelector('[data-container="new-list-form"]')
  const newTaskForm = document.querySelector('[data-container="new-task-form"]')
  const newListInput = document.querySelector('#new-list-name')
  const newTaskInput = document.querySelector('#new-task-name')
  if (!listsContainer || !tasksContainer || !newListForm || !newTaskForm) return
  const normalizeName = (name) => name.trim().toLowerCase()
  const isListExists = (name) => lists.some(list => normalizeName(list) === normalizeName(name))
  const renderLists = () => {
    const ul = document.createElement('ul')
    lists.forEach(listName => {
      const li = document.createElement('li')
      if (listName === currentList) {
        const bold = document.createElement('b')
        bold.textContent = listName
        li.appendChild(bold)
      } else {
        const link = document.createElement('a')
        link.textContent = listName
        link.href = `#${listName.toLowerCase()}`
        link.addEventListener('click', (e) => {
          e.preventDefault()
          currentList = listName
          renderLists()
          renderTasks()
        })
        li.appendChild(link)
      }
      ul.appendChild(li)
    })
    listsContainer.innerHTML = ''
    listsContainer.appendChild(ul)
  }
  const renderTasks = () => {
    const currentTasks = tasks[currentList] || []
    if (currentTasks.length === 0) {
      tasksContainer.innerHTML = ''
      return
    }
    const ul = document.createElement('ul')
    currentTasks.forEach(taskName => {
      const li = document.createElement('li')
      li.textContent = taskName
      ul.appendChild(li)
    })
    tasksContainer.innerHTML = ''
    tasksContainer.appendChild(ul)
  }
  newListForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const newName = newListInput.value.trim()
    if (newName && !isListExists(newName)) {
      lists.push(newName)
      tasks[newName] = []
      newListInput.value = ''
      renderLists()
    }
  })
  newTaskForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const taskName = newTaskInput.value.trim()
    if (taskName) {
      tasks[currentList].push(taskName)
      newTaskInput.value = ''
      renderTasks()
    }
  })
  renderLists()
  renderTasks()
}
// END