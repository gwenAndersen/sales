import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "wouter"; // New import

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: number;
    direction: "up" | "down" | "neutral";
  };
  icon?: React.ReactNode;
  className?: string;
  link?: string; // New prop
}

export default function MetricCard({ title, value, trend, icon, className, link }: MetricCardProps) {
  const getTrendIcon = () => {
    if (!trend) return null;
    if (trend.direction === "up") return <ArrowUp className="w-4 h-4" />;
    if (trend.direction === "down") return <ArrowDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getTrendColor = () => {
    if (!trend) return "";
    if (trend.direction === "up") return "text-green-600 dark:text-green-500";
    if (trend.direction === "down") return "text-red-600 dark:text-red-500";
    return "text-muted-foreground";
  };

  const content = (
    <Card className={cn("p-6", className)} data-testid={`card-metric-${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-2 flex-1">
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground" data-testid={`text-metric-label-${title.toLowerCase().replace(/\s+/g, "-")}`}>
            {title}
          </p>
          <p className="text-5xl font-bold font-mono" data-testid={`text-metric-value-${title.toLowerCase().replace(/\s+/g, "-")}`}>
            {value}
          </p>
          {trend && (
            <div className={cn("flex items-center gap-1 text-sm font-medium", getTrendColor())} data-testid={`text-metric-trend-${title.toLowerCase().replace(/\s+/g, "-")}`}>
              {getTrendIcon()}
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="text-muted-foreground">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );

  if (link) {
    return <Link href={link}>{content}</Link>;
  }

  return content;
}