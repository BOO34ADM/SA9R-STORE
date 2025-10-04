import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { createOrder, getOrders, getCustomers, getOrderById } from "./routes/orders";
import { adminLogin, getAdminOrders, adminLogout, getAdminStats } from "./routes/admin";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Order and customer management API routes
  app.post("/api/orders", createOrder);
  app.get("/api/orders", getOrders);
  app.get("/api/orders/:id", getOrderById);
  app.get("/api/customers", getCustomers);

  // Admin authentication and management API routes
  app.post("/api/admin/login", adminLogin);
  app.get("/api/admin/orders", getAdminOrders);
  app.get("/api/admin/stats", getAdminStats);
  app.post("/api/admin/logout", adminLogout);

  return app;
}
