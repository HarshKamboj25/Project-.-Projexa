/* ===============
   DATA.JS — All mock data for SmartCampus AI*/
const DATA = {
  hours:     ['6AM','7','8','9','10','11','12PM','1','2','3','4','5','6','7','8'],
  energy:    [12, 18, 28, 42, 55, 62, 58, 60, 72, 80, 76, 65, 48, 35, 24],
  days:      ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  weekly:    [420, 510, 490, 548, 480, 220, 180],
  predicted: [405, 525, 475, 558, 465, 230, 195],
  occupancy: [72, 68, 74, 70, 65, 42, 38],
  months:    ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  monthly:   [8200, 7800, 8400, 7600, 7200, 8800, 9200, 8600, 7900, 7400, 7200, 7482],
  aiWeeks:   ['W1','W2','W3','W4','W5','W6','W7','W8'],
  aiReg:     [88, 89, 90, 92, 91, 93, 94, 94],
  aiCls:     [92, 93, 94, 95, 96, 96, 97, 97],
  aiAnm:     [85, 87, 88, 89, 90, 90, 91, 91],

  rooms: {
    A: [
      { id: 'A-110', cap: 40,  s: 'occupied'   },
      { id: 'A-120', cap: 60,  s: 'occupied'   },
      { id: 'A-130', cap: 30,  s: 'available'  },
      { id: 'A-201', cap: 80,  s: 'occupied'   },
      { id: 'A-202', cap: 40,  s: 'underused'  },
      { id: 'A-203', cap: 60,  s: 'available'  },
      { id: 'A-301', cap: 30,  s: 'occupied'   },
      { id: 'A-302', cap: 50,  s: 'available'  },
    ],
    B: [
      { id: 'B-101', cap: 60,  s: 'occupied'     },
      { id: 'B-102', cap: 40,  s: 'occupied'     },
      { id: 'B-103', cap: 80,  s: 'available'    },
      { id: 'B-201', cap: 30,  s: 'underused'    },
      { id: 'B-202', cap: 60,  s: 'occupied'     },
      { id: 'B-203', cap: 40,  s: 'maintenance'  },
      { id: 'B-301', cap: 80,  s: 'occupied'     },
      { id: 'B-302', cap: 30,  s: 'occupied'     },
    ],
    C: [
      { id: 'C-101', cap: 50,  s: 'available'   },
      { id: 'C-102', cap: 60,  s: 'occupied'    },
      { id: 'C-201', cap: 40,  s: 'underused'   },
      { id: 'C-202', cap: 80,  s: 'occupied'    },
      { id: 'C-301', cap: 30,  s: 'available'   },
      { id: 'C-302', cap: 60,  s: 'occupied'    },
      { id: 'C-401', cap: 40,  s: 'maintenance' },
      { id: 'C-402', cap: 50,  s: 'occupied'    },
    ],
  },

  bookingRooms: [
    { id: 'A-203', bldg: 'Block A', floor: 'Floor 2', cap: 60, ai: true,  free: ['2:00 PM','3:00 PM','4:00 PM'], busy: ['11:00 AM'] },
    { id: 'A-130', bldg: 'Block A', floor: 'Floor 1', cap: 30, ai: false, free: ['2:00 PM','3:00 PM'],            busy: ['9:00 AM','10:00 AM'] },
    { id: 'B-103', bldg: 'Block B', floor: 'Floor 1', cap: 80, ai: false, free: ['2:00 PM'],                      busy: ['9:00 AM','10:00 AM','11:00 AM'] },
    { id: 'C-301', bldg: 'Block C', floor: 'Floor 3', cap: 30, ai: false, free: ['2:00 PM','3:00 PM','4:00 PM','5:00 PM'], busy: [] },
    { id: 'C-101', bldg: 'Block C', floor: 'Floor 1', cap: 50, ai: false, free: ['2:00 PM','3:00 PM'],            busy: ['10:00 AM'] },
  ],

  alerts: [
    { type: 'critical', icon: '🚨', title: 'AC Running in Empty Room – B-101', desc: 'Unoccupied 2h 14m. Estimated waste: 4.2 kWh',          time: '10:42 AM' },
    { type: 'critical', icon: '🚨', title: 'Energy Spike – E-201',              desc: 'Consumption 180% above baseline in last 30 min',      time: '10:38 AM' },
    { type: 'warning',  icon: '⚠️',  title: 'Lights On – D-Lab2 (No Occupancy)', desc: 'No motion detected for 45 minutes. Lights still on.', time: '10:20 AM' },
    { type: 'warning',  icon: '⚠️',  title: 'Underutilized – C Wing',            desc: 'Only 2/8 rooms occupied this morning.',               time: '09:55 AM' },
    { type: 'info',     icon: 'ℹ️',  title: 'Booking Confirmed – A-203',         desc: 'Dr. Sharma booked for 2–4 PM (Data Structures)',      time: '09:30 AM' },
    { type: 'info',     icon: 'ℹ️',  title: 'AI Model Retrained',                desc: 'Energy prediction updated. Accuracy: 94.2%',          time: '08:00 AM' },
    { type: 'success',  icon: '✅',  title: 'Night Mode Activated',              desc: '14 rooms switched off. Saving: ₹1,840 tonight.',      time: 'Yesterday 11 PM' },
  ],
};
