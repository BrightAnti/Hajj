export const dashboardStats = {
  totalPilgrims: 1247,
  registered: 1189,
  fullyPaid: 892,
  pendingDocuments: 82,
  visaApproved: 756,
  readyToTravel: 634,
};

export const registrationTrend = [
  { month: 'Sep', count: 45 },
  { month: 'Oct', count: 128 },
  { month: 'Nov', count: 245 },
  { month: 'Dec', count: 312 },
  { month: 'Jan', count: 289 },
  { month: 'Feb', count: 228 },
];

export const recentActivities = [
  { id: 1, action: 'Payment received', detail: 'Kwame Asante — GH₵ 29,333 via MTN MoMo', time: '2 min ago', type: 'payment' },
  { id: 2, action: 'Document verified', detail: 'Akosua Mensah — Passport Copy', time: '15 min ago', type: 'document' },
  { id: 3, action: 'New registration', detail: 'Efua Boateng — Standard Hajj 2026 (Kumasi)', time: '32 min ago', type: 'registration' },
  { id: 4, action: 'Visa approved', detail: 'Kofi Osei — Visa #GH-2026-0892', time: '1 hr ago', type: 'visa' },
  { id: 5, action: 'Room allocated', detail: 'Alhaji Musah Abdulai — Makkah Clock Tower #302', time: '2 hr ago', type: 'accommodation' },
  { id: 6, action: 'Document rejected', detail: 'Yaw Darko — Passport expires within 6 months', time: '3 hr ago', type: 'document' },
  { id: 7, action: 'Group updated', detail: 'Accra Group A — 52 pilgrims confirmed', time: '5 hr ago', type: 'group' },
  { id: 8, action: 'Payment pending', detail: 'Fatima Yakubu — GH₵ 24,000 Vodafone Cash awaiting confirmation', time: '6 hr ago', type: 'payment' },
];

export const upcomingDepartures = [
  { id: 'DEP-001', group: 'Accra Group A', date: '2026-05-28', time: '18:00', pilgrims: 52, destination: 'Kotoka International Airport', status: 'confirmed' },
  { id: 'DEP-002', group: 'Kumasi Group B', date: '2026-05-29', time: '06:00', pilgrims: 48, destination: 'Kotoka International Airport', status: 'confirmed' },
  { id: 'DEP-003', group: 'Tamale Group C', date: '2026-06-01', time: '04:00', pilgrims: 45, destination: 'Kotoka International Airport', status: 'pending' },
  { id: 'DEP-004', group: 'Takoradi Group D', date: '2026-06-05', time: '10:00', pilgrims: 38, destination: 'Kotoka International Airport', status: 'planning' },
];
