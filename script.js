// ─── DATA ───────────────────────────────────────────────────
const rooms = [
  { id:'A-101', block:'A', name:'Lab 1', cap:40, occ:35, energy:'High', booked:true },
  { id:'A-102', block:'A', name:'Lecture Hall', cap:60, occ:52, energy:'High', booked:true },
  { id:'A-103', block:'A', name:'Seminar Room', cap:30, occ:24, energy:'Med', booked:true },
  { id:'A-104', block:'A', name:'Tutorial Room', cap:25, occ:20, energy:'Low', booked:true },
  { id:'B-201', block:'B', name:'Arts Studio', cap:50, occ:21, energy:'Med', booked:true },
  { id:'B-203', block:'B', name:'Language Lab', cap:40, occ:17, energy:'Med', booked:true },
  { id:'B-205', block:'B', name:'Conference Rm', cap:80, occ:22, energy:'High', booked:true },
  { id:'B-207', block:'B', name:'Lecture Hall', cap:60, occ:15, energy:'High', booked:false },
  { id:'C-101', block:'C', name:'Classroom 1', cap:40, occ:0, energy:'High', booked:false },
  { id:'C-103', block:'C', name:'Classroom 3', cap:40, occ:0, energy:'High', booked:false },
  { id:'C-105', block:'C', name:'Classroom 5', cap:35, occ:0, energy:'Med', booked:false },
  { id:'C-107', block:'C', name:'Study Room', cap:20, occ:6, energy:'Low', booked:true },
  { id:'D-301', block:'D', name:'Eng. Lab A', cap:50, occ:48, energy:'High', booked:true },
  { id:'D-303', block:'D', name:'Eng. Lab B', cap:50, occ:50, energy:'High', booked:true },
  { id:'D-305', block:'D', name:'Computer Lab', cap:60, occ:58, energy:'High', booked:true },
  { id:'D-307', block:'D', name:'Workshop', cap:30, occ:0, energy:'Low', booked:false },
];

const bookings = [
  { room:'A-101', teacher:'Prof. Sharma', dept:'Computer Science', time:'9:00 AM – 10:00 AM', students:35, status:'Active' },
  { room:'D-305', teacher:'Prof. Gupta', dept:'Engineering', time:'10:00 AM – 11:00 AM', students:58, status:'Active' },
  { room:'B-201', teacher:'Prof. Khan', dept:'Arts', time:'11:00 AM – 12:00 PM', students:21, status:'Active' },
  { room:'A-102', teacher:'Prof. Mehta', dept:'Science', time:'12:00 PM – 1:00 PM', students:52, status:'Upcoming' },
];

// ─── STATUS LOGIC ────────────────────────────────────────────────────
function getStatus(r) {
  const p = r.occ / r.cap * 100;
  if (p === 0) return { label:'Empty', cls:'empty', color:'#ff4444' };
  if (p < 45) return { label:'Low', cls:'low', color:'#ffaa00' };
  if (p < 85) return { label:'Good', cls:'good', color:'#00cc66' };
  return { label:'Full', cls:'full', color:'#00d4ff' };
}

function getSuggestion(r) {
  const p = r.occ / r.cap * 100;
  if (p === 0) return 'Turn OFF power immediately';
  if (p < 45) return 'Consider merging class';
  if (p > 90) return 'At capacity — no action';
  return 'Operating efficiently';
}

// ─── CLOCK ───────────────────────────────────────────────────────────
function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent =
    now.toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', second:'2-digit' }) + ' IST';
}
setInterval(updateClock, 1000);
updateClock();

// ─── TABS ─────────────────────────────────────────────────────────────
function showTab(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  event.target.classList.add('active');
}

// ─── ROOM GRID ────────────────────────────────────────────────────────
function buildRoomGrid() {
  const grid = document.getElementById('room-grid');
  grid.innerHTML = '';
  rooms.forEach(r => {
    const st = getStatus(r);
    const pct = Math.round(r.occ / r.cap * 100);
    const fillClass = st.cls === 'empty' ? 'red' : st.cls === 'low' ? 'orange' : st.cls === 'good' ? 'green' : 'blue';
    grid.innerHTML += `
      <div class="room-tile ${st.cls}">
        <h3>${r.id}</h3>
        <p>${r.name} · Cap: ${r.cap}</p>
        <div class="room-occ" style="color:${st.color}">${r.occ}<span style="font-size:14px;color:var(--muted)">/${r.cap}</span></div>
        <span class="badge ${st.cls}">${st.label}</span>
        <div class="prog-bar" style="margin-top:8px">
          <div class="prog-fill ${fillClass}" style="width:${pct}%"></div>
        </div>
        <p style="font-size:11px; color:var(--muted); margin-top:4px">${pct}% used</p>
      </div>`;
  });
}

