import MetricCard from '../MetricCard';
import { DollarSign, TrendingUp, ShoppingCart, Wallet } from 'lucide-react';

export default function MetricCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      <MetricCard
        title="Total Revenue"
        value="$45,231"
        trend={{ value: 12.5, direction: "up" }}
        icon={<DollarSign className="w-6 h-6" />}
      />
      <MetricCard
        title="Sales"
        value="2,345"
        trend={{ value: 8.2, direction: "up" }}
        icon={<ShoppingCart className="w-6 h-6" />}
      />
      <MetricCard
        title="Profit"
        value="$12,456"
        trend={{ value: 3.1, direction: "down" }}
        icon={<TrendingUp className="w-6 h-6" />}
      />
      <MetricCard
        title="Expenses"
        value="$32,775"
        trend={{ value: 0, direction: "neutral" }}
        icon={<Wallet className="w-6 h-6" />}
      />
    </div>
  );
}
