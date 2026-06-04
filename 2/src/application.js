import axios from 'axios';

const routes = {
  tasksPath: () => '/api/tasks',
};

// BEGIN
export default async function pushBack() {
  const form = document.querySelector('form')
  const input = form.querySelector('input[name="name"]')
  const tasksList = document.getElementById('tasks')
  const addTaskToTop = (taskName) => {
    const li = document.createElement('li')
    li.className = 'list-group-item'
    li.textContent = taskName
    tasksList.prepend(li)
  }
  const renderTasks = (tasks) => {
    tasksList.innerHTML = ''
    tasks.forEach((task) => {
      const li = document.createElement('li')
      li.className = 'list-group-item'
      li.textContent = task.name
      tasksList.append(li)
    })
  }
  const loadTasks = async () => {
    try {
      const response = await axios.get(routes.tasksPath())
      let tasks = []
      if (Array.isArray(response.data)) {
        tasks = response.data
      } else if (response.data?.items && Array.isArray(response.data.items)) {
        tasks = response.data.items
      }
      if (tasks.length > 0) {
        renderTasks(tasks)
      } else {
        tasksList.innerHTML = ''
      }
    } catch (error) {
      console.error('Ошибка загрузки задач', error)
    }
    input.focus()
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    const taskName = input.value.trim()
    if (taskName === '') {
      input.focus()
      return
    }
    try {
      const response = await axios.post(routes.tasksPath(), { name: taskName })
      if (response.status === 201) {
        addTaskToTop(taskName)
        form.reset()
        input.focus()
      }
    } catch (error) {
      console.error('Ошибка добавления задачи', error)
    }
  }
  form.addEventListener('submit', handleSubmit)
  await loadTasks()
}
// END