// ─── ROOM TABLE ──────────────────────────────────────────────────────
function buildRoomTable() {
  const tbody = document.getElementById('room-table-body');
  tbody.innerHTML = '';
  rooms.forEach(r => {
    const st = getStatus(r);
    const pct = Math.round(r.occ / r.cap * 100);
    const fillClass = pct === 0 ? 'red' : pct < 45 ? 'orange' : pct < 85 ? 'green' : 'blue';
    const energyColor = r.energy === 'High' ? 'var(--accent3)' : r.energy === 'Med' ? 'var(--warn)' : 'var(--good)';
    tbody.innerHTML += `<tr>
      <td style="font-family:'Orbitron',monospace;font-size:13px;color:var(--accent)">${r.id}</td>
      <td>Block ${r.block}</td>
      <td>${r.cap}</td>
      <td>${r.occ}</td>
      <td>
        <div style="display:flex;align-items:center;gap:8px">
          <div class="prog-bar" style="width:60px">
            <div class="prog-fill ${fillClass}" style="width:${pct}%"></div>
          </div>
          <span style="font-size:12px">${pct}%</span>
        </div>
      </td>
      <td><span class="badge ${st.cls}">${st.label}</span></td>
      <td><span style="color:${energyColor}">${r.energy}</span></td>
      <td style="font-size:12px;color:var(--muted)">${getSuggestion(r)}</td>
    </tr>`;
  });
}

// ─── ENERGY BARS ─────────────────────────────────────────────────────
function buildEnergyBars() {
  const wrap = document.getElementById('energy-bars');
  const energyData = [
    { name:'D-301 Eng. Lab A', kw:5.2, max:6 },
    { name:'D-305 Computer Lab', kw:4.8, max:6 },
    { name:'A-102 Lecture Hall', kw:3.6, max:5 },
    { name:'B-205 Conference Rm', kw:3.1, max:5 },
    { name:'C-101 (EMPTY)', kw:1.4, max:3, warn:true },
    { name:'C-103 (EMPTY)', kw:1.2, max:3, warn:true },
    { name:'A-103 Seminar', kw:2.1, max:4 },
    { name:'D-307 Workshop', kw:0.8, max:3 },
  ];
  wrap.innerHTML = '';
  energyData.forEach(e => {
    const pct = (e.kw / e.max * 100).toFixed(0);
    const col = e.warn ? '#ff4444' : pct > 80 ? '#ffaa00' : '#00cc66';
    wrap.innerHTML += `
      <div class="energy-bar-wrap">
        <div class="e-label">
          <span class="e-name" style="${e.warn ? 'color:var(--danger)' : ''}">${e.name}</span>
          <span class="e-value">${e.kw} kW ${e.warn ? '⚠️' : ''}</span>
        </div>
        <div class="e-bar">
          <div class="e-fill" style="width:${pct}%; background:linear-gradient(90deg,${col}aa,${col})"></div>
        </div>
      </div>`;
  });
}

// ─── TREND CHART (Canvas) ──────────────────────────────────
function drawTrendChart() {
  const canvas = document.getElementById('trendChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const hours = ['6AM','8AM','10AM','12PM','2PM','4PM','6PM','8PM'];
  const actual = [20, 80, 160, 190, 170, 180, 140, 60];
  const baseline = [40, 110, 200, 230, 220, 210, 180, 90];
  const W = canvas.width, H = canvas.height;
  const pad = { t:20, r:20, b:30, l:40 };
  const cw = W - pad.l - pad.r, ch = H - pad.t - pad.b;
  const max = 250;

  ctx.clearRect(0, 0, W, H);

  const toX = i => pad.l + (i / (hours.length - 1)) * cw;
  const toY = v => pad.t + ch - (v / max) * ch;

  // Grid lines
  ctx.strokeStyle = 'rgba(26,58,92,0.5)'; ctx.lineWidth = 1;
  for (let i = 0; i <= 5; i++) {
    const y = pad.t + (i / 5) * ch;
    ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l + cw, y); ctx.stroke();
  }

  // Baseline (dashed)
  ctx.beginPath();
  ctx.strokeStyle = 'rgba(255,100,50,0.4)';
  ctx.setLineDash([5,5]); ctx.lineWidth = 1.5;
  baseline.forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)));
  ctx.stroke(); ctx.setLineDash([]);

  // Actual area fill
  const grad = ctx.createLinearGradient(0, pad.t, 0, pad.t + ch);
  grad.addColorStop(0, 'rgba(0,212,255,0.3)');
  grad.addColorStop(1, 'rgba(0,212,255,0)');
  ctx.beginPath();
  actual.forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)));
  ctx.lineTo(toX(actual.length - 1), pad.t + ch);
  ctx.lineTo(toX(0), pad.t + ch);
  ctx.closePath(); ctx.fillStyle = grad; ctx.fill();

  // Actual line
  ctx.beginPath(); ctx.strokeStyle = '#00d4ff'; ctx.lineWidth = 2.5;
  actual.forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)));
  ctx.stroke();

  // Data points
  actual.forEach((v, i) => {
    ctx.beginPath(); ctx.arc(toX(i), toY(v), 4, 0, Math.PI * 2);
    ctx.fillStyle = '#00d4ff'; ctx.fill();
  });

  // X-axis labels
  ctx.fillStyle = 'rgba(107,154,184,0.8)';
  ctx.font = '11px Rajdhani'; ctx.textAlign = 'center';
  hours.forEach((h, i) => ctx.fillText(h, toX(i), H - 6));

  // Legend
  ctx.fillStyle = '#00d4ff'; ctx.fillRect(pad.l, 8, 20, 3);
  ctx.fillStyle = 'rgba(107,154,184,0.8)';
  ctx.textAlign = 'left'; ctx.font = '11px Rajdhani';
  ctx.fillText('Actual Usage (kWh)', pad.l + 26, 14);
  ctx.setLineDash([5,5]); ctx.strokeStyle = 'rgba(255,100,50,0.6)'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(pad.l + 150, 11); ctx.lineTo(pad.l + 170, 11); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillText('Baseline', pad.l + 176, 14);
}

