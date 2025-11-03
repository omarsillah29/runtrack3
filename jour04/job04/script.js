document.getElementById("update").addEventListener("click", () => {
  fetch("users.php")
    .then(response => response.json())
    .then(text => {
      console.log('test passed');
      // Pour debug : afficher la réponse brute dans la console
      console.debug('Réponse brute de users.php:', text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        // JSON invalide — afficher le texte brut dans le tableau pour aider
        console.error('Impossible de parser le JSON reçu :', e);
        const tbody = document.querySelector("#userTable tbody");
        if (tbody) {
          tbody.innerHTML = `<tr><td colspan="3">Réponse non JSON reçue du serveur — voir console pour le contenu.</td></tr>`;
        }
        // afficher aussi le contenu exact pour diagnostic
        console.log('Contenu reçu de users.php:\n' + text);
        return;
      }

      // si parse OK, continuer avec l'objet data
      const tbody = document.querySelector("#userTable tbody");
      tbody.innerHTML = ""; // vide le tableau

      // Si le serveur renvoie une erreur structurée (ex: { error: true, message: '...' })
      if (!Array.isArray(data)) {
        const msg = (data && data.message) ? data.message : 'Réponse inattendue du serveur';
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="3">${msg}</td>`;
        tbody.appendChild(row);
        console.error('Réponse non attendue:', data);
        return;
      }

      if (data.length === 0) {
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="3">Aucun utilisateur trouvé.</td>`;
        tbody.appendChild(row);
        return;
      }

      data.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${user.nom || ''}</td>
          <td>${user.prenom || ''}</td>
          <td>${user.email || ''}</td>
        `;
        tbody.appendChild(row);
      });
  })
    .catch(error => {
      console.error("Erreur :", error);
      const tbody = document.querySelector("#userTable tbody");
      if (tbody) {
        tbody.innerHTML = `<tr><td colspan="3">Erreur réseau ou serveur : ${error.message || error}</td></tr>`;
      }
    });
});
