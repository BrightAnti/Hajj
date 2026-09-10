import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, ChevronLeft, Package } from 'lucide-react';
import { Input, Select } from '../../components/FormInput';
import Button from '../../components/Button';
import Card, { CardHeader } from '../../components/Card';
import { packages } from '../../data/groups';
import { usePortalAuth } from '../../context/PortalAuthContext';
import { formatCurrency, cn } from '../../lib/utils';

const ghanaRegions = [
  'Greater Accra', 'Ashanti', 'Northern', 'Eastern', 'Central', 'Western',
  'Volta', 'Upper East', 'Upper West', 'Bono', 'Savannah', 'North East',
];

const emptyForm = {
  packageId: '',
  fullName: '',
  phone: '',
  email: '',
  gender: '',
  dateOfBirth: '',
  region: '',
  passportNumber: '',
  passportExpiry: '',
  emergencyName: '',
  emergencyPhone: '',
  emergencyRelation: '',
};

export default function PortalRegisterPage() {
  const navigate = useNavigate();
  const { register, logout } = usePortalAuth();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    logout();
  }, [logout]);

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const selectedPkg = packages.find((p) => p.id === form.packageId);

  const validate = () => {
    const next = {};
    if (!form.packageId) next.packageId = 'Please select a package';
    if (!form.fullName.trim()) next.fullName = 'Required';
    if (!form.phone.trim()) next.phone = 'Required';
    if (!form.email.trim()) next.email = 'Required';
    if (!form.gender) next.gender = 'Required';
    if (!form.region) next.region = 'Required';
    if (!form.emergencyName.trim()) next.emergencyName = 'Required';
    if (!form.emergencyPhone.trim()) next.emergencyPhone = 'Required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    register(form);
    navigate('/portal/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link to="/portal/login" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-4">
            <ChevronLeft size={16} /> Back to login
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Register for Hajj 2026</h1>
          <p className="text-sm text-slate-500 mt-1">Fill in the form below to submit your application</p>
        </div>

        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-6">
          {/* Package selection */}
          <Card>
            <CardHeader title="1. Choose your package" subtitle="Select one Hajj package" />
            {errors.packageId && <p className="text-xs text-red-500 mb-3">{errors.packageId}</p>}
            <div className="space-y-3">
              {packages.map((pkg) => (
                <label
                  key={pkg.id}
                  className={cn(
                    'flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all',
                    form.packageId === pkg.id ? 'border-primary-600 bg-primary-50/50' : 'border-slate-200 hover:border-slate-300'
                  )}
                >
                  <input
                    type="radio"
                    name="packageId"
                    value={pkg.id}
                    checked={form.packageId === pkg.id}
                    onChange={() => update('packageId', pkg.id)}
                    className="mt-1 text-primary-600 focus:ring-primary-500"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Package size={16} className="text-amber-600 shrink-0" />
                        <p className="font-semibold text-slate-900">{pkg.name}</p>
                      </div>
                      <p className="font-bold text-primary-700 shrink-0">{formatCurrency(pkg.price)}</p>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{pkg.duration}</p>
                    <ul className="mt-2 space-y-0.5">
                      {pkg.includes.map((item) => (
                        <li key={item} className="text-xs text-slate-600 flex items-center gap-1.5">
                          <Check size={11} className="text-primary-600 shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </label>
              ))}
            </div>
          </Card>

          {/* Personal details — always visible */}
          <Card>
            <CardHeader title="2. Your personal details" subtitle="Enter your information as it appears on your passport" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name *"
                placeholder="Enter your full name"
                value={form.fullName}
                onChange={(e) => update('fullName', e.target.value)}
                error={errors.fullName}
                containerClassName="sm:col-span-2"
                autoComplete="off"
              />
              <Input
                label="Phone Number *"
                placeholder="+233 24 000 0000"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                error={errors.phone}
                autoComplete="off"
              />
              <Input
                label="Email Address *"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                error={errors.email}
                autoComplete="off"
              />
              <Select
                label="Gender *"
                value={form.gender}
                onChange={(e) => update('gender', e.target.value)}
                error={errors.gender}
                options={[{ value: '', label: 'Select gender...' }, { value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }]}
              />
              <Input
                label="Date of Birth"
                type="date"
                value={form.dateOfBirth}
                onChange={(e) => update('dateOfBirth', e.target.value)}
                autoComplete="off"
              />
              <Select
                label="Region *"
                value={form.region}
                onChange={(e) => update('region', e.target.value)}
                error={errors.region}
                options={[{ value: '', label: 'Select your region...' }, ...ghanaRegions.map((r) => ({ value: r, label: r }))]}
              />
              <Input
                label="Passport Number"
                placeholder="Ghana passport number (optional)"
                value={form.passportNumber}
                onChange={(e) => update('passportNumber', e.target.value)}
                autoComplete="off"
              />
              <Input
                label="Passport Expiry"
                type="date"
                value={form.passportExpiry}
                onChange={(e) => update('passportExpiry', e.target.value)}
                autoComplete="off"
              />
            </div>
          </Card>

          {/* Emergency contact */}
          <Card>
            <CardHeader title="3. Emergency contact" subtitle="Someone we can reach in Ghana while you are away" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Contact Name *"
                placeholder="Full name"
                value={form.emergencyName}
                onChange={(e) => update('emergencyName', e.target.value)}
                error={errors.emergencyName}
                autoComplete="off"
              />
              <Input
                label="Contact Phone *"
                placeholder="+233 20 000 0000"
                value={form.emergencyPhone}
                onChange={(e) => update('emergencyPhone', e.target.value)}
                error={errors.emergencyPhone}
                autoComplete="off"
              />
              <Input
                label="Relationship"
                placeholder="Spouse, sibling, parent, etc."
                value={form.emergencyRelation}
                onChange={(e) => update('emergencyRelation', e.target.value)}
                containerClassName="sm:col-span-2"
                autoComplete="off"
              />
            </div>
          </Card>

          {/* Summary + submit */}
          {selectedPkg && (
            <div className="rounded-xl bg-primary-50 border border-primary-200 px-4 py-3 flex items-center justify-between text-sm">
              <span className="text-slate-600">Selected package</span>
              <span className="font-semibold text-primary-800">{selectedPkg.name} — {formatCurrency(selectedPkg.price)}</span>
            </div>
          )}

          <Button type="submit" size="lg" className="w-full">
            Submit Application
          </Button>

          <p className="text-center text-xs text-slate-400">
            Already registered?{' '}
            <Link to="/portal/login" className="text-primary-700 hover:underline">Sign in here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
