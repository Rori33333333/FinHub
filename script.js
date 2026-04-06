// Simple quiz option selection
function selectAnswer(button) {
  // remove selected class from siblings
  let siblings = button.parentElement.querySelectorAll("button");
  siblings.forEach((btn) => btn.classList.remove("selected"));

  // highlight selected
  button.classList.add("selected");
}

function toggleMode() {
  const slider = document.getElementById("slider");

  if (slider.classList.contains("vertical")) {
    slider.classList.remove("vertical");
    slider.classList.add("horizontal");
  } else {
    slider.classList.remove("horizontal");
    slider.classList.add("vertical");
  }
}
