import { RequestHandler } from "express";
import * as fs from "fs";
import * as path from "path";

const ORDERS_FILE = path.join(process.cwd(), "data", "orders.json");
const CUSTOMERS_FILE = path.join(process.cwd(), "data", "customers.json");

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Read orders from file
const readOrders = () => {
  try {
    if (fs.existsSync(ORDERS_FILE)) {
      const data = fs.readFileSync(ORDERS_FILE, "utf8");
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error("Error reading orders:", error);
    return [];
  }
};

// Read customers from file
const readCustomers = () => {
  try {
    if (fs.existsSync(CUSTOMERS_FILE)) {
      const data = fs.readFileSync(CUSTOMERS_FILE, "utf8");
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error("Error reading customers:", error);
    return [];
  }
};

// Write orders to file
const writeOrders = (orders: any[]) => {
  try {
    ensureDataDir();
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
  } catch (error) {
    console.error("Error writing orders:", error);
  }
};

// Write customers to file
const writeCustomers = (customers: any[]) => {
  try {
    ensureDataDir();
    fs.writeFileSync(CUSTOMERS_FILE, JSON.stringify(customers, null, 2));
  } catch (error) {
    console.error("Error writing customers:", error);
  }
};

// Create new order
export const createOrder: RequestHandler = (req, res) => {
  try {
    const { items, customer, total } = req.body;

    if (!items || !customer || !total) {
      return res.status(400).json({ 
        error: "Missing required fields: items, customer, total" 
      });
    }

    const orderId = Date.now().toString();
    const order = {
      id: orderId,
      customerName: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      items,
      total,
      date: new Date().toISOString(),
      status: "confirmed"
    };

    // Save order
    const orders = readOrders();
    orders.push(order);
    writeOrders(orders);

    // Save/update customer
    const customers = readCustomers();
    const existingCustomerIndex = customers.findIndex(
      (c: any) => c.email === customer.email
    );

    if (existingCustomerIndex >= 0) {
      customers[existingCustomerIndex] = {
        ...customers[existingCustomerIndex],
        ...customer,
        lastOrder: new Date().toISOString()
      };
    } else {
      customers.push({
        ...customer,
        firstOrder: new Date().toISOString(),
        lastOrder: new Date().toISOString()
      });
    }
    writeCustomers(customers);

    res.json({ 
      success: true, 
      orderId,
      message: "Order created successfully" 
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all orders
export const getOrders: RequestHandler = (req, res) => {
  try {
    const orders = readOrders();
    res.json(orders);
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all customers
export const getCustomers: RequestHandler = (req, res) => {
  try {
    const customers = readCustomers();
    res.json(customers);
  } catch (error) {
    console.error("Error getting customers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get order by ID
export const getOrderById: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const orders = readOrders();
    const order = orders.find((o: any) => o.id === id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Error getting order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
