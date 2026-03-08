window.APP_CONFIG = window.APP_CONFIG || {
  supabaseUrl: '',
  supabaseAnonKey: ''
};

const state = {
  client: null,
  user: null,
  models: []
};

const form = document.getElementById('modelForm');
const tableBody = document.getElementById('tableBody');
const searchInput = document.getElementById('searchInput');
const statusText = document.getElementById('statusText');
const statusPanel = document.querySelector('.status-panel');
const userInfo = document.getElementById('userInfo');
const emailInput = document.getElementById('emailInput');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const resetBtn = document.getElementById('resetBtn');

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isConfigured() {
  const { supabaseUrl, supabaseAnonKey } = window.APP_CONFIG || {};
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('HIER_') &&
    !supabaseAnonKey.includes('HIER_')
  );
}

function setStatus(message, mode = 'warn') {
  statusText.textContent = message;
  statusPanel.classList.remove('ok', 'warn');
  statusPanel.classList.add(mode);
}

function getFormModel() {
  return {
    inventar_nr: document.getElementById('inventarNr').value.trim(),
    hersteller: document.getElementById('hersteller').value.trim(),
    artikel_nr: document.getElementById('artikelNr').value.trim(),
    bezeichnung: document.getElementById('bezeichnung').value.trim(),
    kategorie: document.getElementById('kategorie').value,
    epoche: document.getElementById('epoche').value.trim(),
    standort: document.getElementById('standort').value.trim()
  };
}

function fillForm(model) {
  document.getElementById('editingId').value = model.id || '';
  document.getElementById('inventarNr').value = model.inventar_nr || '';
  document.getElementById('hersteller').value = model.hersteller || '';
  document.getElementById('artikelNr').value = model.artikel_nr || '';
  document.getElementById('bezeichnung').value = model.bezeichnung || '';
  document.getElementById('kategorie').value = model.kategorie || 'Lokomotive';
  document.getElementById('epoche').value = model.epoche || '';
  document.getElementById('standort').value = model.standort || '';
}

function resetForm() {
  form.reset();
  document.getElementById('editingId').value = '';
  document.getElementById('kategorie').value = 'Lokomotive';
}

function renderTable() {
  const search = (searchInput.value || '').trim().toLowerCase();
  const rows = state.models.filter(model => {
    const text = [
      model.inventar_nr,
      model.hersteller,
      model.artikel_nr,
      model.bezeichnung,
      model.kategorie,
      model.epoche,
      model.standort
    ].join(' ').toLowerCase();
    return !search || text.includes(search);
  });

  if (!rows.length) {
    tableBody.innerHTML = '<tr><td colspan="8" class="empty">Keine Modelle gefunden</td></tr>';
    return;
  }

  tableBody.innerHTML = rows.map(model => `
    <tr>
      <td>${escapeHtml(model.inventar_nr)}</td>
      <td>${escapeHtml(model.hersteller)}</td>
      <td>${escapeHtml(model.artikel_nr)}</td>
      <td>${escapeHtml(model.bezeichnung)}</td>
      <td>${escapeHtml(model.kategorie)}</td>
      <td>${escapeHtml(model.epoche)}</td>
      <td>${escapeHtml(model.standort)}</td>
      <td>
        <button class="action-btn" data-action="edit" data-id="${escapeHtml(model.id)}">Bearbeiten</button>
        <button class="action-btn delete" data-action="delete" data-id="${escapeHtml(model.id)}">Löschen</button>
      </td>
    </tr>
  `).join('');
}

async function loadModels() {
  if (!state.client || !state.user) {
    state.models = [];
    renderTable();
    return;
  }

  const { data, error } = await state.client
    .from('models')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    setStatus(`Fehler beim Laden: ${error.message}`, 'warn');
    return;
  }

  state.models = data || [];
  renderTable();
}

