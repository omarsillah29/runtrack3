document.getElementById("button").addEventListener("click", () => {
  fetch("expression.txt")
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur de chargement du fichier");
      }
      return response.text();
    })
    .then(text => {
      const p = document.createElement("p");
      p.textContent = text;
      document.body.appendChild(p);
    })
    .catch(error => {
      console.error("Erreur :", error);
    });
});
