import EmptyState from '../components/EmptyState';
import { Receipt } from 'lucide-react';

export default function PlaceholderPage({ title, description }) {
  return (
    <EmptyState
      icon={Receipt}
      title={title || 'Coming Soon'}
      description={description || 'This section is under development and will be available in a future release.'}
    />
  );
}
