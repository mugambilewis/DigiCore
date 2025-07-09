import React from 'react';
import {
  BarChart3, Package, Users, DollarSign, Plus, Search, Filter, Edit, Trash2, Menu
} from 'lucide-react';

import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Orders', value: '1,247', change: '+12%', icon: Package },
    { title: 'Revenue', value: '$45,678', change: '+8%', icon: DollarSign },
    { title: 'Customers', value: '892', change: '+15%', icon: Users },
    { title: 'Products', value: '156', change: '+3%', icon: BarChart3 },
  ];

  const products = [
    { id: 1, name: 'iPhone 15 Pro', category: 'Smartphones', price: '$999', stock: 45 },
    { id: 2, name: 'MacBook Pro M3', category: 'Laptops', price: '$1,999', stock: 23 },
    { id: 3, name: 'AirPods Pro', category: 'Audio', price: '$249', stock: 67 },
    { id: 4, name: 'Apple Watch Series 9', category: 'Wearables', price: '$399', stock: 34 },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white">
      <div className="h-16 flex items-center justify-center border-b px-6">
        <h2 className="text-xl font-bold text-gray-900">DigiCore Admin</h2>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        <Link
          to="/dashboard"
          className="flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg"
        >
          <BarChart3 className="mr-3 h-4 w-4" />
          Dashboard
        </Link>
        <Link
          to="/admin/products"
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          <Package className="mr-3 h-4 w-4" />
          Products
        </Link>
        <Link
          to="/admin/customers"
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          <Users className="mr-3 h-4 w-4" />
          Customers
        </Link>
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="fixed top-4 left-4 z-50">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:z-50 border-r bg-white">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="lg:pl-64 p-6">
        {/* Header */}
        <header className="bg-white border rounded-xl px-6 py-4 shadow-sm mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              A
            </div>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Products Table */}
        <section className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Products</h2>
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search products..." className="pl-10" />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {['Product', 'Category', 'Price', 'Stock', 'Actions'].map((header) => (
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
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 text-gray-500">{product.category}</td>
                    <td className="px-6 py-4 text-gray-900">{product.price}</td>
                    <td className="px-6 py-4 text-gray-900">{product.stock}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
