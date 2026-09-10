import { Input, Select } from '../components/FormInput';
import Button from '../components/Button';
import Card, { CardHeader } from '../components/Card';

const ghanaRegions = [
  'Greater Accra', 'Ashanti', 'Northern', 'Eastern', 'Central', 'Western',
  'Volta', 'Upper East', 'Upper West', 'Bono', 'Bono East', 'Ahafo',
  'Western North', 'Oti', 'Savannah', 'North East',
];

export default function AddPilgrimPage() {
  return (
    <Card>
      <CardHeader title="Register New Pilgrim" subtitle="Register a pilgrim through your licensed Ghana Hajj agency" />
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
        <Input label="Full Name" placeholder="Enter full name as on passport" />
        <Input label="Phone Number" placeholder="+233 24 000 0000" />
        <Input label="Email" type="email" placeholder="email@example.com" />
        <Select label="Gender" options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]} />
        <Input label="Date of Birth" type="date" />
        <Input label="Ghana Card Number" placeholder="GHA-XXXXXXXXX-X" />
        <Input label="Passport Number" placeholder="Ghana passport number" />
        <Input label="Passport Expiry" type="date" />
        <Select label="Region" options={ghanaRegions.map((r) => ({ value: r.toLowerCase().replace(/\s/g, '-'), label: r }))} />
        <Select label="Package" options={[
          { value: 'premium', label: 'Premium Hajj 2026 — GH₵ 88,000' },
          { value: 'standard', label: 'Standard Hajj 2026 — GH₵ 65,000' },
          { value: 'economy', label: 'Economy Hajj 2026 — GH₵ 48,000' },
        ]} />
        <Select label="Group" options={[
          { value: 'accra-a', label: 'Accra Group A' },
          { value: 'kumasi-b', label: 'Kumasi Group B' },
          { value: 'tamale-c', label: 'Tamale Group C' },
          { value: 'takoradi-d', label: 'Takoradi Group D' },
        ]} />
        <div className="md:col-span-2 flex gap-3 pt-4">
          <Button type="submit">Register Pilgrim</Button>
          <Button variant="secondary" type="button">Cancel</Button>
        </div>
      </form>
    </Card>
  );
}
