/* =============================================
   CHARTS.JS — All Chart.js chart definitions */

const CHARTS = {};

const C = {
  cyan:   '#00d4ff',
  purple: '#7c3aed',
  green:  '#10b981',
  red:    '#ef4444',
  amber:  '#f59e0b',
  muted:  'rgba(148,163,184,0.5)',
};

function gridCfg() {
  return { color: 'rgba(255,255,255,0.045)', borderColor: 'rgba(255,255,255,0.045)' };
}

function tooltipCfg() {
  return {
    backgroundColor: 'rgba(13,21,37,0.95)',
    borderColor: 'rgba(0,212,255,0.25)',
    borderWidth: 1,
    titleFont:  { family: 'JetBrains Mono', size: 10 },
    bodyFont:   { family: 'Syne', size: 11 },
    padding: 10,
  };
}

function axisXY() {
  return {
    x: { grid: gridCfg(), ticks: { color: C.muted, font: { family: 'JetBrains Mono', size: 8 } } },
    y: { grid: gridCfg(), ticks: { color: C.muted, font: { family: 'JetBrains Mono', size: 8 } } },
  };
}

function makeChart(id, config) {
  const canvas = document.getElementById(id);
  if (!canvas) { console.warn('Canvas not found:', id); return null; }
  if (CHARTS[id]) { CHARTS[id].destroy(); delete CHARTS[id]; }
  CHARTS[id] = new Chart(canvas, config);
  return CHARTS[id];
}

