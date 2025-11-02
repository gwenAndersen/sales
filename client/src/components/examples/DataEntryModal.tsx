import { useState } from 'react';
import DataEntryModal from '../DataEntryModal';
import { Button } from '@/components/ui/button';

export default function DataEntryModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)} data-testid="button-open-modal">
        Open Data Entry Form
      </Button>
      <DataEntryModal open={open} onOpenChange={setOpen} />
    </div>
  );
}
