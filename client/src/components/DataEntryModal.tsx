import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { type InsertBusinessMetric } from "@shared/schema";

interface DataEntryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (metric: InsertBusinessMetric) => void;
}

export default function DataEntryModal({ open, onOpenChange, onSubmit }: DataEntryModalProps) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    revenue: "",
    sales: "",
    expenses: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMetric: InsertBusinessMetric = {
      ...formData,
      revenue: parseFloat(formData.revenue),
      sales: parseInt(formData.sales, 10),
      expenses: formData.expenses ? parseFloat(formData.expenses) : undefined,
    };
    onSubmit(newMetric);
    onOpenChange(false);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      revenue: "",
      sales: "",
      expenses: "",
      notes: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]" data-testid="modal-data-entry">
        <DialogHeader>
          <DialogTitle data-testid="text-modal-title">Add Business Data</DialogTitle>
          <DialogDescription data-testid="text-modal-description">
            Enter your daily business metrics to track performance over time.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
              data-testid="input-date"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="revenue">Revenue ($)</Label>
              <Input
                id="revenue"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.revenue}
                onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                required
                data-testid="input-revenue"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sales">Sales Count</Label>
              <Input
                id="sales"
                type="number"
                placeholder="0"
                value={formData.sales}
                onChange={(e) => setFormData({ ...formData, sales: e.target.value })}
                required
                data-testid="input-sales"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="expenses">Expenses ($)</Label>
            <Input
              id="expenses"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.expenses}
              onChange={(e) => setFormData({ ...formData, expenses: e.target.value })}
              data-testid="input-expenses"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional notes about today's performance..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              data-testid="input-notes"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} data-testid="button-cancel">
              Cancel
            </Button>
            <Button type="submit" data-testid="button-submit">
              Save Data
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}