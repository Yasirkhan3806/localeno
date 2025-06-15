
import React, { useState } from "react";
import { Search, Filter, Plus, Eye, MoreHorizontal } from "lucide-react";

// Demo Customers Data
const DEMO_CUSTOMERS = [
  {
    id: "CUS-001",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    orders: 12,
    totalSpent: 1247.5,
    status: "Active",
    lastOrder: "2024-01-15"
  },
  {
    id: "CUS-002",
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    phone: "+1 (555) 987-6543",
    orders: 8,
    totalSpent: 892.3,
    status: "Active",
    lastOrder: "2024-01-10"
  },
  {
    id: "CUS-003",
    name: "Mike Johnson",
    email: "mike.johnson@email.com",
    phone: "+1 (555) 456-7890",
    orders: 15,
    totalSpent: 2156.8,
    status: "Active",
    lastOrder: "2024-01-12"
  },
  {
    id: "CUS-004",
    name: "Emily Brown",
    email: "emily.brown@email.com",
    phone: "+1 (555) 321-0987",
    orders: 3,
    totalSpent: 245.6,
    status: "Inactive",
    lastOrder: "2023-12-20"
  }
];

// Demo KPIs
const KPI = [
  {
    icon: (
      <svg className="w-7 h-7 text-blue-700 bg-blue-100 rounded-md p-1" fill="none" viewBox="0 0 24 24">
        <rect width="100%" height="100%" fill="#e0edff"/>
        <rect x="7" y="9" width="10" height="6" rx="2" className="fill-blue-600" />
        <rect x="10" y="5" width="4" height="6" rx="2" className="fill-blue-400" />
      </svg>
    ),
    label: "Total Customers",
    value: "1,247",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-green-700 bg-green-100 rounded-md p-1" fill="none" viewBox="0 0 24 24">
        <rect width="100%" height="100%" fill="#e6faee"/>
        <rect x="6" y="8" width="12" height="8" rx="2" className="fill-green-500" />
        <rect x="10" y="6" width="4" height="10" rx="2" className="fill-green-400" />
      </svg>
    ),
    label: "Active Customers",
    value: "1,156",
  },
  {
    icon: (
      <Search className="w-7 h-7 text-purple-700 bg-purple-100 rounded-md p-1" />
    ),
    label: "New This Month",
    value: "89",
  },
  {
    icon: (
      <Filter className="w-7 h-7 text-orange-700 bg-orange-100 rounded-md p-1" />
    ),
    label: "Average Orders",
    value: "8.5",
  },
];

const statusBadge = (status) =>
  status === "Active" ?
    <span className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-xs font-semibold">Active</span> :
    <span className="bg-red-100 text-red-500 rounded-full px-3 py-1 text-xs font-semibold">Inactive</span>;

const AdminCustomersTable = ({ onViewCustomer }) => {
  const [search, setSearch] = useState("");

  const filteredCustomers = DEMO_CUSTOMERS.filter(
    c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddCustomer = () => {
    window.alert('Add Customer functionality will be implemented soon!\n\nThis will open a form to add a new customer with fields for:\n- Name\n- Email\n- Phone\n- Address\n- Initial status');
  };

  const handleViewCustomer = (customer) => {
    window.alert(`View Customer Details:\n\nName: ${customer.name}\nEmail: ${customer.email}\nPhone: ${customer.phone}\nOrders: ${customer.orders}\nTotal Spent: $${customer.totalSpent.toLocaleString()}\nStatus: ${customer.status}\nLast Order: ${customer.lastOrder}\n\nFull customer profile functionality will be implemented soon!`);
  };

  const handleMoreActions = (customer) => {
    const actions = [
      'Edit Customer',
      'View Order History',
      'Send Email',
      'Block Customer',
      'Delete Customer'
    ];
    
    const action = window.prompt(`More actions for ${customer.name}:\n\n${actions.map((a, i) => `${i+1}. ${a}`).join('\n')}\n\nEnter number (1-${actions.length}):`);
    
    if (action && parseInt(action) >= 1 && parseInt(action) <= actions.length) {
      window.alert(`${actions[parseInt(action)-1]} for ${customer.name} - This functionality will be implemented soon!`);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-3 flex flex-col md:flex-row md:items-center gap-3 justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-0">Customers</h2>
          <div className="text-gray-500 font-normal text-base">Manage your customer base and their information</div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-lg mr-2">
            <Search className="text-gray-400 w-5 h-5 ml-3" />
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full px-3 py-2 text-sm bg-transparent rounded-lg outline-none"
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
          <button
            onClick={handleAddCustomer}
            className="flex items-center gap-1 px-5 py-2 rounded-lg bg-black text-white font-semibold shadow hover:bg-gray-900 transition text-sm"
          >
            <Plus size={18} className="mr-1" />
            Add Customer
          </button>
        </div>
      </div>
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-7">
        {KPI.map((k, i) => (
          <div key={i} className="bg-white rounded-xl px-6 py-5 flex gap-4 items-center border border-gray-100 min-w-[200px]">
            <div>{k.icon}</div>
            <div>
              <div className="text-gray-500 text-[.98rem] font-medium">{k.label}</div>
              <div className="text-2xl font-extrabold text-gray-900">{k.value}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Table */}
      <div className="rounded-2xl shadow border border-gray-100 bg-white overflow-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-xs text-gray-400 font-semibold border-b">
              <th className="pl-6 py-3 text-left">CUSTOMER</th>
              <th className="py-3 text-left">CONTACT</th>
              <th className="py-3 text-left">ORDERS</th>
              <th className="py-3 text-left">TOTAL SPENT</th>
              <th className="py-3 text-left">STATUS</th>
              <th className="py-3 text-left">LAST ORDER</th>
              <th className="py-3 text-left">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="text-gray-900">
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-5 text-center text-gray-400">
                  No customers found.
                </td>
              </tr>
            ) : (
              filteredCustomers.map(customer => (
                <tr key={customer.id} className="border-b last:border-0 hover:bg-gray-50 transition">
                  <td className="pl-6 py-3 font-semibold flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center font-semibold text-base">
                      {customer.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <div>{customer.name}</div>
                      <div className="text-xs text-gray-500 font-normal">ID: {customer.id}</div>
                    </div>
                  </td>
                  <td className="py-3">
                    <div>{customer.email}</div>
                    <div className="text-xs text-gray-500">{customer.phone}</div>
                  </td>
                  <td className="py-3">{customer.orders}</td>
                  <td className="py-3">${customer.totalSpent.toLocaleString(undefined, {minimumFractionDigits:2})}</td>
                  <td className="py-3">{statusBadge(customer.status)}</td>
                  <td className="py-3">{customer.lastOrder}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-1.5 rounded-full hover:bg-gray-100 transition text-gray-500"
                        title="View Customer"
                        onClick={() => handleViewCustomer(customer)}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        className="p-1.5 rounded-full hover:bg-gray-100 transition text-gray-500"
                        title="More actions"
                        onClick={() => handleMoreActions(customer)}
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
  );
};

export default AdminCustomersTable;
