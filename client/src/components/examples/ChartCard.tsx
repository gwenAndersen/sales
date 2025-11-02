import ChartCard from '../ChartCard';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export default function ChartCardExample() {
  return (
    <div className="p-6 space-y-6">
      <ChartCard 
        title="Revenue Trends"
        action={
          <Button variant="outline" size="sm" data-testid="button-download-chart">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        }
      >
        <div className="flex items-center justify-center h-full text-muted-foreground">
          Chart visualization will go here
        </div>
      </ChartCard>
    </div>
  );
}
