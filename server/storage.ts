import { type User, type InsertUser, type BusinessMetric, type InsertBusinessMetric, type SalesItem, type InsertSalesItem } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getBusinessMetrics(): Promise<BusinessMetric[]>;
  createBusinessMetric(metric: InsertBusinessMetric): Promise<BusinessMetric>;
  getSalesItems(): Promise<SalesItem[]>;
  createSalesItem(item: InsertSalesItem): Promise<SalesItem>;
  updateSalesItem(id: string, updates: Partial<SalesItem>): Promise<SalesItem | undefined>;
  deleteSalesItem(id: string): Promise<boolean>; // New method
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private businessMetrics: Map<string, BusinessMetric>;
  private salesItems: Map<string, SalesItem>;

  constructor() {
    this.users = new Map();
    this.businessMetrics = new Map();
    this.salesItems = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getBusinessMetrics(): Promise<BusinessMetric[]> {
    return Array.from(this.businessMetrics.values());
  }

  async createBusinessMetric(metric: InsertBusinessMetric): Promise<BusinessMetric> {
    const id = randomUUID();
    const newMetric: BusinessMetric = { 
      ...metric, 
      id, 
      date: new Date().toISOString(),
      revenue: String(metric.revenue),
      sales: String(metric.sales),
      expenses: metric.expenses ? String(metric.expenses) : null,
      profit: metric.profit ? String(metric.profit) : null,
      notes: metric.notes || null,
    };
    this.businessMetrics.set(id, newMetric);
    return newMetric;
  }

  async getSalesItems(): Promise<SalesItem[]> {
    const items = Array.from(this.salesItems.values());
    return items.sort((a, b) => {
      // Pending items always come first
      if (a.state === "pending" && b.state !== "pending") {
        return -1;
      }
      if (a.state !== "pending" && b.state === "pending") {
        return 1;
      }
      // For non-pending items, sort by createdAt in ascending order (oldest first)
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  }

  async createSalesItem(item: InsertSalesItem): Promise<SalesItem> {
    const id = randomUUID();
    const newItem: SalesItem = {
      ...item,
      id,
      createdAt: new Date().toISOString(),
      quantity: String(item.quantity),
      state: item.state || "pending",
    };
    this.salesItems.set(id, newItem);
    return newItem;
  }

  async updateSalesItem(id: string, updates: Partial<SalesItem>): Promise<SalesItem | undefined> {
    const existingItem = this.salesItems.get(id);
    if (!existingItem) {
      return undefined;
    }
    const updatedItem = { ...existingItem, ...updates };
    this.salesItems.set(id, updatedItem);
    return updatedItem;
  }

  async deleteSalesItem(id: string): Promise<boolean> {
    return this.salesItems.delete(id);
  }
}

export const storage = new MemStorage();