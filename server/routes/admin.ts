import { RequestHandler } from "express";
import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";

const DATA_DIR = path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");
const SESSIONS_FILE = path.join(DATA_DIR, "admin-sessions.json");

// Admin password (in production, this should be in environment variables)
const ADMIN_PASSWORD = "sa9r2025";

// Ensure data directory exists
const ensureDataDir = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
};

// Generate JWT-like token
const generateToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// Hash password with salt
const hashPassword = (password: string): string => {
  return crypto.createHash('sha256').update(password + 'sa9r_salt').digest('hex');
};

// Read sessions from file
const readSessions = () => {
  try {
    if (fs.existsSync(SESSIONS_FILE)) {
      const data = fs.readFileSync(SESSIONS_FILE, "utf8");
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error("Error reading sessions:", error);
    return [];
  }
};

// Write sessions to file
const writeSessions = (sessions: any[]) => {
  try {
    ensureDataDir();
    fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessions, null, 2));
  } catch (error) {
    console.error("Error writing sessions:", error);
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

// Initialize data directory
ensureDataDir();

// Admin login
export const adminLogin: RequestHandler = (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ 
        message: "Password is required" 
      });
    }

    // Check password
    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create session
    const token = generateToken();
    const session = {
      token,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    };

    const sessions = readSessions();
    sessions.push(session);
    writeSessions(sessions);

    res.json({ 
      success: true,
      token,
      message: "Login successful"
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Verify admin token
const verifyToken = (token: string): boolean => {
  try {
    const sessions = readSessions();
    const session = sessions.find((s: any) => s.token === token);

    if (!session) {
      return false;
    }

    // Check if session expired
    if (new Date() > new Date(session.expiresAt)) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Token verification error:", error);
    return false;
  }
};

// Get all orders (admin only)
export const getAdminOrders: RequestHandler = (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.replace('Bearer ', '');

    if (!token || !verifyToken(token)) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const orders = readOrders();
    res.json({ orders });
  } catch (error) {
    console.error("Error getting admin orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Admin logout
export const adminLogout: RequestHandler = (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.replace('Bearer ', '');

    if (token) {
      const sessions = readSessions();
      const filteredSessions = sessions.filter((s: any) => s.token !== token);
      writeSessions(filteredSessions);
    }

    res.json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Admin logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get admin dashboard stats
export const getAdminStats: RequestHandler = (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.replace('Bearer ', '');

    if (!token || !verifyToken(token)) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const orders = readOrders();
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum: number, order: any) => sum + order.total, 0);
    
    // Get unique customers by email
    const uniqueCustomers = new Set(orders.map((order: any) => order.email));
    const totalCustomers = uniqueCustomers.size;

    res.json({
      totalOrders,
      totalCustomers,
      totalRevenue,
      averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0
    });
  } catch (error) {
    console.error("Error getting admin stats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
