import EmptyState from '../EmptyState';
import { Database } from 'lucide-react';

export default function EmptyStateExample() {
  return (
    <div className="p-6">
      <EmptyState
        title="No data yet"
        description="Start tracking your business performance by adding your first data entry. Monitor revenue, sales, and expenses over time."
        actionLabel="Add First Entry"
        onAction={() => console.log('Add first entry clicked')}
        icon={<Database className="w-24 h-24" />}
      />
    </div>
  );
}