/* ── DASHBOARD ── */
function initDashCharts() {
  makeChart('chart-dash-energy', {
    type: 'line',
    data: {
      labels: DATA.hours,
      datasets: [{
        data: DATA.energy,
        borderColor: C.cyan, borderWidth: 2,
        fill: true, backgroundColor: 'rgba(0,212,255,0.06)',
        tension: 0.4, pointRadius: 0, pointHoverRadius: 5,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: tooltipCfg() },
      scales: axisXY(),
    },
  });

  makeChart('chart-dash-rooms', {
    type: 'doughnut',
    data: {
      labels: ['Occupied','Available','Underused','Maintenance'],
      datasets: [{
        data: [34, 11, 5, 2],
        backgroundColor: [
          'rgba(239,68,68,0.82)',
          'rgba(16,185,129,0.82)',
          'rgba(245,158,11,0.82)',
          'rgba(75,96,128,0.55)',
        ],
        borderColor: 'transparent',
        hoverOffset: 5,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout: '68%',
      plugins: { legend: { display: false }, tooltip: tooltipCfg() },
    },
  });

  makeChart('chart-dash-weekly', {
    type: 'bar',
    data: {
      labels: DATA.days,
      datasets: [{
        data: DATA.weekly,
        backgroundColor: DATA.weekly.map((_, i) => i === 3 ? C.cyan : 'rgba(0,212,255,0.2)'),
        borderRadius: 5,
        borderSkipped: false,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: tooltipCfg() },
      scales: axisXY(),
    },
  });
}

/* ── ENERGY PANEL ── */
function initEnergyCharts() {
  makeChart('chart-en-hour', {
    type: 'line',
    data: {
      labels: DATA.hours,
      datasets: [
        { label: 'Actual',    data: DATA.energy,    borderColor: C.cyan,   borderWidth: 2, fill: true, backgroundColor: 'rgba(0,212,255,0.06)', tension: 0.4, pointRadius: 0 },
        { label: 'Predicted', data: DATA.energy.map(v => +(v * 1.08 + Math.random() * 5 - 2).toFixed(1)), borderColor: C.purple, borderWidth: 2, borderDash: [5, 4], fill: false, tension: 0.4, pointRadius: 0 },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: true, labels: { color: C.muted, font: { family:'Syne',size:9 }, boxWidth: 10 } }, tooltip: tooltipCfg() },
      scales: axisXY(),
    },
  });

  makeChart('chart-en-pred', {
    type: 'line',
    data: {
      labels: DATA.days,
      datasets: [
        { label: 'Actual',       data: DATA.weekly,    borderColor: C.green,  borderWidth: 2, fill: false, tension: 0.4, pointRadius: 3, pointBackgroundColor: C.green },
        { label: 'AI Predicted', data: DATA.predicted, borderColor: C.purple, borderWidth: 2, borderDash: [4,4], fill: false, tension: 0.4, pointRadius: 3, pointBackgroundColor: C.purple },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: true, labels: { color: C.muted, font: { family:'Syne',size:9 }, boxWidth: 10 } }, tooltip: tooltipCfg() },
      scales: axisXY(),
    },
  });

  ['chart-bldgA','chart-bldgB','chart-bldgC'].forEach((id, i) => {
    const base = [30, 24, 20][i];
    makeChart(id, {
      type: 'bar',
      data: {
        labels: DATA.hours.slice(0, 8),
        datasets: [{
          data: DATA.hours.slice(0, 8).map(() => base + Math.floor(Math.random() * 18)),
          backgroundColor: 'rgba(0,212,255,0.22)',
          borderRadius: 4, borderSkipped: false,
        }],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: tooltipCfg() },
        scales: axisXY(),
      },
    });
  });

  buildHeatmap();
}

/* ── HEATMAP ── */
function buildHeatmap() {
  const rooms = ['A-101','A-201','A-301','B-101','B-201','C-101'];
  const times = ['8a','9a','10a','11a','12p','1p','2p','3p','4p','5p','6p','7p'];
  const container = document.getElementById('heatmap');
  if (!container) return;
  container.innerHTML = '';

  // Header row
  const blank = document.createElement('div');
  blank.className = 'hm-label';
  container.appendChild(blank);
  times.forEach(t => {
    const h = document.createElement('div');
    h.className = 'hm-head';
    h.textContent = t;
    container.appendChild(h);
  });

  rooms.forEach(room => {
    const lbl = document.createElement('div');
    lbl.className = 'hm-label';
    lbl.textContent = room;
    container.appendChild(lbl);
    times.forEach(() => {
      const v = Math.random();
      const cell = document.createElement('div');
      cell.className = 'hm-cell';
      cell.style.background = `rgba(0,212,255,${(0.05 + v * 0.83).toFixed(2)})`;
      container.appendChild(cell);
    });
  });
}

/* ── ROOMS PANEL ── */
function initRoomsCharts() {
  makeChart('chart-occ', {
    type: 'line',
    data: {
      labels: DATA.days,
      datasets: [{
        label: 'Occupied %',
        data: DATA.occupancy,
        borderColor: C.cyan, borderWidth: 2,
        fill: true, backgroundColor: 'rgba(0,212,255,0.06)',
        tension: 0.4, pointRadius: 3, pointBackgroundColor: C.cyan,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: tooltipCfg() },
      scales: {
        x: { grid: gridCfg(), ticks: { color: C.muted, font: { family:'JetBrains Mono',size:8 } } },
        y: { grid: gridCfg(), ticks: { color: C.muted, font: { family:'JetBrains Mono',size:8 } }, min: 0, max: 100 },
      },
    },
  });
}

/* ── AI INSIGHTS ── */
function initAICharts() {
  makeChart('chart-ai-perf', {
    type: 'line',
    data: {
      labels: DATA.aiWeeks,
      datasets: [
        { label: 'Regression',     data: DATA.aiReg, borderColor: C.cyan,   borderWidth: 2, fill: false, tension: 0.4, pointRadius: 3, pointBackgroundColor: C.cyan },
        { label: 'Classification', data: DATA.aiCls, borderColor: C.green,  borderWidth: 2, fill: false, tension: 0.4, pointRadius: 3, pointBackgroundColor: C.green },
        { label: 'Anomaly Detect', data: DATA.aiAnm, borderColor: C.amber,  borderWidth: 2, fill: false, tension: 0.4, pointRadius: 3, pointBackgroundColor: C.amber },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: true, labels: { color: C.muted, font: { family:'Syne',size:9 }, boxWidth: 10 } }, tooltip: tooltipCfg() },
      scales: {
        x: { grid: gridCfg(), ticks: { color: C.muted, font: { family:'JetBrains Mono',size:8 } } },
        y: { grid: gridCfg(), ticks: { color: C.muted, font: { family:'JetBrains Mono',size:8 } }, min: 80, max: 100 },
      },
    },
  });

  // Animate progress bars
  document.querySelectorAll('.progress-fill').forEach(el => {
    const targetW = el.style.width;
    el.style.width = '0';
    requestAnimationFrame(() => { el.style.width = targetW; });
  });
}

/* ── REPORTS ── */
function initReportCharts() {
  makeChart('chart-monthly', {
    type: 'bar',
    data: {
      labels: DATA.months,
      datasets: [{
        data: DATA.monthly,
        backgroundColor: DATA.months.map((_, i) => i === 11 ? C.cyan : 'rgba(0,212,255,0.2)'),
        borderRadius: 4, borderSkipped: false,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: tooltipCfg() },
      scales: axisXY(),
    },
  });

  makeChart('chart-bldg-pie', {
    type: 'doughnut',
    data: {
      labels: ['Block A','Block B','Block C','Block D'],
      datasets: [{
        data: [32, 28, 24, 16],
        backgroundColor: [
          'rgba(0,212,255,0.82)',
          'rgba(124,58,237,0.82)',
          'rgba(16,185,129,0.78)',
          'rgba(245,158,11,0.78)',
        ],
        borderColor: 'transparent', hoverOffset: 6,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout: '55%',
      plugins: {
        legend: { display: true, position: 'bottom', labels: { color: C.muted, font: { family:'Syne',size:9 }, boxWidth: 9 } },
        tooltip: tooltipCfg(),
      },
    },
  });

  makeChart('chart-util', {
    type: 'bar',
    data: {
      labels: ['Block A','Block B','Block C','Block D'],
      datasets: [{
        data: [78, 68, 72, 62],
        backgroundColor: [C.cyan, C.purple, C.green, C.amber],
        borderRadius: 5, borderSkipped: false,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: tooltipCfg() },
      scales: {
        x: { grid: gridCfg(), ticks: { color: C.muted, font: { family:'JetBrains Mono',size:8 } } },
        y: { grid: gridCfg(), ticks: { color: C.muted, font: { family:'JetBrains Mono',size:8 } }, min: 0, max: 100 },
      },
    },
  });
}
