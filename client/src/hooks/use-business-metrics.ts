import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { type BusinessMetric, type InsertBusinessMetric } from "@shared/schema";

export function useBusinessMetrics() {
  const queryClient = useQueryClient();

  const { data: metrics, isLoading } = useQuery<BusinessMetric[]>({ 
    queryKey: ["metrics"], 
    queryFn: async () => {
      const res = await fetch("/api/metrics");
      return res.json();
    }
  });

  const { mutate: createMetric } = useMutation<BusinessMetric, Error, InsertBusinessMetric>({
    mutationFn: async (newMetric) => {
      const res = await fetch("/api/metrics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMetric),
      });
      if (!res.ok) {
        throw new Error("Failed to create metric");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["metrics"] });
    },
  });

  return { metrics, isLoading, createMetric };
}
