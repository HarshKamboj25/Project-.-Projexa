/* BOOKING.JS — Smart booking panel logic  */

function initBookingPanel() {
  const container = document.getElementById('booking-list');
  if (!container) return;
  container.innerHTML = '';

  DATA.bookingRooms.forEach(room => {
    const row = document.createElement('div');
    row.className = 'booking-row' + (room.ai ? ' ai-pick' : '');

    const idColor  = room.ai ? '#a78bfa' : '#00d4ff';
    const btnClass = room.ai ? 'btn-purple' : 'btn-cyan';

    row.innerHTML = `
      <div>
        <div class="br-id" style="color:${idColor}">${room.id}</div>
        <div class="br-floor">${room.floor}</div>
      </div>
      <div>
        <div class="br-name">
          ${room.bldg} – ${room.id}
          ${room.ai ? '<span class="ai-pill">🤖 AI PICK</span>' : ''}
        </div>
        <div class="br-detail">${room.cap} seats · ${room.bldg}</div>
      </div>
      <div class="slots">
        ${room.free.map(s => `<span class="slot free" onclick="openModal('${room.id}','${room.cap}','${room.floor}')">${s}</span>`).join('')}
        ${room.busy.map(s => `<span class="slot busy">${s}</span>`).join('')}
      </div>
      <button class="btn ${btnClass}" onclick="openModal('${room.id}','${room.cap}','${room.floor}')">Book →</button>
    `;

    container.appendChild(row);
  });
}

/* ── MODAL ── */
function openModal(room, cap, floor) {
  document.getElementById('modal-room').value  = `${room} – ${floor} (${cap} seats)`;
  document.getElementById('modal-date').value  = new Date().toISOString().split('T')[0];
  document.getElementById('modal-purpose').value = '';
  document.getElementById('modal-overlay').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal-overlay').style.display = 'none';
}

function confirmBooking() {
  const room    = document.getElementById('modal-room').value;
  const time    = document.getElementById('modal-time').value;
  const purpose = document.getElementById('modal-purpose').value || 'Class';

  closeModal();

  // Push success alert into the alerts panel
  const roomShort = room.split('–')[0].trim();
  addAlertDynamic({
    type: 'success',
    icon: '✅',
    title: `Booking Confirmed – ${roomShort}`,
    desc:  `${purpose} · ${time}`,
    time:  'Just now',
  });

  showToast(`✅ ${roomShort} booked for ${time}`);
}

// Close modal when clicking backdrop
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeModal();
    });
  }
});
