// BEGIN
export default function makeCollapseButton(companies) {
  let container = document.querySelector('.container.m-3')
  if (!container) {
    container = document.createElement('div')
    container.className = 'container m-3'
    document.body.appendChild(container)
  }
  let currentDescriptionDiv = null
  companies.forEach((company) => {
    const button = document.createElement('button')
    button.className = 'btn btn-primary'
    button.textContent = company.name
    button.addEventListener('click', () => {
      if (currentDescriptionDiv && currentDescriptionDiv.dataset.company === company.name) {
        currentDescriptionDiv.remove()
        currentDescriptionDiv = null
      } else {
        if (currentDescriptionDiv) {
          currentDescriptionDiv.remove()
        }
        const descDiv = document.createElement('div')
        descDiv.textContent = company.description
        descDiv.dataset.company = company.name
        container.appendChild(descDiv)
        currentDescriptionDiv = descDiv
      }
    })
    container.appendChild(button)
  })
}
// END