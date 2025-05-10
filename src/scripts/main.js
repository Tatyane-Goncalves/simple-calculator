const btnMode = document.getElementById("mode")
const icon = document.getElementById("icon")
const body = document.querySelector("body")

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