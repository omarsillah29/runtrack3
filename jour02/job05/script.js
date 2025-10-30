window.addEventListener("scroll", () => {
  const footer = document.getElementById("footer");
  const scrollTop = window.scrollY;
  const scrollHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = scrollTop / scrollHeight;

  // Exemple : couleur du footer du noir au rouge
  const red = Math.round(scrollPercent * 255);
  footer.style.backgroundColor = `rgb(${red}, 0, 0)`;
});
