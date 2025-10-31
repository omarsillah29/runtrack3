const konamiCode = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a"
];

let input = [];

document.addEventListener("keydown", (event) => {
  input.push(event.key);
  if (input.length > konamiCode.length) {
    input.shift(); // garde la taille fixe
  }

  if (input.join("") === konamiCode.join("")) {
    document.body.classList.add("konami-active");
  }
});
