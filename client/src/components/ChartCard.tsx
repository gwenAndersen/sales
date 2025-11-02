import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export default function ChartCard({ title, children, className, action }: ChartCardProps) {
  return (
    <Card className={cn("p-8", className)} data-testid={`card-chart-${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h3 className="text-lg font-medium" data-testid={`text-chart-title-${title.toLowerCase().replace(/\s+/g, "-")}`}>
          {title}
        </h3>
        {action}
      </div>
      <div className="min-h-[300px]">
        {children}
      </div>
    </Card>
  );
}
