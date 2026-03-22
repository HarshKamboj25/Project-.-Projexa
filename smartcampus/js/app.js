/* APP.JS — Main controller
            or  
   Navigation, clock, live tickers, boot */

/* ── PANEL TITLES ── */
const PANEL_TITLES = {
  dashboard:  'Dashboard',
  energy:     'Energy Analytics',
  rooms:      'Room Management',
  booking:    'Smart Booking',
  aiinsights: 'AI Insights',
  alerts:     'Alerts & Notifications',
  reports:    'Reports',
  settings:   'Settings',
};

/* ── SWITCH PANEL ── */
function switchPanel(id) {
  // Hide all
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  // Show target
  const panel = document.getElementById('panel-' + id);
  if (panel) panel.classList.add('active');

  const navEl = document.querySelector('[data-panel="' + id + '"]');
  if (navEl) navEl.classList.add('active');

  document.getElementById('page-title').textContent = PANEL_TITLES[id] || id;

  // Init panel content after one frame
  requestAnimationFrame(() => setTimeout(() => initPanelContent(id), 20));
}

/* ── INIT PANEL CONTENT ── */
function initPanelContent(id) {
  switch (id) {
    case 'dashboard':
      initDashCharts();
      break;
    case 'energy':
      initEnergyCharts();
      break;
    case 'rooms':
      initRoomsPanel();
      break;
    case 'booking':
      initBookingPanel();
      break;
    case 'aiinsights':
      initAICharts();
      break;
    case 'alerts':
      renderAlerts();
      break;
    case 'reports':
      initReportCharts();
      break;
  }
}

/* ── WIRE NAV CLICKS ── */
document.querySelectorAll('.nav-item[data-panel]').forEach(el => {
  el.addEventListener('click', () => switchPanel(el.dataset.panel));
});

/* ── CLOCK ── */
function updateClock() {
  const el = document.getElementById('clock');
  if (el) el.textContent = new Date().toLocaleTimeString('en-IN', { hour12: false });
}
setInterval(updateClock, 1000);
updateClock();

/* ── LIVE ENERGY TICKER ── */
setInterval(() => {
  const el = document.getElementById('live-energy');
  if (!el) return;
  const val = 284 + Math.round((Math.random() - 0.5) * 18);
  el.innerHTML = val + ' <span class="stat-unit">kWh</span>';
}, 3500);

/* ── REFRESH DASHBOARD ── */
function refreshDashboard() {
  const chart = CHARTS['chart-dash-energy'];
  if (!chart) return;
  chart.data.datasets[0].data = DATA.energy.map(v => v + Math.round((Math.random() - 0.5) * 12));
  chart.update('active');
  showToast('↻ Dashboard data refreshed');
}

/* ── TOAST ── */
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ── BOOT ── */
window.addEventListener('load', () => {
  // Set today's date in modal
  const dateInput = document.getElementById('modal-date');
  if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

  // Init dashboard (first panel shown)
  initPanelContent('dashboard');

  // Pre-render alerts so badge is correct
  renderAlerts();
});
