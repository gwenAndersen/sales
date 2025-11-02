import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import MetricCard from "@/components/MetricCard";
import ChartCard from "@/components/ChartCard";
import AIInsightCard from "@/components/AIInsightCard";
import DataEntryModal from "@/components/DataEntryModal";
import EmptyState from "@/components/EmptyState";
import { DollarSign, TrendingUp, ShoppingCart, Wallet, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasData] = useState(true); // todo: remove mock functionality

  // todo: remove mock functionality
  const mockMetrics = [
    {
      title: "Total Revenue",
      value: "$45,231",
      trend: { value: 12.5, direction: "up" as const },
      icon: <DollarSign className="w-6 h-6" />,
    },
    {
      title: "Sales",
      value: "2,345",
      trend: { value: 8.2, direction: "up" as const },
      icon: <ShoppingCart className="w-6 h-6" />,
    },
    {
      title: "Profit",
      value: "$12,456",
      trend: { value: 3.1, direction: "down" as const },
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      title: "Expenses",
      value: "$32,775",
      trend: { value: 0, direction: "neutral" as const },
      icon: <Wallet className="w-6 h-6" />,
    },
  ];

  // todo: remove mock functionality
  const mockInsights = [
    {
      title: "Revenue Spike Detected",
      description: "Your revenue increased by 24% compared to last week. This trend is primarily driven by increased sales in the electronics category.",
      confidence: 92,
    },
    {
      title: "Seasonal Pattern Identified",
      description: "Sales typically increase by 15-20% during weekends. Consider adjusting inventory levels accordingly.",
      confidence: 85,
    },
    {
      title: "Cost Optimization Opportunity",
      description: "Your expense-to-revenue ratio is higher than industry average. Review operational costs for potential savings.",
      confidence: 78,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader onAddData={() => setIsModalOpen(true)} />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {!hasData ? (
          <EmptyState
            title="No data yet"
            description="Start tracking your business performance by adding your first data entry. Monitor revenue, sales, and expenses over time to get AI-powered insights."
            actionLabel="Add First Entry"
            onAction={() => setIsModalOpen(true)}
            icon={<Database className="w-24 h-24" />}
          />
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockMetrics.map((metric, index) => (
                <MetricCard key={index} {...metric} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <ChartCard
                  title="Revenue Trends"
                  action={
                    <Select defaultValue="7days">
                      <SelectTrigger className="w-[140px]" data-testid="select-time-range">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7days">Last 7 days</SelectItem>
                        <SelectItem value="30days">Last 30 days</SelectItem>
                        <SelectItem value="90days">Last 90 days</SelectItem>
                        <SelectItem value="year">This year</SelectItem>
                      </SelectContent>
                    </Select>
                  }
                >
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                        <TrendingUp className="w-8 h-8 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <p className="font-medium text-muted-foreground">Chart Visualization</p>
                        <p className="text-sm text-muted-foreground max-w-sm">
                          Revenue trend visualization will be displayed here once connected to your data source
                        </p>
                      </div>
                    </div>
                  </div>
                </ChartCard>

                <ChartCard title="Sales Performance">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                        <ShoppingCart className="w-8 h-8 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <p className="font-medium text-muted-foreground">Sales Analytics</p>
                        <p className="text-sm text-muted-foreground max-w-sm">
                          Detailed sales performance metrics and comparisons will appear here
                        </p>
                      </div>
                    </div>
                  </div>
                </ChartCard>
              </div>

              <div className="space-y-6">
                <div className="sticky top-24">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <h2 className="text-lg font-medium" data-testid="text-insights-title">AI Insights</h2>
                    </div>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-md font-medium">
                      Powered by AI
                    </span>
                  </div>
                  <div className="space-y-4">
                    {mockInsights.map((insight, index) => (
                      <AIInsightCard key={index} {...insight} />
                    ))}
                    <Button variant="outline" className="w-full" data-testid="button-view-all-insights">
                      View All Insights
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <DataEntryModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}
