const btnMode = document.getElementById("mode")
const icon = document.getElementById("icon")
const resultBox = document.getElementById("result")
const body = document.querySelector("body")

const numbersButtons = document.querySelectorAll("[data-number]")
const operatorButtons = document.querySelectorAll("[data-operator]")
const equalsButton = document.querySelector("[data-equals]")
const clearButton = document.querySelector("[data-clear]")
const deleteButton = document.querySelector("[data-delete]")
const dotButton = document.querySelector("[data-separator]")

let currentInput = ""
let previousInput = ""
let operator = null

btnMode.addEventListener("click", (e) => {
  e.preventDefault()
  body.classList.toggle("dark")
  const isDark = body.classList.contains("dark")

  if (isDark) {
    icon.classList.add("ph-sun")
    icon.classList.remove("ph-moon")
  } else {
    icon.classList.remove("ph-sun")
    icon.classList.add("ph-moon")
  }

})

function init() {
  resultBox.textContent = 0
}

init()

function updateDisplay(value) {
  resultBox.textContent = value || 0
}

// Numbers buttons
numbersButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.add("active")
    currentInput += btn.dataset.number
    updateDisplay(currentInput)

    setTimeout(() => btn.classList.remove("active"), 100)
  })
}) 

// Dot button
dotButton.addEventListener("click", () => {
  dotButton.classList.add("active")
  if (!currentInput.includes(".")) {
    currentInput += currentInput === "" ? "0." : "."
    updateDisplay(currentInput)
  }
  setTimeout(() => dotButton.classList.remove("active"), 100)
})

// Operator buttons
operatorButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.add("active")
    if (currentInput === "") return
    if (previousInput !== "") {
      calculate()
    }
    
    operator = btn.dataset.operator
    previousInput = currentInput
    currentInput = ""

    setTimeout(() => btn.classList.remove("active"), 100)
  })
})

// Equals button
equalsButton.addEventListener("click", () => {
  equalsButton.classList.add("active")
  if (currentInput === "" || previousInput === "" || operator === null) return
  calculate()
  setTimeout(() => equalsButton.classList.remove("active"), 100)
})

// Reset Button
clearButton.addEventListener("click", () => {
  clearButton.classList.add("active")
  currentInput = ""
  previousInput = ""
  operator = null
  updateDisplay("0")
  setTimeout(() => clearButton.classList.remove("active"), 100)
})

// Delete button
deleteButton.addEventListener("click", () => {
  deleteButton.classList.add("active")
  currentInput = currentInput.slice(0, -1)
  updateDisplay(currentInput)
  setTimeout(() => deleteButton.classList.remove("active"), 100)
})


// Calculate function
function calculate() {
  const a = parseFloat(previousInput)
  const b = parseFloat(currentInput)
  let resultCalculate = 0

  switch (operator) {
    case "+":
      resultCalculate = a + b
      break
    case "-":
      resultCalculate = a - b
      break
    case "*":
      resultCalculate = a * b
      break 
    case "/":
      resultCalculate = b === 0 ? "Erro" : a / b
      break
    default:
      return
  }

  currentInput = resultCalculate.toString()
  operator = null
  previousInput = ""
  updateDisplay(currentInput)
}