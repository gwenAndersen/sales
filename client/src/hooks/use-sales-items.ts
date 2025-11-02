import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { type SalesItem, type InsertSalesItem } from "@shared/schema";

export function useSalesItems() {
  const queryClient = useQueryClient();

  const { data: salesItems, isLoading } = useQuery<SalesItem[]>({ 
    queryKey: ["salesItems"], 
    queryFn: async () => {
      const res = await fetch("/api/sales");
      return res.json();
    }
  });

  const { mutate: createSalesItem } = useMutation<SalesItem, Error, InsertSalesItem>({
    mutationFn: async (newItem) => {
      const res = await fetch("/api/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
      if (!res.ok) {
        throw new Error("Failed to create sales item");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["salesItems"] });
    },
  });

  const { mutate: updateSalesItem } = useMutation<SalesItem, Error, Partial<SalesItem> & { id: string }>({
    mutationFn: async ({ id, ...updates }) => {
      const res = await fetch(`/api/sales/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });
      if (!res.ok) {
        throw new Error("Failed to update sales item");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["salesItems"] });
    },
  });

  const { mutate: deleteSalesItem } = useMutation<void, Error, string>({
    mutationFn: async (id) => {
      const res = await fetch(`/api/sales/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete sales item");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["salesItems"] });
    },
  });

  return { salesItems, isLoading, createSalesItem, updateSalesItem, deleteSalesItem };
}
