// BEGIN
export default function app(notebooks) {
  const form = document.querySelector('form')
  const resultDiv = document.querySelector('.result')
  if (!form || !resultDiv) return
  const render = () => {
    const formData = new FormData(form)
    const filters = {}
    for (const [key, value] of formData.entries()) {
      const trimmed = value.trim()
      if (trimmed !== '') filters[key] = trimmed
    }
    const filtered = notebooks.filter((notebook) => {
      if (filters.processor_eq && notebook.processor !== filters.processor_eq) {
        return false
      }
      if (filters.memory_eq && String(notebook.memory) !== filters.memory_eq) {
        return false
      }
      if (filters.frequency_gte && notebook.frequency < Number(filters.frequency_gte)) {
        return false
      }
      if (filters.frequency_lte && notebook.frequency > Number(filters.frequency_lte)) {
        return false
      }
      return true
    })
    resultDiv.innerHTML = ''
    if (filtered.length) {
      const ul = document.createElement('ul')
      filtered.forEach((notebook) => {
        const li = document.createElement('li')
        li.textContent = notebook.model
        ul.appendChild(li)
      })
      resultDiv.appendChild(ul)
    }
  }
  const fields = form.querySelectorAll('input, select')
  fields.forEach((field) => {
    const event = field.tagName === 'SELECT' ? 'change' : 'input'
    field.addEventListener(event, render)
  })
  render()
}
// END