import React, { useState, useEffect } from 'react';

interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    size: string;
    color: string;
  }>;
  total: number;
  date: string;
}

const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if already logged in
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
      loadOrders();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        setIsLoggedIn(true);
        setPassword('');
        loadOrders();
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  const loadOrders = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/orders', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error('Failed to load orders:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    setOrders([]);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(orders, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sa9r-orders.json';
    link.click();
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-sa9r-black flex items-center justify-center p-4">
        <div className="bg-gray-900 p-8 rounded-lg border border-sa9r-red max-w-md w-full">
          <h1 className="text-2xl font-bold text-sa9r-red mb-6 text-center">SA9R Admin Login</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sa9r-white mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-sa9r-white focus:border-sa9r-red focus:outline-none"
                required
              />
            </div>
            
            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sa9r-red text-sa9r-white py-2 px-4 rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sa9r-black p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-900 rounded-lg border border-sa9r-red p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-sa9r-red">SA9R Admin Dashboard</h1>
            <div className="space-x-4">
              <button
                onClick={exportData}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
              >
                Export Data
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 p-4 rounded border border-gray-600">
              <h3 className="text-sa9r-red font-semibold mb-2">Total Orders</h3>
              <p className="text-2xl text-sa9r-white">{orders.length}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded border border-gray-600">
              <h3 className="text-sa9r-red font-semibold mb-2">Total Revenue</h3>
              <p className="text-2xl text-sa9r-white">
                {orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)} MAD
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded border border-gray-600">
              <h3 className="text-sa9r-red font-semibold mb-2">Avg Order Value</h3>
              <p className="text-2xl text-sa9r-white">
                {orders.length > 0 ? (orders.reduce((sum, order) => sum + order.total, 0) / orders.length).toFixed(2) : '0.00'} MAD
              </p>
            </div>
          </div>

          <div className="bg-gray-800 rounded border border-gray-600">
            <div className="p-4 border-b border-gray-600">
              <h2 className="text-xl font-semibold text-sa9r-red">Orders</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left p-4 text-sa9r-white">Order ID</th>
                    <th className="text-left p-4 text-sa9r-white">Customer</th>
                    <th className="text-left p-4 text-sa9r-white">Email</th>
                    <th className="text-left p-4 text-sa9r-white">Phone</th>
                    <th className="text-left p-4 text-sa9r-white">Items</th>
                    <th className="text-left p-4 text-sa9r-white">Street Address</th>
                    <th className="text-left p-4 text-sa9r-white">City</th>
                    <th className="text-left p-4 text-sa9r-white">Total</th>
                    <th className="text-left p-4 text-sa9r-white">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-700 hover:bg-gray-700">
                      <td className="p-4 text-sa9r-white font-mono text-sm">{order.id}</td>
                      <td className="p-4 text-sa9r-white">{order.customerName}</td>
                      <td className="p-4 text-sa9r-white">{order.email}</td>
                      <td className="p-4 text-sa9r-white">{order.phone}</td>
                      <td className="p-4 text-sa9r-white">
                        <div className="space-y-1">
                          {order.items.map((item: any, index: number) => (
                            <div key={index} className="text-sm">
                              <span className="text-sa9r-red">{item.name}</span>
                              <br />
                              <span className="text-gray-400 text-xs">
                                {item.color} / {item.size} (x{item.quantity})
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 text-sa9r-white">{order.address}</td>
                      <td className="p-4 text-sa9r-white">{order.city}</td>
                      <td className="p-4 text-sa9r-white">{order.total.toFixed(2)} MAD</td>
                      <td className="p-4 text-sa9r-white">{new Date(order.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {orders.length === 0 && (
                <div className="p-8 text-center text-gray-400">
                  No orders found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
