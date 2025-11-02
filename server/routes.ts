import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/users", async (req, res) => {
    const user = await storage.createUser(req.body);
    res.json(user);
  });

  app.get("/api/users/:username", async (req, res) => {
    const user = await storage.getUserByUsername(req.params.username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  });

  app.get("/api/metrics", async (req, res) => {
    const metrics = await storage.getBusinessMetrics();
    res.json(metrics);
  });

  app.post("/api/metrics", async (req, res) => {
    const metric = await storage.createBusinessMetric(req.body);
    res.json(metric);
  });

  app.get("/api/sales", async (req, res) => {
    const salesItems = await storage.getSalesItems();
    res.json(salesItems);
  });

  app.post("/api/sales", async (req, res) => {
    const salesItem = await storage.createSalesItem(req.body);
    res.json(salesItem);
  });

  app.patch("/api/sales/:id", async (req, res) => {
    const { id } = req.params;
    const updatedItem = await storage.updateSalesItem(id, req.body);
    if (!updatedItem) {
      return res.status(404).json({ message: "Sales item not found" });
    }
    res.json(updatedItem);
  });

  app.delete("/api/sales/:id", async (req, res) => {
    const { id } = req.params;
    const deleted = await storage.deleteSalesItem(id);
    if (!deleted) {
      return res.status(404).json({ message: "Sales item not found" });
    }
    res.status(204).send(); // No content for successful deletion
  });

  const httpServer = createServer(app);

  return httpServer;
}
