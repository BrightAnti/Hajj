import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { pilgrims, getPilgrimById } from '../data/pilgrims';
import { packages } from '../data/groups';

const STORAGE_KEY = 'hajjflow_portal_session';

const PortalAuthContext = createContext(null);

export function PortalAuthProvider({ children }) {
  const [pilgrim, setPilgrim] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const { pilgrimId, customPilgrim } = JSON.parse(stored);
        if (customPilgrim) {
          setPilgrim(customPilgrim);
        } else if (pilgrimId) {
          setPilgrim(getPilgrimById(pilgrimId) || null);
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const persist = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const login = (phoneOrEmail) => {
    const query = phoneOrEmail.trim().toLowerCase();
    const found = pilgrims.find(
      (p) =>
        p.phone.replace(/\s/g, '').includes(query.replace(/\s/g, '')) ||
        p.email.toLowerCase() === query
    );
    if (found) {
      setPilgrim(found);
      persist({ pilgrimId: found.id });
      return { success: true };
    }
    return { success: false, error: 'No account found. Please register first.' };
  };

  const register = (formData) => {
    const pkg = packages.find((p) => p.id === formData.packageId);
    const newPilgrim = {
      id: `PLG-NEW-${Date.now()}`,
      name: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      nationality: 'Ghana',
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth,
      passportNumber: formData.passportNumber || 'Pending',
      passportExpiry: formData.passportExpiry || '',
      package: pkg?.name || 'Standard Hajj 2026',
      group: 'Pending assignment',
      paymentStatus: 'unpaid',
      documentStatus: 'pending',
      travelStatus: 'pending',
      visaStatus: 'pending',
      totalAmount: pkg?.price || 65000,
      paidAmount: 0,
      emergencyContact: {
        name: formData.emergencyName,
        phone: formData.emergencyPhone,
        relation: formData.emergencyRelation,
      },
      flight: null,
      hotel: null,
      room: null,
      registeredDate: new Date().toISOString().split('T')[0],
      region: formData.region,
      applicationStatus: 'submitted',
    };
    setPilgrim(newPilgrim);
    persist({ customPilgrim: newPilgrim });
    return { success: true };
  };

  const logout = useCallback(() => {
    setPilgrim(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <PortalAuthContext.Provider value={{ pilgrim, loading, login, register, logout, isAuthenticated: !!pilgrim }}>
      {children}
    </PortalAuthContext.Provider>
  );
}

export function usePortalAuth() {
  const ctx = useContext(PortalAuthContext);
  if (!ctx) throw new Error('usePortalAuth must be used within PortalAuthProvider');
  return ctx;
}
