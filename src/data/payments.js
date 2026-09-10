export const payments = [
  { id: 'PAY-001', pilgrimId: 'PLG-001', pilgrimName: 'Kwame Asante', amount: 29333, date: '2026-01-15', method: 'MTN Mobile Money', status: 'completed', reference: 'MOMO-20260115-001' },
  { id: 'PAY-002', pilgrimId: 'PLG-001', pilgrimName: 'Kwame Asante', amount: 29333, date: '2025-12-10', method: 'GCB Bank Transfer', status: 'completed', reference: 'GCB-20251210-042' },
  { id: 'PAY-003', pilgrimId: 'PLG-001', pilgrimName: 'Kwame Asante', amount: 29334, date: '2025-11-15', method: 'Ecobank Transfer', status: 'completed', reference: 'ECO-20251115-018' },
  { id: 'PAY-004', pilgrimId: 'PLG-002', pilgrimName: 'Ibrahim Mohammed', amount: 32500, date: '2026-01-20', method: 'Cash', status: 'completed', reference: 'CSH-20260120-007' },
  { id: 'PAY-005', pilgrimId: 'PLG-003', pilgrimName: 'Akosua Mensah', amount: 88000, date: '2025-11-01', method: 'Vodafone Cash', status: 'completed', reference: 'VDC-20251101-033' },
  { id: 'PAY-006', pilgrimId: 'PLG-004', pilgrimName: 'Yaw Darko', amount: 9600, date: '2026-01-10', method: 'MTN Mobile Money', status: 'completed', reference: 'MOMO-20260110-012' },
  { id: 'PAY-007', pilgrimId: 'PLG-005', pilgrimName: 'Aisha Bello', amount: 48750, date: '2026-02-05', method: 'GCB Bank Transfer', status: 'completed', reference: 'GCB-20260205-021' },
  { id: 'PAY-008', pilgrimId: 'PLG-006', pilgrimName: 'Kofi Osei', amount: 88000, date: '2025-10-20', method: 'Ecobank Transfer', status: 'completed', reference: 'ECO-20251020-055' },
  { id: 'PAY-009', pilgrimId: 'PLG-009', pilgrimName: 'Alhaji Musah Abdulai', amount: 58667, date: '2026-01-25', method: 'MTN Mobile Money', status: 'completed', reference: 'MOMO-20260125-009' },
  { id: 'PAY-010', pilgrimId: 'PLG-011', pilgrimName: 'Efua Boateng', amount: 13000, date: '2026-02-10', method: 'Cash', status: 'completed', reference: 'CSH-20260210-003' },
  { id: 'PAY-011', pilgrimId: 'PLG-007', pilgrimName: 'Fatima Yakubu', amount: 24000, date: '2026-02-15', method: 'Vodafone Cash', status: 'pending', reference: 'VDC-20260215-014' },
  { id: 'PAY-012', pilgrimId: 'PLG-008', pilgrimName: 'Abena Frimpong', amount: 65000, date: '2025-11-08', method: 'GCB Bank Transfer', status: 'completed', reference: 'GCB-20251108-027' },
];

export const financeSummary = {
  totalExpected: 81240000,
  collected: 61480000,
  outstanding: 19760000,
  overdueAmount: 8560000,
  partialPayments: 11200000,
};

export const paymentProgressData = [
  { month: 'Sep', collected: 4200000, expected: 4800000 },
  { month: 'Oct', collected: 7800000, expected: 8500000 },
  { month: 'Nov', collected: 12500000, expected: 13000000 },
  { month: 'Dec', collected: 9800000, expected: 10500000 },
  { month: 'Jan', collected: 15600000, expected: 16200000 },
  { month: 'Feb', collected: 8900000, expected: 9400000 },
];
