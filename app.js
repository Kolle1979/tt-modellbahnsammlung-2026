const state = {
  models: []
};

const form = document.getElementById('modelForm');
const tableBody = document.getElementById('tableBody');
const searchInput = document.getElementById('searchInput');

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderTable() {
  const search = (searchInput.value || '').trim().toLowerCase();
  const rows = state.models.filter(model => {
    const text = [
      model.inventarNr,
      model.hersteller,
      model.artikelNr,
      model.bezeichnung,
      model.kategorie,
      model.epoche,
      model.standort
    ].join(' ').toLowerCase();
    return !search || text.includes(search);
  });

  if (!rows.length) {
    tableBody.innerHTML = '<tr><td colspan="7" class="empty">Noch keine passenden Demodaten vorhanden</td></tr>';
    return;
  }

  tableBody.innerHTML = rows.map(model => `
    <tr>
      <td>${escapeHtml(model.inventarNr)}</td>
      <td>${escapeHtml(model.hersteller)}</td>
      <td>${escapeHtml(model.artikelNr)}</td>
      <td>${escapeHtml(model.bezeichnung)}</td>
      <td>${escapeHtml(model.kategorie)}</td>
      <td>${escapeHtml(model.epoche)}</td>
      <td>${escapeHtml(model.standort)}</td>
    </tr>
  `).join('');
}

form.addEventListener('submit', event => {
  event.preventDefault();

  const model = {
    inventarNr: document.getElementById('inventarNr').value.trim(),
    hersteller: document.getElementById('hersteller').value.trim(),
    artikelNr: document.getElementById('artikelNr').value.trim(),
    bezeichnung: document.getElementById('bezeichnung').value.trim(),
    kategorie: document.getElementById('kategorie').value,
    epoche: document.getElementById('epoche').value.trim(),
    standort: document.getElementById('standort').value.trim()
  };

  state.models.unshift(model);
  form.reset();
  renderTable();
});

searchInput.addEventListener('input', renderTable);
renderTable();
