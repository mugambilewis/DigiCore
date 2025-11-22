import React, { useState, useEffect } from 'react';
import {
  BarChart3, Package, Users, DollarSign, Menu, TrendingUp
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);
  const [stats, setStats] = useState({
    total_orders: 0,
    total_sales: 0,
    paid_sales: 0,
    average_order_value: 0,
    total_users: 0,
  });
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !user.is_admin) {
      navigate('/');
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const [statsRes, ordersRes, usersRes] = await Promise.all([
        axios.get('/admin/stats'),
        axios.get('/admin/orders'),
        axios.get('/admin/users'),
      ]);

      setStats(statsRes.data);
      setOrders(ordersRes.data || []);
      setUsers(usersRes.data || []);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Orders',
      value: stats.total_orders || 0,
      change: '+12%',
      icon: Package,
      color: 'blue',
    },
    {
      title: 'Total Sales',
      value: `KES ${parseFloat(stats.total_sales || 0).toLocaleString('en-KE', {
        minimumFractionDigits: 2,
      })}`,
      change: '+8%',
      icon: DollarSign,
      color: 'green',
    },
    {
      title: 'Customers',
      value: stats.total_users || 0,
      change: '+15%',
      icon: Users,
      color: 'purple',
    },
    {
      title: 'Avg Order Value',
      value: `KES ${parseFloat(stats.average_order_value || 0).toLocaleString('en-KE', {
        minimumFractionDigits: 2,
      })}`,
      change: '+3%',
      icon: TrendingUp,
      color: 'orange',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="bg-white border rounded-xl px-6 py-4 shadow-sm mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              A
            </div>
          </div>
        </header>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading dashboard data...</p>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statCards.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                    </div>
                    <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                      <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <section className="bg-white rounded-xl shadow-sm border mb-6">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
              </div>
              <div className="overflow-x-auto">
                {orders.length === 0 ? (
                  <div className="p-6 text-center text-gray-600">No orders yet</div>
                ) : (
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        {['Order ID', 'Customer', 'Total', 'Status', 'Date'].map((header) => (
                          <th
                            key={header}
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.slice(0, 10).map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                            #{order.id.substring(0, 8)}
                          </td>
                          <td className="px-6 py-4 text-gray-500">
                            {order.user_name || order.user_email || 'N/A'}
                          </td>
                          <td className="px-6 py-4 text-gray-900">
                            KES {parseFloat(order.total).toLocaleString('en-KE', {
                              minimumFractionDigits: 2,
                            })}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-block px-2 py-1 text-xs rounded ${
                                order.status === 'completed'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-500">
                            {new Date(order.created_at).toLocaleDateString('en-KE')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </section>

            {/* Users Table */}
            <section className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">All Users</h2>
              </div>
              <div className="overflow-x-auto">
                {users.length === 0 ? (
                  <div className="p-6 text-center text-gray-600">No users yet</div>
                ) : (
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        {['Name', 'Email', 'Role', 'Joined'].map((header) => (
                          <th
                            key={header}
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">{user.name}</td>
                          <td className="px-6 py-4 text-gray-500">{user.email}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-block px-2 py-1 text-xs rounded ${
                                user.is_admin
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {user.is_admin ? 'Admin' : 'User'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-500">
                            {new Date(user.created_at).toLocaleDateString('en-KE')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
