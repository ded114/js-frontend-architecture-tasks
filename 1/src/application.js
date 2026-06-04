// BEGIN
export default function calculator() {
  const form = document.forms.calculator
  const input = form.elements.number
  const resultDiv = document.getElementById('result')
  let sum = 0
  const updateSum = () => {
    resultDiv.textContent = sum
  }
  const resetAndFocus = () => {
    form.reset()    
    input.focus()
  }
  const handleAdd = (event) => {
    event.preventDefault()
    const rawValue = input.value
    const number = parseInt(rawValue, 10)
    if ((number)) {
      sum += number
      updateSum()
    }
    resetAndFocus()
  }
  const handleReset = () => {
    sum = 0
    updateSum()
    resetAndFocus()
  }
  form.addEventListener('submit', handleAdd)
  const resetBtn = form.querySelector('button[type="button"]')
  resetBtn.addEventListener('click', handleReset)
  input.focus()
}
// END