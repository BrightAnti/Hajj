export const documents = [
  { id: 'DOC-001', pilgrimId: 'PLG-002', pilgrimName: 'Ibrahim Mohammed', type: 'Passport Copy', status: 'pending', submittedDate: '2026-02-20', reviewedBy: null, notes: '' },
  { id: 'DOC-002', pilgrimId: 'PLG-004', pilgrimName: 'Yaw Darko', type: 'Passport Copy', status: 'rejected', submittedDate: '2026-02-18', reviewedBy: 'Admin User', notes: 'Passport expires within 6 months — renew at Passport Office, Accra' },
  { id: 'DOC-003', pilgrimId: 'PLG-004', pilgrimName: 'Yaw Darko', type: 'Yellow Fever Certificate', status: 'pending', submittedDate: '2026-02-19', reviewedBy: null, notes: '' },
  { id: 'DOC-004', pilgrimId: 'PLG-005', pilgrimName: 'Aisha Bello', type: 'Passport Copy', status: 'submitted', submittedDate: '2026-02-22', reviewedBy: null, notes: '' },
  { id: 'DOC-005', pilgrimId: 'PLG-005', pilgrimName: 'Aisha Bello', type: 'Medical Certificate', status: 'pending', submittedDate: '2026-02-21', reviewedBy: null, notes: '' },
  { id: 'DOC-006', pilgrimId: 'PLG-007', pilgrimName: 'Fatima Yakubu', type: 'Passport Copy', status: 'pending', submittedDate: '2026-02-23', reviewedBy: null, notes: '' },
  { id: 'DOC-007', pilgrimId: 'PLG-009', pilgrimName: 'Alhaji Musah Abdulai', type: 'Ghana Card Copy', status: 'submitted', submittedDate: '2026-02-20', reviewedBy: null, notes: '' },
  { id: 'DOC-008', pilgrimId: 'PLG-011', pilgrimName: 'Efua Boateng', type: 'Passport Copy', status: 'pending', submittedDate: '2026-02-24', reviewedBy: null, notes: '' },
  { id: 'DOC-009', pilgrimId: 'PLG-011', pilgrimName: 'Efua Boateng', type: 'Ghana Card Copy', status: 'pending', submittedDate: '2026-02-24', reviewedBy: null, notes: '' },
  { id: 'DOC-010', pilgrimId: 'PLG-001', pilgrimName: 'Kwame Asante', type: 'Passport Copy', status: 'verified', submittedDate: '2025-11-12', reviewedBy: 'Admin User', notes: 'Verified successfully' },
  { id: 'DOC-011', pilgrimId: 'PLG-003', pilgrimName: 'Akosua Mensah', type: 'Passport Copy', status: 'verified', submittedDate: '2025-10-28', reviewedBy: 'Admin User', notes: 'Verified successfully' },
  { id: 'DOC-012', pilgrimId: 'PLG-006', pilgrimName: 'Kofi Osei', type: 'Yellow Fever Certificate', status: 'verified', submittedDate: '2025-10-18', reviewedBy: 'Sarah Osei', notes: 'Valid certificate from Korle Bu' },
];

export const documentCompletionData = [
  { name: 'Verified', value: 156, color: '#059669' },
  { name: 'Submitted', value: 34, color: '#2563eb' },
  { name: 'Pending', value: 48, color: '#d97706' },
  { name: 'Rejected', value: 12, color: '#dc2626' },
];
