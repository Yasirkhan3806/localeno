import React, { useState } from "react";
import { Search, Filter, Plus, Eye, Edit, MoreHorizontal } from "lucide-react";
import ViewDetailModal from "./ViewDetailModal";

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

const AdminCustomersTable = ({ onViewCustomer, onAddCustomer, onEditCustomer }) => {
  const [search, setSearch] = useState("");
  const [viewCustomer, setViewCustomer] = useState(null);

  const filteredCustomers = DEMO_CUSTOMERS.filter(
    c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase())
  );

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
      if (parseInt(action) === 1) {
        onEditCustomer(customer);
      } else {
        window.alert(`${actions[parseInt(action)-1]} for ${customer.name} - This functionality will be implemented soon!`);
      }
    }
  };

  const handleViewCustomer = (customer) => {
    setViewCustomer(customer);
  };

  return (
    <>
      <div className="w-full">
        <div className="mb-3 flex flex-col lg:flex-row lg:items-center gap-3 justify-between">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-0">Customers</h2>
            <div className="text-gray-500 font-normal text-sm lg:text-base">Manage your customer base and their information</div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
            <div className="flex-1 lg:flex-none flex items-center bg-white border border-gray-200 rounded-lg">
              <Search className="text-gray-400 w-5 h-5 ml-3" />
              <input
                type="text"
                placeholder="Search customers..."
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
              <span className="hidden sm:inline">Filter</span>
            </button>
            <button
              onClick={onAddCustomer}
              className="flex items-center gap-1 px-5 py-2 rounded-lg bg-black text-white font-semibold shadow hover:bg-gray-900 transition text-sm"
            >
              <Plus size={18} className="mr-1" />
              <span className="hidden sm:inline">Add Customer</span>
              <span className="sm:hidden">Add</span>
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

        {/* Mobile Cards View */}
        <div className="block lg:hidden rounded-2xl shadow border border-gray-100 bg-white overflow-hidden">
          {filteredCustomers.length === 0 ? (
            <div className="py-8 text-center text-gray-400">
              No customers found.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredCustomers.map(customer => (
                <div key={customer.id} className="p-4 hover:bg-gray-50 transition">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center font-semibold text-base flex-shrink-0">
                      {customer.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-gray-900 truncate">{customer.name}</h3>
                          <p className="text-sm text-gray-600 truncate">{customer.email}</p>
                          <p className="text-xs text-gray-500 mt-1">ID: {customer.id}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-medium">{customer.orders} orders</span>
                            <span className="text-sm text-gray-500">• ${customer.totalSpent.toLocaleString(undefined, {minimumFractionDigits:2})}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          <button
                            className="p-2 rounded-full hover:bg-gray-100 transition text-gray-500"
                            title="View Customer"
                            onClick={() => handleViewCustomer(customer)}
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            className="p-2 rounded-full hover:bg-gray-100 transition text-gray-500"
                            title="Edit Customer"
                            onClick={() => onEditCustomer(customer)}
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            className="p-2 rounded-full hover:bg-gray-100 transition text-gray-500"
                            title="More actions"
                            onClick={() => handleMoreActions(customer)}
                          >
                            <MoreHorizontal size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        {statusBadge(customer.status)}
                        <span className="text-xs text-gray-500">Last order: {customer.lastOrder}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Desktop Table View */}
        <div className="hidden lg:block rounded-2xl shadow border border-gray-100 bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-400 font-semibold border-b">
                  <th className="pl-4 lg:pl-6 py-3 text-left min-w-[200px]">CUSTOMER</th>
                  <th className="py-3 text-left min-w-[180px]">CONTACT</th>
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
                      <td className="pl-4 lg:pl-6 py-3 font-semibold flex items-center gap-3 min-w-[200px]">
                        <div className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center font-semibold text-base flex-shrink-0">
                          {customer.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <div className="truncate">{customer.name}</div>
                          <div className="text-xs text-gray-500 font-normal">ID: {customer.id}</div>
                        </div>
                      </td>
                      <td className="py-3 min-w-[180px]">
                        <div className="truncate">{customer.email}</div>
                        <div className="text-xs text-gray-500 truncate">{customer.phone}</div>
                      </td>
                      <td className="py-3 whitespace-nowrap">{customer.orders}</td>
                      <td className="py-3 whitespace-nowrap">${customer.totalSpent.toLocaleString(undefined, {minimumFractionDigits:2})}</td>
                      <td className="py-3 whitespace-nowrap">{statusBadge(customer.status)}</td>
                      <td className="py-3 whitespace-nowrap">{customer.lastOrder}</td>
                      <td className="py-3 whitespace-nowrap">
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
                            title="Edit Customer"
                            onClick={() => onEditCustomer(customer)}
                          >
                            <Edit size={18} />
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
      </div>

      {/* View Detail Modal */}
      <ViewDetailModal
        item={viewCustomer}
        type="customer"
        isOpen={!!viewCustomer}
        onClose={() => setViewCustomer(null)}
      />
    </>
  );
};

export default AdminCustomersTable;
