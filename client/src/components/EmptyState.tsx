import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export default function EmptyState({ 
  title, 
  description, 
  actionLabel, 
  onAction,
  icon = <FileText className="w-24 h-24" />
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center" data-testid="container-empty-state">
      <div className="text-muted-foreground mb-6">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-2" data-testid="text-empty-title">
        {title}
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md" data-testid="text-empty-description">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} data-testid="button-empty-action">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
