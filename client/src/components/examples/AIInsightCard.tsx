import AIInsightCard from '../AIInsightCard';

export default function AIInsightCardExample() {
  return (
    <div className="p-6 space-y-4 max-w-md">
      <AIInsightCard
        title="Revenue Spike Detected"
        description="Your revenue increased by 24% compared to last week. This trend is primarily driven by increased sales in the electronics category."
        confidence={92}
      />
      <AIInsightCard
        title="Seasonal Pattern Identified"
        description="Sales typically increase by 15-20% during weekends. Consider adjusting inventory levels accordingly."
        confidence={85}
      />
      <AIInsightCard
        title="Cost Optimization Opportunity"
        description="Your expense-to-revenue ratio is higher than industry average. Review operational costs for potential savings."
        confidence={78}
      />
    </div>
  );
}