// ─── BOOKING UI ─────────────────────────────────────────────────────
function buildBookingUI() {
  // Populate room dropdown
  const sel = document.getElementById('room-select');
  sel.innerHTML = '<option value="">-- Select Available Room --</option>';
  rooms.filter(r => !r.booked || r.occ === 0).forEach(r => {
    sel.innerHTML += `<option value="${r.id}">${r.id} — ${r.name} (Cap: ${r.cap})</option>`;
  });

  // Default date
  document.getElementById('book-date').value = new Date().toISOString().split('T')[0];

  // Available rooms list
  const list = document.getElementById('available-rooms-list');
  list.innerHTML = '';
  rooms.filter(r => r.occ === 0 || !r.booked).forEach(r => {
    list.innerHTML += `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px;border:1px solid var(--border);border-radius:8px;margin-bottom:8px;">
        <div>
          <div style="font-family:'Orbitron',monospace;font-size:13px;color:var(--accent)">${r.id}</div>
          <div style="font-size:12px;color:var(--muted)">${r.name} · Capacity: ${r.cap}</div>
        </div>
        <span class="badge available">AVAILABLE</span>
      </div>`;
  });

  // Bookings table
  const bt = document.getElementById('bookings-table');
  bt.innerHTML = '';
  bookings.forEach(b => {
    bt.innerHTML += `<tr>
      <td style="font-family:'Orbitron',monospace;font-size:13px;color:var(--accent)">${b.room}</td>
      <td>${b.teacher}</td><td>${b.dept}</td><td>${b.time}</td><td>${b.students}</td>
      <td><span class="badge ${b.status === 'Active' ? 'good' : 'available'}">${b.status}</span></td>
    </tr>`;
  });
}

// ─── BOOK ROOM ────────────────────────────────────────────────────────
function bookRoom() {
  const name = document.getElementById('teacher-name').value.trim();
  const room = document.getElementById('room-select').value;
  const students = document.getElementById('student-count').value;
  const date = document.getElementById('book-date').value;
  const slot = document.getElementById('time-slot').value;
  const purpose = document.getElementById('purpose').value.trim();
  const res = document.getElementById('booking-result');

  if (!name || !room || !students || !date || !purpose) {
    res.style.display = 'block';
    res.className = 'error';
    res.textContent = '⚠️ Please fill all fields before confirming.';
    return;
  }

  const roomData = rooms.find(r => r.id === room);
  if (roomData && parseInt(students) > roomData.cap) {
    res.style.display = 'block';
    res.className = 'error';
    res.textContent = `⚠️ Student count (${students}) exceeds room capacity (${roomData.cap}).`;
    return;
  }

  bookings.unshift({ room, teacher: name, dept: purpose, time: slot, students, status: 'Confirmed' });
  buildBookingUI();

  res.style.display = 'block';
  res.className = 'success';
  res.innerHTML = `✅ Room <strong>${room}</strong> successfully booked for <strong>${name}</strong> on <strong>${date}</strong> at <strong>${slot}</strong> for ${students} students.`;

  document.getElementById('teacher-name').value = '';
  document.getElementById('student-count').value = '';
  document.getElementById('purpose').value = '';
  document.getElementById('room-select').value = '';
}

// ─── INIT ─────────────────────────────────────────────────────────────
buildRoomGrid();
buildRoomTable();
buildEnergyBars();
buildBookingUI();
setTimeout(drawTrendChart, 100);

document.querySelectorAll('.stat-card').forEach((c, i) => c.style.animationDelay = (i * 0.1) + 's');
