// Fetch pokemon.json, populate type select and filter results on button click

let allPokemons = [];

function createCard(p) {
  const types = p.type.join(', ');
  return `
    <article class="pokemon">
      <h3>#${p.id} - ${p.name.french} (${p.name.english})</h3>
      <p><strong>Type :</strong> ${types}</p>
      <p><strong>Base HP :</strong> ${p.base.HP} — <strong>Speed :</strong> ${p.base.Speed}</p>
    </article>
  `;
}

function renderResults(list) {
  const container = document.getElementById('results');
  if (!container) return;
  if (!list.length) {
    container.innerHTML = '<p>Aucun résultat.</p>';
    return;
  }
  container.innerHTML = list.map(createCard).join('\n');
}

function buildTypeOptions(data) {
  const set = new Set();
  data.forEach(p => p.type.forEach(t => set.add(t)));
  const select = document.getElementById('typeSelect');
  if (!select) return;
  Array.from(set).sort().forEach(t => {
    const opt = document.createElement('option');
    opt.value = t;
    opt.textContent = t;
    select.appendChild(opt);
  });
}

function applyFilters() {
  const idVal = document.getElementById('idInput').value.trim();
  const nameVal = document.getElementById('nameInput').value.trim().toLowerCase();
  const typeVal = document.getElementById('typeSelect').value;

  let filtered = allPokemons.slice();

  if (idVal) {
    // allow partial or exact numeric match; prefer exact if numeric
    const asNum = Number(idVal);
    if (!Number.isNaN(asNum)) {
      filtered = filtered.filter(p => p.id === asNum);
    } else {
      filtered = filtered.filter(p => String(p.id).includes(idVal));
    }
  }

  if (nameVal) {
    filtered = filtered.filter(p => {
      const french = (p.name && p.name.french || '').toLowerCase();
      const english = (p.name && p.name.english || '').toLowerCase();
      return french.includes(nameVal) || english.includes(nameVal);
    });
  }

  if (typeVal) {
    filtered = filtered.filter(p => p.type.includes(typeVal));
  }

  renderResults(filtered);
}

// Load data and wire UI
document.addEventListener('DOMContentLoaded', () => {
  const filterBtn = document.getElementById('filterButton');
  const results = document.getElementById('results');

  // show loading indicator
  if (results) results.innerHTML = '<p>Chargement des données…</p>';

  fetch('pokemon.json')
    .then(resp => {
      if (!resp.ok) throw new Error('Erreur de chargement: ' + resp.status);
      return resp.json();
    })
    .then(data => {
      allPokemons = data;
      buildTypeOptions(allPokemons);
      // render all by default
      renderResults(allPokemons.slice(0, 50)); // show first 50 to avoid huge page
    })
    .catch(err => {
      if (results) results.innerHTML = `<p>Erreur: ${err.message}</p>`;
      console.error(err);
    });

  if (filterBtn) {
    filterBtn.addEventListener('click', applyFilters);
  }
});
