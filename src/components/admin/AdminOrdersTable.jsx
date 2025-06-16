
import React, { useState } from "react";
import { Search, Filter, Eye, Edit, MoreHorizontal, Package, TrendingUp, Clock, CheckCircle } from "lucide-react";

// Demo orders data
const DEMO_ORDERS = [
  {
    id: "ORD-001",
    customer: "John Smith",
    items: 3,
    total: 299.97,
    status: "Delivered",
    date: "2024-01-15",
    paymentMethod: "Credit Card"
  },
  {
    id: "ORD-002", 
    customer: "Sarah Wilson",
    items: 1,
    total: 89.99,
    status: "Processing",
    date: "2024-01-14",
    paymentMethod: "PayPal"
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson", 
    items: 2,
    total: 459.98,
    status: "Shipped",
    date: "2024-01-13",
    paymentMethod: "Credit Card"
  },
  {
    id: "ORD-004",
    customer: "Emily Brown",
    items: 1,
    total: 49.99,
    status: "Pending",
    date: "2024-01-12",
    paymentMethod: "Debit Card"
  },
  {
    id: "ORD-005",
    customer: "David Chen",
    items: 4,
    total: 789.96,
    status: "Cancelled",
    date: "2024-01-11",
    paymentMethod: "Credit Card"
  }
];

// Demo KPIs
const KPI = [
  {
    icon: <Package className="w-7 h-7 text-blue-700 bg-blue-100 rounded-md p-1" />,
    label: "Total Orders",
    value: "2,847",
  },
  {
    icon: <TrendingUp className="w-7 h-7 text-green-700 bg-green-100 rounded-md p-1" />,
    label: "Revenue",
    value: "$45,289",
  },
  {
    icon: <Clock className="w-7 h-7 text-orange-700 bg-orange-100 rounded-md p-1" />,
    label: "Pending",
    value: "127",
  },
  {
    icon: <CheckCircle className="w-7 h-7 text-purple-700 bg-purple-100 rounded-md p-1" />,
    label: "Completed",
    value: "2,456",
  },
];

const statusBadge = (status) => {
  switch (status) {
    case "Delivered":
      return <span className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-xs font-semibold">Delivered</span>;
    case "Shipped":
      return <span className="bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-xs font-semibold">Shipped</span>;
    case "Processing":
      return <span className="bg-yellow-100 text-yellow-700 rounded-full px-3 py-1 text-xs font-semibold">Processing</span>;
    case "Pending":
      return <span className="bg-orange-100 text-orange-700 rounded-full px-3 py-1 text-xs font-semibold">Pending</span>;
    case "Cancelled":
      return <span className="bg-red-100 text-red-500 rounded-full px-3 py-1 text-xs font-semibold">Cancelled</span>;
    default:
      return <span className="bg-gray-100 text-gray-500 rounded-full px-3 py-1 text-xs font-semibold">{status}</span>;
  }
};

const AdminOrdersTable = ({ onViewOrder, onEditOrder }) => {
  const [search, setSearch] = useState("");

  const filteredOrders = DEMO_ORDERS.filter(
    o =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase())
  );

  const handleMoreActions = (order) => {
    const actions = [
      'View Invoice',
      'Send Email Update',
      'Print Shipping Label',
      'Refund Order',
      'Cancel Order'
    ];
    
    const action = window.prompt(`More actions for ${order.id}:\n\n${actions.map((a, i) => `${i+1}. ${a}`).join('\n')}\n\nEnter number (1-${actions.length}):`);
    
    if (action && parseInt(action) >= 1 && parseInt(action) <= actions.length) {
      window.alert(`${actions[parseInt(action)-1]} for ${order.id} - This functionality will be implemented soon!`);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-3 flex flex-col lg:flex-row lg:items-center gap-3 justify-between">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-0">Orders</h2>
          <div className="text-gray-500 font-normal text-sm lg:text-base">Track and manage all customer orders</div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
          <div className="flex-1 lg:flex-none flex items-center bg-white border border-gray-200 rounded-lg">
            <Search className="text-gray-400 w-5 h-5 ml-3" />
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full px-3 py-2 text-sm bg-transparent rounded-lg outline-none min-w-0 lg:min-w-[180px]"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={() => window.alert('Filter functionality will be implemented soon!')}
            className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium bg-white hover:bg-gray-100 transition"
          >
            <Filter size={18} className="text-gray-500" />
            Filter
          </button>
        </div>
      </div>
      
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-7">
        {KPI.map((k, i) => (
          <div key={i} className="bg-white rounded-xl px-4 lg:px-6 py-4 lg:py-5 flex gap-3 lg:gap-4 items-center border border-gray-100 min-w-0">
            <div className="flex-shrink-0">{k.icon}</div>
            <div className="min-w-0">
              <div className="text-gray-500 text-sm lg:text-[.98rem] font-medium truncate">{k.label}</div>
              <div className="text-xl lg:text-2xl font-extrabold text-gray-900">{k.value}</div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Table */}
      <div className="rounded-2xl shadow border border-gray-100 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-400 font-semibold border-b">
                <th className="pl-4 lg:pl-6 py-3 text-left min-w-[120px]">ORDER ID</th>
                <th className="py-3 text-left min-w-[150px]">CUSTOMER</th>
                <th className="py-3 text-left">ITEMS</th>
                <th className="py-3 text-left">TOTAL</th>
                <th className="py-3 text-left">STATUS</th>
                <th className="py-3 text-left">DATE</th>
                <th className="py-3 text-left">PAYMENT</th>
                <th className="py-3 text-left">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="text-gray-900">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-5 text-center text-gray-400">
                    No orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50 transition">
                    <td className="pl-4 lg:pl-6 py-3 font-semibold min-w-[120px]">
                      {order.id}
                    </td>
                    <td className="py-3 min-w-[150px]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
                          {order.customer.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                        <div className="truncate">{order.customer}</div>
                      </div>
                    </td>
                    <td className="py-3 whitespace-nowrap">{order.items}</td>
                    <td className="py-3 whitespace-nowrap font-semibold">${order.total.toFixed(2)}</td>
                    <td className="py-3 whitespace-nowrap">{statusBadge(order.status)}</td>
                    <td className="py-3 whitespace-nowrap">{order.date}</td>
                    <td className="py-3 whitespace-nowrap">{order.paymentMethod}</td>
                    <td className="py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-1.5 rounded-full hover:bg-gray-100 transition text-gray-500"
                          title="View Order"
                          onClick={() => onViewOrder(order.id)}
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          className="p-1.5 rounded-full hover:bg-gray-100 transition text-gray-500"
                          title="Edit Order"
                          onClick={() => onEditOrder(order)}
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          className="p-1.5 rounded-full hover:bg-gray-100 transition text-gray-500"
                          title="More actions"
                          onClick={() => handleMoreActions(order)}
                        >
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrdersTable;
