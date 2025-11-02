import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIInsightCardProps {
  title: string;
  description: string;
  confidence?: number;
  className?: string;
}

export default function AIInsightCard({ title, description, confidence, className }: AIInsightCardProps) {
  return (
    <Card className={cn("p-4", className)} data-testid={`card-ai-insight-${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="mt-0.5">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 space-y-2">
            <h4 className="font-medium text-sm" data-testid={`text-insight-title-${title.toLowerCase().replace(/\s+/g, "-")}`}>
              {title}
            </h4>
            <p className="text-sm text-muted-foreground" data-testid={`text-insight-description-${title.toLowerCase().replace(/\s+/g, "-")}`}>
              {description}
            </p>
            {confidence !== undefined && (
              <div className="flex items-center gap-2">
                <div className="h-1.5 flex-1 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${confidence}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground font-medium">{confidence}%</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