async function saveModel() {
  if (!state.client || !state.user) {
    alert('Bitte zuerst Supabase konfigurieren und anmelden.');
    return;
  }

  const editingId = document.getElementById('editingId').value;
  const payload = {
    ...getFormModel(),
    user_id: state.user.id
  };

  if (!payload.inventar_nr || !payload.bezeichnung) {
    alert('Inventar-Nr und Bezeichnung sind Pflichtfelder.');
    return;
  }

  let result;
  if (editingId) {
    result = await state.client
      .from('models')
      .update(payload)
      .eq('id', editingId)
      .select()
      .single();
  } else {
    result = await state.client
      .from('models')
      .insert(payload)
      .select()
      .single();
  }

  if (result.error) {
    alert(`Speichern fehlgeschlagen: ${result.error.message}`);
    return;
  }

  resetForm();
  await loadModels();
}

async function deleteModel(id) {
  if (!state.client || !state.user) {
    return;
  }

  if (!confirm('Modell wirklich löschen?')) {
    return;
  }

  const { error } = await state.client
    .from('models')
    .delete()
    .eq('id', id);

  if (error) {
    alert(`Löschen fehlgeschlagen: ${error.message}`);
    return;
  }

  await loadModels();
}

function updateUserInfo() {
  userInfo.textContent = state.user ? `Angemeldet als ${state.user.email}` : 'Nicht angemeldet';
}

async function sendMagicLink() {
  if (!state.client) {
    alert('Supabase ist noch nicht konfiguriert.');
    return;
  }

  const email = emailInput.value.trim();
  if (!email) {
    alert('Bitte E-Mail-Adresse eingeben.');
    return;
  }

  const { error } = await state.client.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: window.location.href
    }
  });

  if (error) {
    alert(`Anmeldung fehlgeschlagen: ${error.message}`);
    return;
  }

  alert('Magic Link wurde versendet. Bitte E-Mail prüfen.');
}

async function logout() {
  if (!state.client) return;
  await state.client.auth.signOut();
}

async function initSupabase() {
  if (!isConfigured()) {
    setStatus('Sicherer Platzhaltermodus: Bitte zuerst config.public.js mit Supabase-URL und öffentlichem Anon Key befüllen.', 'warn');
    renderTable();
    return;
  }

  state.client = window.supabase.createClient(
    window.APP_CONFIG.supabaseUrl,
    window.APP_CONFIG.supabaseAnonKey
  );

  const { data, error } = await state.client.auth.getSession();
  if (error) {
    setStatus(`Supabase-Fehler: ${error.message}`, 'warn');
    return;
  }

  state.user = data.session?.user || null;
  updateUserInfo();

  if (state.user) {
    setStatus('Supabase verbunden. Deine Modelle werden benutzerbezogen geladen.', 'ok');
    await loadModels();
  } else {
    setStatus('Supabase verbunden. Bitte per Magic Link anmelden, damit deine privaten Daten geladen werden.', 'ok');
    renderTable();
  }

  state.client.auth.onAuthStateChange(async (_event, session) => {
    state.user = session?.user || null;
    updateUserInfo();
    if (state.user) {
      setStatus('Angemeldet. Daten werden sicher pro Benutzer geladen.', 'ok');
      await loadModels();
    } else {
      state.models = [];
      renderTable();
      setStatus('Abgemeldet. Keine privaten Daten geladen.', 'warn');
    }
  });
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  await saveModel();
});

resetBtn.addEventListener('click', resetForm);
searchInput.addEventListener('input', renderTable);
loginBtn.addEventListener('click', sendMagicLink);
logoutBtn.addEventListener('click', logout);

tableBody.addEventListener('click', async event => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;

  const { action, id } = button.dataset;
  const model = state.models.find(entry => entry.id === id);

  if (action === 'edit' && model) {
    fillForm(model);
  }

  if (action === 'delete' && id) {
    await deleteModel(id);
  }
});

updateUserInfo();
renderTable();
initSupabase();
